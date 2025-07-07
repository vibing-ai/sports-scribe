#!/usr/bin/env python3
"""
Test script for SportsScribe pipeline logging.

This script tests the logging functionality to ensure it works correctly.
"""

import asyncio
import os
import tempfile
from pathlib import Path

from utils.logging_config import (
    setup_logging,
    log_pipeline_start,
    log_pipeline_step,
    log_pipeline_success,
    log_pipeline_error,
    log_data_collection,
    log_research_operation,
    log_writing_operation
)


async def test_logging_functionality():
    """Test all logging functionality."""
    
    # Create temporary log file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.log', delete=False) as tmp_file:
        log_file = tmp_file.name
    
    try:
        print("🧪 Testing SportsScribe Pipeline Logging")
        print("=" * 50)
        
        # Test 1: Basic logging setup
        print("\n1. Testing basic logging setup...")
        setup_logging(
            level="DEBUG",
            log_file=log_file,
            include_debug=True
        )
        print("✅ Basic logging setup completed")
        
        # Test 2: Pipeline operation logging
        print("\n2. Testing pipeline operation logging...")
        log_pipeline_start("test_operation", game_id="1234567", user="test_user")
        log_pipeline_step("data_collection", records=100, errors=0)
        log_pipeline_step("research", sources=3, analysis_time=2.5)
        log_pipeline_step("writing", article_type="recap", storylines=5)
        log_pipeline_success("test_operation", duration=5.2, articles_generated=1)
        print("✅ Pipeline operation logging completed")
        
        # Test 3: Agent-specific logging
        print("\n3. Testing agent-specific logging...")
        log_data_collection("api-football", endpoint="/fixtures", game_id="1234567")
        log_research_operation("team_history", home_team="123", away_team="456")
        log_writing_operation("game_recap", game_id="1234567", storylines_count=5)
        print("✅ Agent-specific logging completed")
        
        # Test 4: Error logging
        print("\n4. Testing error logging...")
        try:
            raise ValueError("Test error for logging")
        except Exception as e:
            log_pipeline_error("test_operation", e, duration=1.5, context="test_context")
        print("✅ Error logging completed")
        
        # Test 5: Verify log file contents
        print("\n5. Verifying log file contents...")
        with open(log_file, 'r') as f:
            log_contents = f.read()
        
        # Check for expected log entries
        expected_patterns = [
            "[PIPELINE] Starting test_operation",
            "[PIPELINE] Step: data_collection",
            "[COLLECTOR] Collecting from api-football",
            "[RESEARCHER] team_history",
            "[WRITER] Generating game_recap",
            "[PIPELINE] test_operation completed successfully",
            "[PIPELINE] test_operation failed"
        ]
        
        found_patterns = []
        for pattern in expected_patterns:
            if pattern in log_contents:
                found_patterns.append(pattern)
                print(f"✅ Found: {pattern}")
            else:
                print(f"❌ Missing: {pattern}")
        
        print(f"\n📊 Log verification: {len(found_patterns)}/{len(expected_patterns)} patterns found")
        
        # Test 6: Performance timing
        print("\n6. Testing performance timing...")
        import time
        start_time = time.time()
        
        log_pipeline_start("performance_test", test_id="perf_001")
        await asyncio.sleep(0.1)  # Simulate some work
        log_pipeline_success("performance_test", duration=time.time() - start_time, test_id="perf_001")
        
        print("✅ Performance timing completed")
        
        # Test 7: Different log levels
        print("\n7. Testing different log levels...")
        
        # Create a new log file for level testing
        with tempfile.NamedTemporaryFile(mode='w', suffix='.log', delete=False) as tmp_file2:
            log_file2 = tmp_file2.name
        
        setup_logging(level="WARNING", log_file=log_file2, include_debug=False)
        
        # These should not appear in WARNING level
        log_pipeline_start("level_test", test_id="level_001")
        log_pipeline_step("test_step", data="test")
        
        # This should appear
        log_pipeline_error("level_test", Exception("Test warning"), duration=0.1, test_id="level_001")
        
        with open(log_file2, 'r') as f:
            warning_log_contents = f.read()
        
        if "[PIPELINE] Starting level_test" not in warning_log_contents:
            print("✅ INFO level logs correctly filtered out")
        else:
            print("❌ INFO level logs should be filtered out")
        
        if "[PIPELINE] level_test failed" in warning_log_contents:
            print("✅ ERROR level logs correctly included")
        else:
            print("❌ ERROR level logs should be included")
        
        # Clean up temporary file
        os.unlink(log_file2)
        
        print("\n🎉 All logging tests completed successfully!")
        
        # Show log file location
        print(f"\n📁 Log file created at: {log_file}")
        print(f"📄 Log file size: {Path(log_file).stat().st_size} bytes")
        
        # Show sample log entries
        print("\n📋 Sample log entries:")
        with open(log_file, 'r') as f:
            lines = f.readlines()
            for i, line in enumerate(lines[:10]):  # Show first 10 lines
                print(f"  {i+1:2d}: {line.strip()}")
            if len(lines) > 10:
                print(f"  ... and {len(lines) - 10} more lines")
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        raise
    
    finally:
        # Clean up temporary file
        if os.path.exists(log_file):
            os.unlink(log_file)


def test_logging_config():
    """Test logging configuration functions."""
    print("\n🔧 Testing logging configuration...")
    
    # Test setup_logging with different parameters
    setup_logging(level="INFO")
    print("✅ INFO level setup completed")
    
    setup_logging(level="DEBUG", include_debug=True)
    print("✅ DEBUG level setup completed")
    
    setup_logging(level="WARNING")
    print("✅ WARNING level setup completed")
    
    print("✅ Logging configuration tests completed")


if __name__ == "__main__":
    print("🧪 SportsScribe Pipeline Logging Test Suite")
    print("=" * 60)
    
    # Test logging configuration
    test_logging_config()
    
    # Test logging functionality
    asyncio.run(test_logging_functionality())
    
    print("\n🎉 All tests completed successfully!")
    print("\n💡 To use logging in your pipeline:")
    print("   1. Import: from utils.logging_config import setup_logging")
    print("   2. Setup: setup_logging(level='INFO', log_file='logs/pipeline.log')")
    print("   3. Use: Logging happens automatically in the pipeline") 