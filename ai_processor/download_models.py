#!/usr/bin/env python3
"""
🤖 Download CPU-Optimized YOLO Models
Download lightweight nano models for better CPU performance
"""

import os
import sys
from pathlib import Path
import urllib.request
from ultralytics import YOLO

def download_with_progress(url, filename):
    """Download file with progress bar"""
    def progress_hook(block_num, block_size, total_size):
        downloaded = block_num * block_size
        if total_size > 0:
            percent = min(100, (downloaded * 100) // total_size)
            sys.stdout.write(f"\r⬇️  {filename}: {percent:3d}% [{downloaded // 1024:,} KB / {total_size // 1024:,} KB]")
            sys.stdout.flush()
    
    urllib.request.urlretrieve(url, filename, progress_hook)
    print()  # New line after progress

def ensure_model_exists(model_name):
    """Ensure YOLO model exists, download if necessary"""
    model_path = Path(model_name)
    
    if model_path.exists():
        print(f"✅ Model already exists: {model_name}")
        return True
    
    print(f"📦 Downloading {model_name}...")
    
    try:
        # Use ultralytics to automatically download
        model = YOLO(model_name)
        print(f"✅ Successfully downloaded: {model_name}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {model_name}: {e}")
        return False

def main():
    """Download all required models"""
    print("🤖 CPU-Optimized YOLO Models Downloader")
    print("="*50)
    
    # List of required models (nano versions for CPU efficiency)
    required_models = [
        "yolov8n.pt",          # Nano object detection model
        "yolov8n-pose.pt",     # Nano pose estimation model  
    ]
    
    print("📋 Required models:")
    for model in required_models:
        print(f"   • {model}")
    print()
    
    # Create models directory if it doesn't exist
    models_dir = Path("models")
    models_dir.mkdir(exist_ok=True)
    
    # Change to models directory
    original_dir = os.getcwd()
    os.chdir(models_dir)
    
    success_count = 0
    
    try:
        for model_name in required_models:
            if ensure_model_exists(model_name):
                success_count += 1
            print()
    finally:
        os.chdir(original_dir)
    
    print("="*50)
    print(f"📊 Download Summary:")
    print(f"   ✅ Successful: {success_count}/{len(required_models)}")
    print(f"   📁 Models saved to: {models_dir.absolute()}")
    
    if success_count == len(required_models):
        print("\n🎉 All models downloaded successfully!")
        print("💡 You can now run the CPU-optimized system:")
        print("   python cpu_optimized_main.py")
    else:
        print(f"\n⚠️  {len(required_models) - success_count} models failed to download")
        print("🔧 Try running this script again or check your internet connection")
        
    # Display model sizes
    print(f"\n📏 Model Information:")
    for model_name in required_models:
        model_path = models_dir / model_name
        if model_path.exists():
            size_mb = model_path.stat().st_size / (1024 * 1024)
            print(f"   • {model_name}: {size_mb:.1f} MB")

if __name__ == "__main__":
    main()
