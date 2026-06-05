import urllib.request
import re
import os

try:
    from PIL import Image
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

url = "https://www.youtube.com/@jolienguyenofficial777/videos"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
except Exception as e:
    print(f"Error fetching page: {e}")
    sys.exit(1)

# Find video IDs
video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
# Remove duplicates while preserving order
seen = set()
unique_ids = []
for vid in video_ids:
    if vid not in seen:
        seen.add(vid)
        unique_ids.append(vid)

print(f"Found {len(unique_ids)} unique video IDs")
if len(unique_ids) < 4:
    print("Not enough videos found.")
    sys.exit(1)

selected_ids = unique_ids[:4]
print(f"Selected IDs: {selected_ids}")

images = []
for i, vid in enumerate(selected_ids):
    img_url = f"https://img.youtube.com/vi/{vid}/maxresdefault.jpg"
    img_path = f"thumb_{i}.jpg"
    print(f"Downloading {img_url} to {img_path}")
    try:
        urllib.request.urlretrieve(img_url, img_path)
        img = Image.open(img_path)
        images.append(img)
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")
        # Try hqdefault if maxresdefault fails
        try:
            img_url_hq = f"https://img.youtube.com/vi/{vid}/hqdefault.jpg"
            urllib.request.urlretrieve(img_url_hq, img_path)
            img = Image.open(img_path)
            images.append(img)
        except Exception as e2:
             print(f"Failed to download HQ too: {e2}")

if len(images) != 4:
    print("Could not get 4 images.")
    sys.exit(1)

# Ensure all images are same size, let's say 1280x720
target_size = (1280, 720)
resized_images = [img.resize(target_size) for img in images]

# Create a 2x2 grid
# 2560 x 1440
grid = Image.new('RGB', (target_size[0] * 2, target_size[1] * 2))
grid.paste(resized_images[0], (0, 0))
grid.paste(resized_images[1], (target_size[0], 0))
grid.paste(resized_images[2], (0, target_size[1]))
grid.paste(resized_images[3], (target_size[0], target_size[1]))

out_path = os.path.join("assets", "projects", "jolie_collage_real.jpg")
grid.save(out_path, quality=90)
print(f"Saved collage to {out_path}")
