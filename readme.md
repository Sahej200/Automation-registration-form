# 📝 Registration Form Automation Project

This project contains a fully functional Registration Form built using HTML, CSS, and JavaScript, along with a Selenium-based automation script written in Python.  
The automation tests validate form behavior, error handling, field logic, and successful submission flow.

---

## 🚀 Features

### Frontend (index.html)
- Full registration form UI  
- Real-time validation  
- Dynamic country → state → city selection  
- Password strength indicator  
- Instant error message display  
- Auto-enable submit button  
- Clean and responsive interface  

### Automation (Selenium)
- Negative test: Missing last name  
- Positive test: Valid form submission  
- Logical validation: Button enable/disable, field rules  
- Screenshot capture for each tested scenario  
- End-to-end form submission flow  

---

## 📁 Project Structure

AUTOMATION_REGISTRATION/
│── index.html
│── style.css
│── script.js
│── README.md
└── registration_automation/
│── test_form.py
└── screenshots/
├── success-state.png
└── error-state.png

yaml
Copy code

---

## 🛠️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/Sahej200/automation-registration.git
cd automation-registration
2. Create Virtual Environment 
bash
Copy code
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
3. Install Dependencies
bash
Copy code
pip install selenium webdriver-manager
4. Run Local Web Server (Recommended)
This avoids file:// permission issues.

bash
Copy code
python -m http.server 8000
Visit:
👉 http://localhost:8000/index.html