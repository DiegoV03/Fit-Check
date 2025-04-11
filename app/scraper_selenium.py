from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import traceback

def scrape_ssense_selenium(url: str) -> dict:
    options = Options()
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")

    # 🚫 Optional: Disable headless if debugging CAPTCHA
    #options.add_argument("--headless")  # You can comment this out for debugging

    # 🛡️ Anti-bot protection bypass
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=options)

    # Remove navigator.webdriver to avoid detection
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            })
        """
    })

    try:
        driver.get(url)

        # Wait until product title is loaded
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "h2#pdpProductNameText"))
        )

        # Extract brand
        brand = driver.find_element(By.CSS_SELECTOR, "h1.pdp-product-title__brand a").text.strip()

        # Extract product name
        name = driver.find_element(By.CSS_SELECTOR, "h2#pdpProductNameText").text.strip()

        # Extract supplier color from product description
        description = driver.find_element(By.ID, "pdpProductDescriptionContainerText").text
        color = "Unknown"
        for line in description.split("\n"):
            if "Supplier color" in line:
                color = line.split(":")[-1].strip()
                break

        # Get main image
        image_element = driver.find_element(By.TAG_NAME, "img")
        image_url = image_element.get_attribute("src")

        driver.quit()

        return {
            "brand": brand,
            "name": name,
            "color": color,
            "category": "Shirt",
            "image_url": image_url
        }

    except Exception:
        html_sample = driver.page_source[:1000]
        driver.quit()
        return {
            "error": f"Parsing failed:\n{traceback.format_exc()}",
            "html_sample": html_sample
        }

def scrape_zara_selenium(url: str) -> dict:
    # Setup Chrome with optional headless mode off for debugging
    options = Options()
    # options.add_argument('--headless')  # Disable headless mode for manual captcha
    options.add_argument('--disable-blink-features=AutomationControlled')

    driver = webdriver.Chrome(options=options)
    driver.get(url)

    try:
        # Wait until the product name is present
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "h1.product-detail-info__header-name"))
        )

        # Extract product name
        name = driver.find_element(By.CSS_SELECTOR, "h1.product-detail-info__header-name").text.strip()

        # Extract price
        price = driver.find_element(By.CSS_SELECTOR, ".money-amount__main").text.strip()

        # Extract product description
        description = driver.find_element(By.CSS_SELECTOR, ".expandable-text__inner-content > p").text.strip()

        # Extract color (if available)
        try:
            color = driver.find_element(By.CSS_SELECTOR, ".product-color-extended-name").text.strip()
        except:
            color = "Unknown"

        # Extract image (first product image)
        try:
            image = driver.find_element(By.CSS_SELECTOR, "img.media-image__image").get_attribute("src")
        except:
            try:
                image = driver.find_element(By.CSS_SELECTOR, "img[loading='lazy']").get_attribute("src")
            except:
                image = ""

        return {
            "name": name,
            "price": price,
            "color": color,
            "description": description,
            "image_url": image,
            "category": "Shirt"
        }

    except Exception as e:
        return {"error": f"Parsing failed: {str(e)}"}

    finally:
        driver.quit()
