#!/usr/bin/env python3
"""
Daily stocks updater for Mekal Invest.

This script:
1. Fetches current prices from Yahoo Finance's free (unauthenticated) endpoint
   for the 18 stocks currently shown in the Strong Buy section.
2. Updates the stock ticker tape data (prices + % change) in invest.html.
3. Updates the "Last Updated" date in the stocks section.
4. Bumps the version number.

No API key required. Uses query1.finance.yahoo.com public endpoints.
"""

import re
import json
import datetime
import urllib.request
import urllib.parse
import sys

HTML_FILE = "invest.html"

# All 18 tickers currently shown in the Strong Buy section
TICKERS = [
    "MSFT", "NVDA", "AMZN", "GOOGL", "MU", "AVGO",
    "META", "THC", "VLO", "AIR", "LRCX", "KLAC",
    "CIEN", "ADI", "CDNS", "ANAB", "MPC", "NATR",
]

# Ticker tape also shows ETFs - update these too
TICKER_TAPE_SYMBOLS = [
    ("MSFT", "Microsoft"),
    ("NVDA", "NVIDIA"),
    ("AMZN", "Amazon"),
    ("GOOGL", "Alphabet"),
    ("META", "Meta"),
    ("MU", "Micron"),
    ("AVGO", "Broadcom"),
    ("THC", "Tenet Health"),
    ("VLO", "Valero"),
    ("LRCX", "Lam Research"),
    ("VTI", "Total Stock"),
    ("BND", "Total Bond"),
    ("VXUS", "Intl Stocks"),
]


def fetch_quote(symbol):
    """Fetch current price and change% for a ticker from Yahoo Finance."""
    url = (
        "https://query1.finance.yahoo.com/v8/finance/chart/"
        f"{urllib.parse.quote(symbol)}?interval=1d&range=2d"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
            )
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception as exc:
        print(f"  ! failed {symbol}: {exc}")
        return None

    try:
        result = data["chart"]["result"][0]
        meta = result["meta"]
        price = meta["regularMarketPrice"]
        prev_close = meta.get("chartPreviousClose") or meta.get("previousClose", price)
        change_pct = ((price - prev_close) / prev_close * 100) if prev_close else 0.0
        return {"price": float(price), "chg": float(change_pct)}
    except (KeyError, IndexError, TypeError) as exc:
        print(f"  ! parse failed {symbol}: {exc}")
        return None


def fetch_all_quotes():
    """Fetch quotes for all tickers we care about."""
    all_symbols = set(TICKERS) | {s for s, _ in TICKER_TAPE_SYMBOLS}
    quotes = {}
    for sym in sorted(all_symbols):
        q = fetch_quote(sym)
        if q:
            quotes[sym] = q
            print(f"  {sym}: ${q['price']:.2f} ({q['chg']:+.2f}%)")
    return quotes


def update_ticker_tape(html, quotes):
    """Replace the tickerStocks JS array with fresh prices."""
    lines = []
    for sym, name in TICKER_TAPE_SYMBOLS:
        q = quotes.get(sym)
        if q is None:
            continue
        lines.append(
            f"      {{sym:'{sym}',name:'{name}',price:{q['price']:.2f},chg:{q['chg']:.1f}}}"
        )
    new_block = "    var tickerStocks = [\n" + ",\n".join(lines) + "\n    ];"

    pattern = re.compile(r"    var tickerStocks = \[.*?\];", re.DOTALL)
    if not pattern.search(html):
        print("  ! tickerStocks block not found")
        return html
    return pattern.sub(new_block, html, count=1)


def update_last_updated(html):
    """Bump the 'Last Updated' date in the stocks section."""
    now = datetime.datetime.now(datetime.timezone.utc)
    today = now.strftime("%B ") + str(now.day) + ", " + str(now.year)
    pattern = re.compile(
        r"(Last Updated:\s*)[A-Za-z]+\s+\d{1,2},\s*\d{4}"
    )
    if not pattern.search(html):
        print("  ! Last Updated text not found")
        return html
    return pattern.sub(r"\1" + today, html, count=1)


def bump_version(html):
    """Bump the version number v#.# -> v#.(#+1)."""
    pattern = re.compile(r'<div id="version">v(\d+)\.(\d+)</div>')
    m = pattern.search(html)
    if not m:
        print("  ! version marker not found")
        return html
    major = int(m.group(1))
    minor = int(m.group(2)) + 1
    return pattern.sub(f'<div id="version">v{major}.{minor}</div>', html, count=1)


def main():
    print("Fetching quotes...")
    quotes = fetch_all_quotes()
    if not quotes:
        print("No quotes fetched - aborting to avoid wiping data")
        sys.exit(1)

    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    print("Updating ticker tape...")
    html = update_ticker_tape(html, quotes)

    print("Updating last-updated date...")
    html = update_last_updated(html)

    print("Bumping version...")
    html = bump_version(html)

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(html)

    print("Done.")


if __name__ == "__main__":
    main()
