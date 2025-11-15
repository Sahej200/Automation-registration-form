from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time
import os

# ==============================
# CREATE SCREENSHOT FOLDER
# ==============================
if not os.path.exists("screenshots"):
    os.makedirs("screenshots")

# ==============================
# START CHROME DRIVER
# ==============================
driver = webdriver.Chrome()
driver.get("file:///D:/reg_automation/index.html")
print("Page Title:", driver.title)
print("Current URL:", driver.current_url)
time.sleep(1)

# ==============================
# FLOW A: Negative Scenario - Last Name Missing
# ==============================
def negative_last_name():
    driver.refresh()  # Refresh page to start fresh
    time.sleep(1)
    
    driver.find_element(By.ID, "firstName").send_keys("Deepak")
    # Last Name intentionally left blank
    driver.find_element(By.ID, "email").send_keys("deepak@example.com")
    driver.find_element(By.ID, "phone").send_keys("+911234567890")
    driver.find_element(By.CSS_SELECTOR, "input[name='gender'][value='Male']").click()
    driver.find_element(By.ID, "age").send_keys("25")
    driver.find_element(By.ID, "address").send_keys("123, MG Road")
    Select(driver.find_element(By.ID, "country")).select_by_visible_text("India")
    time.sleep(1)
    Select(driver.find_element(By.ID, "state")).select_by_visible_text("Maharashtra")
    time.sleep(1)
    Select(driver.find_element(By.ID, "city")).select_by_visible_text("Pune")
    driver.find_element(By.ID, "password").send_keys("StrongPass@123")
    driver.find_element(By.ID, "confirmPassword").send_keys("StrongPass@123")
    driver.find_element(By.ID, "terms").click()

    driver.find_element(By.ID, "submitBtn").click()
    time.sleep(2)
    driver.save_screenshot("screenshots/error-state.png")
    print("Flow A completed: Screenshot saved as error-state.png")

# ==============================
# FLOW B: Positive Scenario - All Fields Valid
# ==============================
def positive_scenario():
    driver.refresh()
    time.sleep(1)

    driver.find_element(By.ID, "firstName").send_keys("Deepak")
    driver.find_element(By.ID, "lastName").send_keys("Kumar")
    driver.find_element(By.ID, "email").send_keys("deepak@example.com")
    driver.find_element(By.ID, "phone").send_keys("+911234567890")
    driver.find_element(By.CSS_SELECTOR, "input[name='gender'][value='Male']").click()
    driver.find_element(By.ID, "age").send_keys("25")
    driver.find_element(By.ID, "address").send_keys("123, MG Road")
    Select(driver.find_element(By.ID, "country")).select_by_visible_text("India")
    time.sleep(1)
    Select(driver.find_element(By.ID, "state")).select_by_visible_text("Maharashtra")
    time.sleep(1)
    Select(driver.find_element(By.ID, "city")).select_by_visible_text("Pune")
    driver.find_element(By.ID, "password").send_keys("StrongPass@123")
    driver.find_element(By.ID, "confirmPassword").send_keys("StrongPass@123")
    driver.find_element(By.ID, "terms").click()

    driver.find_element(By.ID, "submitBtn").click()
    time.sleep(2)
    driver.save_screenshot("screenshots/success-state.png")
    print("Flow B completed: Screenshot saved as success-state.png")

# ==============================
# FLOW C: Form Logic Validation
# ==============================
def form_logic_validation():
    driver.refresh()
    time.sleep(1)
    
    # Country → States update
    Select(driver.find_element(By.ID, "country")).select_by_visible_text("United States")
    time.sleep(2)
    states = [opt.text for opt in Select(driver.find_element(By.ID, "state")).options]
    print("States after country change:", states)

    # State → Cities update
    Select(driver.find_element(By.ID, "state")).select_by_index(1)
    time.sleep(2)
    cities = [opt.text for opt in Select(driver.find_element(By.ID, "city")).options]
    print("Cities after state change:", cities)

    # Password strength
    driver.find_element(By.ID, "password").send_keys("weak")
    time.sleep(1)
    pwd_strength = driver.find_element(By.ID, "pwdText").text
    print("Password Strength:", pwd_strength)

    # Wrong confirm password
    driver.find_element(By.ID, "confirmPassword").send_keys("wrongpass")
    driver.find_element(By.ID, "submitBtn").click()
    time.sleep(1)
    confirm_error = driver.find_element(By.ID, "err-confirmPassword").text
    print("Confirm Password Error:", confirm_error)

    # Submit button enabled?
    is_enabled = driver.find_element(By.ID, "submitBtn").is_enabled()
    print("Submit button enabled?", is_enabled)

# ==============================
# RUN ALL FLOWS
# ==============================
negative_last_name()
positive_scenario()
form_logic_validation()

time.sleep(2)
driver.quit()
print("All flows executed successfully.")
