import requests
from bs4 import BeautifulSoup
import json
import time
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Any, Set
import os

class URLScraper:
    def __init__(self, delay: float = 1.0, max_retries: int = 3):
        """
        Initialize URLScraper.
        
        Args:
            delay: Delay between requests in seconds
            max_retries: Maximum number of retries for failed requests
        """
        self.delay = delay
        self.max_retries = max_retries
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
    def scrape_single_url(self, url: str) -> Dict[str, Any]:
        """
        Scrape a single URL and extract content and links.
        
        Args:
            url: URL to scrape
            
        Returns:
            Dictionary with scraped data
        """
        for attempt in range(self.max_retries):
            try:
                print(f"🌐 Scraping: {url}")
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Extract text content
                text_content = self._extract_text(soup)
                
                # Extract links
                links = self._extract_links(soup, url)
                
                # Extract metadata
                metadata = self._extract_metadata(soup, url)
                
                result = {
                    "url": url,
                    "content": text_content,
                    "links": links,
                    "metadata": metadata,
                    "status": "success",
                    "content_length": len(text_content)
                }
                
                print(f"✅ Successfully scraped {url} ({len(text_content)} chars, {len(links)} links)")
                return result
                
            except Exception as e:
                print(f"❌ Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.delay * (attempt + 1))  # Exponential backoff
                else:
                    return {
                        "url": url,
                        "content": "",
                        "links": [],
                        "metadata": {"error": str(e)},
                        "status": "failed",
                        "content_length": 0
                    }
        
        return {
            "url": url,
            "content": "",
            "links": [],
            "metadata": {"error": "Max retries exceeded"},
            "status": "failed",
            "content_length": 0
        }
    
    def _extract_text(self, soup: BeautifulSoup) -> str:
        """Extract text content from BeautifulSoup object."""
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Get text
        text = soup.get_text()
        
        # Clean up whitespace
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text
    
    def _extract_links(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Extract all links from the page."""
        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            absolute_url = urljoin(base_url, href)
            
            # Only include HTTP/HTTPS links
            if absolute_url.startswith(('http://', 'https://')):
                links.append(absolute_url)
        
        return list(set(links))  # Remove duplicates
    
    def _extract_metadata(self, soup: BeautifulSoup, url: str) -> Dict[str, Any]:
        """Extract metadata from the page."""
        metadata = {
            "url": url,
            "title": "",
            "description": "",
            "keywords": "",
            "scraped_at": time.time()
        }
        
        # Extract title
        title_tag = soup.find('title')
        if title_tag:
            metadata["title"] = title_tag.get_text().strip()
        
        # Extract meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            metadata["description"] = meta_desc.get('content', '').strip()
        
        # Extract meta keywords
        meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
        if meta_keywords:
            metadata["keywords"] = meta_keywords.get('content', '').strip()
        
        return metadata
    
    def crawl_for_urls(self, start_url: str, max_depth: int = 2) -> List[str]:
        """
        Crawl a website to find all URLs up to a specified depth.
        
        Args:
            start_url: Starting URL
            max_depth: Maximum depth to crawl
            
        Returns:
            List of found URLs
        """
        visited = set()
        to_visit = [(start_url, 0)]  # (url, depth)
        found_urls = set()
        
        while to_visit:
            current_url, depth = to_visit.pop(0)
            
            if current_url in visited or depth > max_depth:
                continue
                
            visited.add(current_url)
            found_urls.add(current_url)
            
            print(f"🕷️ Crawling depth {depth}: {current_url}")
            
            # Scrape the current URL
            result = self.scrape_single_url(current_url)
            
            if result["status"] == "success" and depth < max_depth:
                # Add new links to visit
                for link in result["links"]:
                    if link not in visited:
                        to_visit.append((link, depth + 1))
            
            time.sleep(self.delay)
        
        return list(found_urls)
    
    def scrape_recursive_and_save(self, start_url: str, max_depth: int = 2, output_file: str = "scraped_data.json") -> Dict[str, Any]:
        """
        Recursively scrape URLs and save to JSON file.
        
        Args:
            start_url: Starting URL
            max_depth: Maximum depth to crawl
            output_file: Output JSON file path
            
        Returns:
            Dictionary with results
        """
        try:
            print(f"🕷️ Starting recursive scraping from {start_url} (max depth: {max_depth})")
            
            # First, crawl to find all URLs
            urls_to_scrape = self.crawl_for_urls(start_url, max_depth)
            print(f"📋 Found {len(urls_to_scrape)} URLs to scrape")
            
            # Scrape each URL
            scraped_data = []
            successful_scrapes = 0
            total_content_length = 0
            
            for i, url in enumerate(urls_to_scrape, 1):
                print(f"📄 Scraping {i}/{len(urls_to_scrape)}: {url}")
                
                result = self.scrape_single_url(url)
                scraped_data.append(result)
                
                if result["status"] == "success":
                    successful_scrapes += 1
                    total_content_length += result["content_length"]
                
                time.sleep(self.delay)
            
            # Save to JSON file
            output_data = {
                "scraping_info": {
                    "start_url": start_url,
                    "max_depth": max_depth,
                    "total_urls_found": len(urls_to_scrape),
                    "successful_scrapes": successful_scrapes,
                    "failed_scrapes": len(urls_to_scrape) - successful_scrapes,
                    "total_content_length": total_content_length,
                    "scraped_at": time.time()
                },
                "documents": scraped_data
            }
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, indent=2, ensure_ascii=False)
            
            print(f"💾 Saved scraped data to {output_file}")
            print(f"📊 Summary: {successful_scrapes}/{len(urls_to_scrape)} URLs scraped successfully")
            print(f"📏 Total content length: {total_content_length} characters")
            
            return {
                "success": True,
                "urls_found": len(urls_to_scrape),
                "urls_scraped": successful_scrapes,
                "total_content_length": total_content_length,
                "output_file": output_file
            }
            
        except Exception as e:
            print(f"❌ Error during recursive scraping: {e}")
            return {
                "success": False,
                "error": str(e),
                "urls_found": 0,
                "urls_scraped": 0,
                "total_content_length": 0,
                "output_file": output_file
            } 