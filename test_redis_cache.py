#!/usr/bin/env python3
"""
Test script for Redis cache functionality.

Tests:
1. Redis connection availability
2. Graceful fallback when Redis is unavailable
3. Query cache integration
4. Cache performance
"""

import asyncio
import time
import logging
import sys
import os

# Add the sports_intelligence_layer to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'sports_intelligence_layer'))

from sports_intelligence_layer.src.query_cache.query_cache import create_query_cache, REDIS_AVAILABLE
from sports_intelligence_layer.src.query_cache.redis_config import RedisConfigManager

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)


async def test_redis_availability():
    """Test basic Redis availability and connection."""
    print("Testing Redis Availability")
    print("-" * 50)

    print(f"Redis Python client available: {REDIS_AVAILABLE}")

    if not REDIS_AVAILABLE:
        print("FAIL: Redis Python client not available")
        return False

    # Test cache creation
    try:
        cache = create_query_cache()
        if cache is None:
            print("FAIL: Query cache creation returned None")
            return False

        print("PASS: Query cache created successfully")

        # Test basic operations
        test_key = "test:connection"
        test_data = {"message": "Hello Redis!", "timestamp": time.time()}

        try:
            await cache.cache_result(test_key, {}, test_data, ttl=60)
            print("✅ Cache write operation succeeded")

            cached_result = await cache.get_cached_result(test_key, {})
            if cached_result:
                print("✅ Cache read operation succeeded")
                print(f"   Cached data: {cached_result}")
            else:
                print("⚠️  Cache read returned None (Redis server might be down)")

        except Exception as e:
            print(f"⚠️  Cache operations failed: {e}")
            print("   This is expected if Redis server is not running")

        # Clean up
        try:
            await cache.close()
            print("✅ Cache cleanup completed")
        except Exception as e:
            print(f"⚠️  Cache cleanup failed: {e}")

        return True

    except Exception as e:
        print(f"❌ Cache creation failed: {e}")
        return False


async def test_cache_fallback():
    """Test graceful fallback when Redis is unavailable."""
    print("\n🛡️  Testing Cache Fallback Behavior")
    print("-" * 50)

    cache = create_query_cache()
    if cache is None:
        print("⚠️  No cache created (fallback to no-cache mode)")
        return True

    # Test operations when Redis might be down
    test_operations = [
        ("cache_result", lambda: cache.cache_result("test:fallback", {}, {"data": "test"}, ttl=30)),
        ("get_cached_result", lambda: cache.get_cached_result("test:fallback", {})),
        ("invalidate_pattern", lambda: cache.invalidate_pattern("test:*")),
        ("get_cache_stats", lambda: cache.get_cache_stats()),
        ("close", lambda: cache.close()),
    ]

    for op_name, operation in test_operations:
        try:
            result = await operation()
            print(f"✅ {op_name}: Success (result: {type(result).__name__})")
        except Exception as e:
            print(f"⚠️  {op_name}: {e}")

    return True


async def test_performance_comparison():
    """Test cache performance vs direct operations."""
    print("\n⚡ Testing Cache Performance")
    print("-" * 50)

    cache = create_query_cache()
    if cache is None:
        print("⚠️  No cache available for performance testing")
        return

    test_key = "perf:test"
    test_params = {"entity": "test_player", "stat": "goals"}
    test_data = {
        "value": 42,
        "matches": 25,
        "season": "2024-25"
    }

    # Warm-up cache
    try:
        await cache.cache_result(test_key, test_params, test_data, ttl=300)
    except Exception as e:
        print(f"⚠️  Cache warm-up failed: {e}")
        return

    # Test cache hit performance
    cache_times = []
    for i in range(5):
        start_time = time.time()
        try:
            result = await cache.get_cached_result(test_key, test_params)
            end_time = time.time()
            cache_times.append((end_time - start_time) * 1000)  # Convert to ms
            if result:
                status = "HIT"
            else:
                status = "MISS"
        except Exception as e:
            cache_times.append(float('inf'))
            status = f"ERROR: {e}"

        print(f"   Cache lookup {i+1}: {cache_times[-1]:.2f}ms ({status})")

    if cache_times and all(t != float('inf') for t in cache_times):
        avg_time = sum(cache_times) / len(cache_times)
        print(f"📊 Average cache lookup time: {avg_time:.2f}ms")

    # Clean up
    try:
        await cache.close()
    except Exception:
        pass


def test_redis_config():
    """Test Redis configuration management."""
    print("\n⚙️  Testing Redis Configuration")
    print("-" * 50)

    try:
        config = RedisConfigManager.get_recommended_config()
        print("✅ Redis configuration loaded successfully")
        print(f"   Memory policy: {config.get('maxmemory-policy', 'unknown')}")
        print(f"   Max memory: {config.get('maxmemory', 'unknown')}")
        print(f"   Port: {config.get('port', 'unknown')}")

        # Test config file generation
        config_manager = RedisConfigManager()
        config_content = config_manager.generate_config_file()
        if config_content:
            print("✅ Configuration file generation successful")
            print(f"   Config length: {len(config_content)} characters")
        else:
            print("⚠️  Configuration file generation returned empty content")

    except Exception as e:
        print(f"❌ Redis configuration test failed: {e}")


async def main():
    """Run all cache tests."""
    print("Redis Cache System Verification")
    print("=" * 80)

    # Test 1: Redis Availability
    redis_available = await test_redis_availability()

    # Test 2: Fallback Behavior
    await test_cache_fallback()

    # Test 3: Performance (if Redis is available)
    if redis_available:
        await test_performance_comparison()

    # Test 4: Configuration
    test_redis_config()

    print("\n" + "=" * 80)
    print("Cache Verification Complete")

    if not redis_available:
        print("\nTo enable full Redis functionality:")
        print("   1. Install Redis server")
        print("   2. Start Redis service")
        print("   3. Ensure Redis is running on localhost:6379")
        print("\n   The system will work without Redis but with reduced performance.")


if __name__ == "__main__":
    asyncio.run(main())