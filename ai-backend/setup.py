"""
Setup configuration for Sport Scribe AI Backend.
"""

from setuptools import setup, find_packages
import os

# Read the contents of README file
this_directory = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(this_directory, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

# Read requirements
with open('requirements.txt') as f:
    requirements = f.read().splitlines()

with open('requirements-dev.txt') as f:
    dev_requirements = f.read().splitlines()

setup(
    name="sport-scribe-ai-backend",
    version="1.0.0",
    author="Sport Scribe Team",
    author_email="team@sportscribe.ai",
    description="Multi-agent AI system for generating sports articles",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/vibing-ai/sports-scribe",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.11",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Internet :: WWW/HTTP :: HTTP Servers",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    python_requires=">=3.11",
    install_requires=requirements,
    extras_require={
        "dev": dev_requirements,
        "test": [
            "pytest>=7.0",
            "pytest-asyncio>=0.21",
            "pytest-cov",
            "pytest-mock",
        ],
    },
    entry_points={
        "console_scripts": [
            "sport-scribe=main:app",
        ],
    },
    include_package_data=True,
    package_data={
        "": ["*.txt", "*.md", "*.yml", "*.yaml"],
    },
) 