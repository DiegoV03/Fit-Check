import requests
from bs4 import BeautifulSoup

def classify_category(name: str, description: str = "") -> str:
    text = f"{name} {description}".lower()

    if any(k in text for k in ["t-shirt", "tee", "shirt", "blouse", "top", "polo"]):
        return "Shirt"
    elif any(k in text for k in ["jeans", "pants", "trousers", "shorts", "slacks", "cargo"]):
        return "Pants"
    elif any(k in text for k in ["coat", "jacket", "parka", "hoodie", "outerwear", "blazer"]):
        return "Outerwear"
    elif any(k in text for k in ["hat", "cap", "belt", "scarf", "gloves", "watch", "accessory", "bag"]):
        return "Accessory"
    else:
        return "Other"


def scrape_zara_product(url: str) -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "无法访问该链接"}

    soup = BeautifulSoup(response.text, "html.parser")

    # 示例解析逻辑（需要根据Zara网页结构调整）
    name = soup.find("h1").text.strip() if soup.find("h1") else "未知"
    image = soup.find("img")["src"] if soup.find("img") else ""
    color = "未知"
    category = classify_category(name)

    return {
        "name": name,
        "color": color,
        "category": category,
        "image_url": image
    }
import requests
from bs4 import BeautifulSoup

def scrape_ssense_product(url: str) -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "无法访问该链接"}

    soup = BeautifulSoup(response.text, "html.parser")

    try:
        # 提取品牌名（位于 meta）
        brand = soup.find("meta", property="og:brand")
        brand = brand["content"] if brand else "Unknown Brand"

        # 提取商品名称
        title_tag = soup.find("meta", property="og:title")
        name = title_tag["content"] if title_tag else "Unknown Item"

        # 提取图片链接
        image_tag = soup.find("meta", property="og:image")
        image_url = image_tag["content"] if image_tag else ""

        # 提取颜色（从正文中查找含有 "Supplier color" 的行）
        description = soup.get_text()
        color = "Unknown"
        for line in description.split("\n"):
            if "Supplier color" in line:
                color = line.split(":")[-1].strip()
                break

        return {
            "name": name,
            "brand": brand,
            "color": color,
            "category": "Shirt",
            "image_url": image_url
        }

    except Exception as e:
        return {"error": f"解析失败：{str(e)}"}

def p2_vignette(fn, r0, c0):
    """
    Apply a vignetting effect to an image.

    Parameters:
    - fn (str): The relative path to the input image.
    - r0 (int): Row position of the vignetting center.
    - c0 (int): Column position of the vignetting center.
    """
    # Loading image
    img = cv2.imread(fn)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    M, N, _ = img.shape

    # Compute maximum distance (dm)
    dm = np.sqrt((max(r0, M - 1 - r0))**2 + (max(c0, N - 1 - c0))**2)
    print(f"d_m = {dm:.1f}")

    # Create grid of distances
    rows, cols = np.meshgrid(np.arange(M), np.arange(N), indexing='ij')
    D = np.sqrt((rows - r0)**2 + (cols - c0)**2)

    # Computing weight array (W)
    W = 1 - np.sqrt(D / dm)
    W = np.clip(W, 0, 1)

    # Extracting values
    positions = np.array([
        (M // 4, N // 4),
        (M // 4, 3 * N // 4),
        (3 * M // 4, N // 4),
        (3 * M // 4, 3 * N // 4)
    ])
    weights = W[positions[:, 0], positions[:, 1]]
    print("\n".join([f"W[{pos[0]},{pos[1]}] = {val:.2f}" for pos, val in zip(positions, weights)]))

    W_expanded = np.expand_dims(W, axis=2)
    img_vignetted = (img * W_expanded).astype(np.uint8)

    # Extract specific pixel values
    pixel_values = img_vignetted[positions[:, 0], positions[:, 1], :]
    print("\n".join([f"I[{pos[0]},{pos[1]}] = {val.tolist()}" for pos, val in zip(positions, pixel_values)]))

    plt.imshow(img_vignetted)
    plt.axis('off')
    plt.show()