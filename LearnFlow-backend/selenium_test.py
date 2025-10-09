"""
to test the LearnFlow application. Focus is on:
- Simple, clear test scenarios
- Basic UI interactions
- Easy-to-understand assertions
- Manual testing concepts automated

Prerequisites:
- Install selenium: pip install selenium
- Download ChromeDriver and place in same folder as this script
- Start frontend server: npm run dev (usually on http://localhost:5173)

Run: python simple_qa_tests.py
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time
import sys

class LearnFlowQATests:
    def __init__(self):
        """Initialize the test setup"""
        print("🔧 Setting up test environment...")
        
        # Website URL to test
        self.base_url = "http://localhost:5174"
        
        # Setup Chrome driver
        try:
            # Try to use chromedriver from current folder
            service = Service(executable_path="chromedriver.exe")
            self.driver = webdriver.Chrome(service=service)
        except:
            # Fallback to system PATH
            self.driver = webdriver.Chrome()
        
        # Set window size for consistent testing
        self.driver.maximize_window()
        
        # Wait helper
        self.wait = WebDriverWait(self.driver, 10)
        
        print("✅ Browser setup complete")

    def test_01_website_loads(self):
        """Test Case 1: Check if the website loads properly"""
        print("\n🧪 Test 1: Website Loading")
        
        try:
            # Navigate to the website
            self.driver.get(self.base_url)
            
            # Wait for page to load
            time.sleep(3)
            
            # Check if we can find the page body
            body = self.driver.find_element(By.TAG_NAME, "body")
            
            if body:
                print("✅ PASS: Website loads successfully")
                return True
            else:
                print("❌ FAIL: Website did not load")
                return False
                
        except Exception as e:
            print(f"❌ FAIL: Error loading website - {e}")
            return False

    def test_02_page_title(self):
        """Test Case 2: Check page title"""
        print("\n🧪 Test 2: Page Title Check")
        
        try:
            title = self.driver.title
            print(f"Page title: '{title}'")
            
            # Check if title is not empty
            if title and len(title) > 0:
                print("✅ PASS: Page has a title")
                return True
            else:
                print("❌ FAIL: Page title is empty")
                return False
                
        except Exception as e:
            print(f"❌ FAIL: Could not get page title - {e}")
            return False

    def test_03_navigation_exists(self):
        """Test Case 3: Check if navigation menu exists"""
        print("\n🧪 Test 3: Navigation Menu Check")
        
        try:
            # Look for common navigation selectors
            nav_found = False
            nav_selectors = ["nav", ".navbar", "[role='navigation']", "header"]
            
            for selector in nav_selectors:
                try:
                    nav_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    if nav_element.is_displayed():
                        print(f"✅ PASS: Navigation found using selector: {selector}")
                        nav_found = True
                        break
                except:
                    continue
            
            if not nav_found:
                print("❌ FAIL: No navigation menu found")
                return False
            
            return True
            
        except Exception as e:
            print(f"❌ FAIL: Error checking navigation - {e}")
            return False

    def test_04_search_input_exists(self):
        """Test Case 4: Check if search/input field exists for roadmap generation"""
        print("\n🧪 Test 4: Search Input Field Check")
        
        try:
            # Look for input fields that might be used for roadmap generation
            input_found = False
            input_selectors = [
                "input[type='text']",
                "input[placeholder*='keyword']", 
                "input[placeholder*='topic']",
                "input[placeholder*='search']",
                ".search-input",
                "#search"
            ]
            
            for selector in input_selectors:
                try:
                    input_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    if input_element.is_displayed():
                        print(f"✅ PASS: Input field found using selector: {selector}")
                        input_found = True
                        break
                except:
                    continue
            
            if not input_found:
                print("⚠️ WARNING: No obvious input field found")
                return False
            
            return True
            
        except Exception as e:
            print(f"❌ FAIL: Error checking input fields - {e}")
            return False

    def test_05_buttons_exist(self):
        """Test Case 5: Check if buttons exist and are clickable"""
        print("\n🧪 Test 5: Button Existence Check")
        
        try:
            # Find all buttons on the page
            buttons = self.driver.find_elements(By.TAG_NAME, "button")
            
            if len(buttons) == 0:
                print("❌ FAIL: No buttons found on the page")
                return False
            
            print(f"Found {len(buttons)} button(s)")
            
            # Check if buttons are clickable
            clickable_buttons = 0
            for i, button in enumerate(buttons):
                if button.is_displayed() and button.is_enabled():
                    clickable_buttons += 1
                    button_text = button.text or f"Button {i+1}"
                    print(f"  - Clickable button: {button_text}")
            
            if clickable_buttons > 0:
                print(f"✅ PASS: {clickable_buttons} clickable button(s) found")
                return True
            else:
                print("❌ FAIL: No clickable buttons found")
                return False
                
        except Exception as e:
            print(f"❌ FAIL: Error checking buttons - {e}")
            return False

    def test_06_basic_interaction(self):
        """Test Case 6: Try basic interaction - typing in input field"""
        print("\n🧪 Test 6: Basic User Interaction")
        
        try:
            # Find the first text input field
            input_element = None
            input_selectors = ["input[type='text']", "input", "textarea"]
            
            for selector in input_selectors:
                try:
                    input_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                    if input_element.is_displayed() and input_element.is_enabled():
                        break
                except:
                    continue
            
            if not input_element:
                print("⚠️ WARNING: No input field available for interaction")
                return False
            
            # Try typing in the input field
            test_text = "React"
            input_element.clear()
            input_element.send_keys(test_text)
            
            # Verify text was entered
            entered_text = input_element.get_attribute("value")
            
            if entered_text == test_text:
                print(f"✅ PASS: Successfully typed '{test_text}' in input field")
                return True
            else:
                print(f"❌ FAIL: Expected '{test_text}', but got '{entered_text}'")
                return False
                
        except Exception as e:
            print(f"❌ FAIL: Error during basic interaction - {e}")
            return False

    def test_07_responsive_check(self):
        """Test Case 7: Basic responsive design check"""
        print("\n🧪 Test 7: Basic Responsive Design Check")
        
        try:
            # Test mobile size
            self.driver.set_window_size(375, 667)  # iPhone size
            time.sleep(2)
            
            # Check if page still loads
            body = self.driver.find_element(By.TAG_NAME, "body")
            
            if body and body.is_displayed():
                print("✅ PASS: Page displays on mobile size")
                mobile_test = True
            else:
                print("❌ FAIL: Page doesn't display properly on mobile")
                mobile_test = False
            
            # Reset to desktop size
            self.driver.maximize_window()
            time.sleep(1)
            
            return mobile_test
            
        except Exception as e:
            print(f"❌ FAIL: Error during responsive check - {e}")
            return False

    def test_08_page_scroll(self):
        """Test Case 8: Check if page can be scrolled"""
        print("\n🧪 Test 8: Page Scroll Test")
        
        try:
            # Get initial scroll position
            initial_scroll = self.driver.execute_script("return window.pageYOffset;")
            
            # Scroll down
            self.driver.execute_script("window.scrollTo(0, 500);")
            time.sleep(1)
            
            # Get new scroll position
            new_scroll = self.driver.execute_script("return window.pageYOffset;")
            
            if new_scroll > initial_scroll:
                print("✅ PASS: Page scrolling works")
                return True
            else:
                print("❌ FAIL: Page scrolling doesn't work")
                return False
                
        except Exception as e:
            print(f"❌ FAIL: Error during scroll test - {e}")
            return False

    def run_all_tests(self):
        """Run all test cases"""
        print("🚀 Starting LearnFlow QA Tests")
        print("=" * 50)
        
        # List of all test methods
        test_methods = [
            self.test_01_website_loads,
            self.test_02_page_title,
            self.test_03_navigation_exists,
            self.test_04_search_input_exists,
            self.test_05_buttons_exist,
            self.test_06_basic_interaction,
            self.test_07_responsive_check,
            self.test_08_page_scroll
        ]
        
        # Track results
        passed_tests = 0
        total_tests = len(test_methods)
        
        # Run each test
        for test_method in test_methods:
            try:
                if test_method():
                    passed_tests += 1
            except Exception as e:
                print(f"❌ FAIL: {test_method.__name__} - {e}")
        
        # Print summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if passed_tests == total_tests:
            print("🎉 ALL TESTS PASSED!")
        elif passed_tests > total_tests / 2:
            print("⚠️ MOST TESTS PASSED - Some issues found")
        else:
            print("❌ MANY TESTS FAILED - Significant issues found")

    def close_browser(self):
        """Clean up - close the browser"""
        print("\n🧹 Cleaning up...")
        self.driver.quit()
        print("✅ Browser closed")

def main():
    """Main function to run the tests"""
    # Check if user wants to continue
    print("LearnFlow Simple QA Tests")
    print("Make sure your frontend is running on http://localhost:5174")
    
    response = input("Ready to start tests? (y/N): ")
    if response.lower() != 'y':
        print("Tests cancelled.")
        return
    
    # Create test instance and run tests
    qa_tester = LearnFlowQATests()
    
    try:
        qa_tester.run_all_tests()
    except KeyboardInterrupt:
        print("\n⚠️ Tests interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
    finally:
        qa_tester.close_browser()

if __name__ == "__main__":
    main()