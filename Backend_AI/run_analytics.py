#!/usr/bin/env python3
"""
Simple script to run chunk analytics on JSON data files.
"""

import sys
import os

# Add the src directory to the path so we can import from it
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from src.embedder import Embedder

def main():
    """Run analytics on JSON data files."""
    embedder = Embedder()
    # List of possible JSON files to analyze
    json_files = [
        "scraped_data.json"
    ]
    
    print("🔍 Available JSON files to analyze:")
    for i, file in enumerate(json_files, 1):
        if os.path.exists(file):
            print(f"   {i}. {file} ✅")
        else:
            print(f"   {i}. {file} ❌ (not found)")
    
    print("\n📊 Running analytics...")
    
    # Try to analyze each file that exists
    for file in json_files:
        if os.path.exists(file):
            print(f"\n{'='*50}")
            print(f"📈 Analyzing: {file}")
            print('='*50)
            
            try:
                analytics = embedder.analyze_chunk_analytics(file)
                
                if analytics:
                    print(f"\n✅ Analysis Results for {file}:")
                    print(f"   📁 File: {analytics['file_path']}")
                    print(f"   📊 Total Items: {analytics['total_items']}")
                    print(f"   ✅ Successful Scrapes: {analytics['successful_scrapes']}")
                    print(f"   ❌ Failed Scrapes: {analytics['failed_scrapes']}")
                    print(f"   📈 Success Rate: {analytics['success_rate']:.1f}%")
                    
                    stats = analytics['content_length_stats']
                    print(f"\n📏 Content Length Statistics:")
                    print(f"   📊 Median: {stats['median']:,} characters")
                    print(f"   📈 Mean: {stats['mean']:,.2f} characters")
                    print(f"   📉 Min: {stats['min']:,} characters")
                    print(f"   📈 Max: {stats['max']:,} characters")
                    print(f"   📊 Total Characters: {stats['total_characters']:,}")
                    print(f"   📊 Average per Item: {stats['average_per_item']:,.2f}")
                    
                    dist = analytics['content_length_distribution']
                    print(f"\n📊 Content Distribution:")
                    print(f"   📝 Short (< 1K): {dist['short_content']} items")
                    print(f"   📄 Medium (1K-5K): {dist['medium_content']} items")
                    print(f"   📚 Long (≥ 5K): {dist['long_content']} items")
                    
                else:
                    print(f"❌ Failed to analyze {file}")
                    
            except Exception as e:
                print(f"❌ Error analyzing {file}: {e}")
        else:
            print(f"⚠️  File {file} not found, skipping...")
    
    print(f"\n{'='*50}")
    print("🎉 Analytics complete!")
    print('='*50)

if __name__ == "__main__":
    main() 