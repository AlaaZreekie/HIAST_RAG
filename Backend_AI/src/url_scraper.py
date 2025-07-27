import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
from typing import List, Dict, Optional, Set
import time
import json

class URLScraper:
    def __init__(self):
        """Initialize the URL scraper with a requests session."""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        # Keep track of visited URLs to avoid re-scraping within a single run
        self.visited_urls = set()

    def _get_links_from_page(self, base_url: str) -> Set[str]:
        """
        Private helper to fetch all unique, same-domain links from a single page.
        """
        links = set()
        try:
            response = self.session.get(base_url, timeout=10, verify=False)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            base_domain = urlparse(base_url).netloc

            for link in soup.find_all('a', href=True):
                href = link['href']
                full_url = urljoin(base_url, href)
                # Clean URL by removing fragments
                full_url = urlparse(full_url)._replace(fragment="").geturl()

                # Ignore .zip and .pdf files
                if full_url.lower().endswith('.zip') or full_url.lower().endswith('.pdf'):
                    continue

                # Add link if it's on the same domain and not seen before
                if urlparse(full_url).netloc == base_domain:
                    links.add(full_url)
            return links
        except requests.RequestException as e:
            print(f"❌ Could not get links from {base_url}: {e}")
            return links

    def crawl_for_urls(self, start_url: str, max_depth: int = 3) -> Set[str]:
        """
        Recursively crawl a website to discover all unique URLs up to a max depth.

        Args:
            start_url: The URL to begin crawling from.
            max_depth: The maximum number of levels to crawl.

        Returns:
            A set of all unique URLs found.
        """
        print(f"🕷️ Starting crawl from '{start_url}' with max depth {max_depth}...")
        all_found_urls = set([start_url])
        urls_to_visit = {start_url}
        crawled_urls = set()

        for depth in range(max_depth):
            print(f"--- Depth {depth + 1} ---")
            if not urls_to_visit:
                print("No new URLs to visit. Stopping crawl.")
                break

            # Use a copy of the set for iteration as we will modify it
            current_level_urls = list(urls_to_visit)
            urls_to_visit.clear()

            for url in current_level_urls:
                if url in crawled_urls:
                    continue

                print(f"  -> Crawling: {url}")
                crawled_urls.add(url)
                new_links = self._get_links_from_page(url)
                new_unique_links = new_links - all_found_urls

                if new_unique_links:
                    print(f"    ✅ Found {len(new_unique_links)} new links.")
                    all_found_urls.update(new_unique_links)
                    urls_to_visit.update(new_unique_links)
                
                time.sleep(0.1) # Be respectful to the server

        print(f"✅ Crawl complete. Found a total of {len(all_found_urls)} unique URLs.")
        return all_found_urls

    def extract_text_from_url(self, url: str) -> Optional[str]:
        """
        Extracts and cleans the main text content from a single URL.
        """
        try:
            print(f"  -> Scraping text from: {url}")
            response = self.session.get(url, timeout=10, verify=False)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')

            # Remove non-content tags
            for element in soup(["script", "style", "nav", "footer", "header", "aside"]):
                element.decompose()

            text = soup.get_text(separator=' ', strip=True)
            text = re.sub(r'\s+', ' ', text) # Consolidate whitespace
            return text
        except Exception as e:
            print(f"❌ Error scraping text from {url}: {e}")
            return None

    def scrape_recursive_and_save(self, start_url: str, max_depth: int = 3, output_file: str = "scraped_data.json") -> Dict[str, any]:
        """
        Crawls a website up to a max depth, scrapes text from all found URLs,
        and saves the content to a JSON file.

        Args:
            start_url: The URL to begin the process.
            max_depth: The maximum crawl depth.
            output_file: The file to save the scraped content (JSON format).

        Returns:
            A dictionary containing the results of the operation.
        """
        # 1. Discover all the URLs
        all_urls = self.crawl_for_urls(start_url, max_depth)
        
        # 2. Scrape the text from each URL
        print(f"\n📄 Starting to scrape text from {len(all_urls)} URLs...")
        scraped_results = []
        successful_scrapes = 0
        failed_scrapes = 0

        for url in all_urls:
            content = self.extract_text_from_url(url)
            if content:
                scraped_results.append({"url": url, "content": content})
                successful_scrapes += 1
            else:
                failed_scrapes += 1
            time.sleep(0.1) # Be respectful

        print(f"\n✅ Scraping complete. Success: {successful_scrapes}, Failed: {failed_scrapes}")

        # 3. Save the scraped content to a JSON file
        total_content_length = 0
        try:
            # Create JSON structure with metadata and scraped content
            json_data = {
                "metadata": {
                    "start_url": start_url,
                    "max_depth": max_depth,
                    "total_urls_found": len(all_urls),
                    "successful_scrapes": successful_scrapes,
                    "failed_scrapes": failed_scrapes,
                    "scraped_at": time.strftime("%Y-%m-%d %H:%M:%S")
                },
                "scraped_content": scraped_results
            }
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
            
            # Calculate total content length
            total_content_length = sum(len(result['content']) for result in scraped_results)
            
            print(f"💾 Saved {len(scraped_results)} entries with {total_content_length} characters to '{output_file}'")
        except IOError as e:
            print(f"❌ Error saving to file: {e}")
            return {"success": False, "error": str(e)}

        return {
            "success": True,
            "urls_found": len(all_urls),
            "urls_scraped": successful_scrapes,
            "urls_failed": failed_scrapes,
            "output_file": output_file,
            "total_content_length": total_content_length,
        } 