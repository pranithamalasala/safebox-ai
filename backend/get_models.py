import urllib.request
import os

save_dir = r"C:\Users\dell\.EasyOCR\model"
os.makedirs(save_dir, exist_ok=True)

import ssl
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download(url, filename):
    path = os.path.join(save_dir, filename)
    print(f"Downloading {filename}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as r, open(path, 'wb') as f:
        total = int(r.headers.get('Content-Length', 0))
        downloaded = 0
        while True:
            chunk = r.read(8192)
            if not chunk:
                break
            f.write(chunk)
            downloaded += len(chunk)
            if total:
                print(f"\r  {int(downloaded*100/total)}%", end="")
    print(f"\n  Saved: {path}")

download(
    "https://huggingface.co/xiaoyao9184/easyocr/resolve/master/craft_mlt_25k.pth",
    "craft_mlt_25k.pth"
)

print("\nDone!")