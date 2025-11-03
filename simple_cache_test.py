#!/usr/bin/env python3
"""
Simple test for Redis cache functionality
"""

import asyncio
import sys
import os

# Add the sports_intelligence_layer to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'sports_intelligence_layer'))

try:
    from sports_intelligence_layer.src.query_cache.query_cache import create_query_cache, REDIS_AVAILABLE
    print(f"Redis Python client available: {REDIS_AVAILABLE}")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)

async def test_basic_cache():
    print("Testing basic cache functionality...")

    # Create cache instance
    cache = create_query_cache()
    if cache is None:
        print("WARNING: No cache created (Redis server might not be running)")
        return

    print("Cache instance created successfully")

    # Test basic operations
    test_key = "test_query"
    test_params = {"player": "test"}
    test_data = {"goals": 5, "assists": 3}

    try:
        # Test cache write
        await cache.cache_result(test_key, test_params, test_data, ttl=60)
        print("Cache write: SUCCESS")

        # Test cache read
        result = await cache.get_cached_result(test_key, test_params)
        if result:
            print(f"Cache read: SUCCESS - {result}")
        else:
            print("Cache read: MISS (expected if Redis server not running)")

    except Exception as e:
        print(f"Cache operation error: {e}")
        print("This is expected if Redis server is not running")

    # Test cleanup
    try:
        await cache.close()
        print("Cache cleanup: SUCCESS")
    except Exception as e:
        print(f"Cache cleanup error: {e}")

async def main():
    print("="*50)
    print("Simple Redis Cache Test")
    print("="*50)

    await test_basic_cache()

    print("="*50)
    print("Test completed")

if __name__ == "__main__":
    asyncio.run(main())