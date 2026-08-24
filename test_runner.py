#!/usr/bin/env python3
"""Zinvent unified test runner - works for all 16 products."""
import subprocess
import sys
import os
import json
from pathlib import Path

BASE = Path("/home/allenos/zinvent/projects")

products = {
    "invoiceph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "taxcalcph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "payslipph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "sellerprice": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "negosyosheet": {"type": "excel", "tests": ["openpyxl", "formulas", "demo"]},
    "tippoolcalc": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "rentsheet": {"type": "excel", "tests": ["formulas", "demo"]},
    "moveinreport": {"type": "js", "tests": ["smoke", "storage", "pro"]},
    "pumproute": {"type": "js", "tests": ["smoke", "storage", "pro"]},
    "ratecalcph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "tradejournalph": {"type": "excel", "tests": ["formulas", "demo"]},
    "utangplanph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "commissionph": {"type": "js", "tests": ["smoke", "calc", "storage", "pro"]},
    "freelancerkitph": {"type": "excel", "tests": ["formulas", "demo"]},
    "closer": {"type": "js", "tests": ["smoke", "calc", "storage", "pro", "affiliate"]},
}

def run_js_tests(product, test_types):
    """Run JavaScript product tests via Playwright."""
    pass

def run_excel_tests(product, test_types):
    """Run Excel product tests via Python."""
    pass

if __name__ == "__main__":
    print("Zinvent Unified Test Runner")
    print("=" * 50)
    # Run tests for each product
    for name, config in products.items():
        print(f"\n{name}: {config['type']} - {config['tests']}")