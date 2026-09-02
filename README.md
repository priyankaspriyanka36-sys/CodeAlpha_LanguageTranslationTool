# 🌐 Language Translation Tool

A simple, modern, and user-friendly **Language Translation Tool** developed as **Task 1 of the CodeAlpha Artificial Intelligence Internship**.

The application allows users to enter text, select source and target languages, translate the text using a free online translation API, copy the translated result, and listen to the translation using the browser's speech feature.

---

## 🎯 Project Objective

The objective of this project is to develop a web-based language translation application that:

* Accepts text from the user
* Allows the user to select source and target languages
* Sends the text to a translation API
* Displays the translated result
* Provides a clean and responsive user interface
* Handles invalid input and API errors
* Provides additional copy and text-to-speech functionality

---

## ✨ Features

### 🔤 Translation

* Enter up to **5000 characters**
* Select source language
* Select target language
* Translate text using a free translation API
* Supports multiple commonly used languages

### 🔄 Language Swap

* Quickly swap the selected source and target languages
* Automatically updates the text areas when swapping

### 📋 Copy Translation

* Copy the translated text to the clipboard with one click

### 🔊 Text-to-Speech

* Listen to the translated text using the browser's built-in Speech Synthesis API

### 🧹 Clear

* Clear the entered text and translation result

### 📱 Responsive Design

* Works on desktop, tablet, and mobile screen sizes

### ⚠️ Error Handling

The application handles:

* Empty input
* Invalid language selection
* Text exceeding the character limit
* Internet connection problems
* Translation API failures
* Request timeouts

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask

### API

* MyMemory Translation API

### Other Tools

* Python Requests
* Python-dotenv
* Git
* GitHub
* Visual Studio Code

---

## 🏗️ Project Architecture

```text
User
  │
  ▼
Web Interface
(HTML + CSS + JavaScript)
  │
  │ POST /translate
  ▼
Flask Backend
(Python)
  │
  │ HTTP Request
  ▼
MyMemory Translation API
  │
  │ Translation Response
  ▼
Flask Backend
  │
  ▼
Web Interface
  │
  ▼
Translated Text
```

---

## 📁 Project Structure

```text
CodeAlpha_LanguageTranslationTool/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── .env.example
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

### File Description

| File/Folder            | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `app.py`               | Flask backend and translation API integration          |
| `requirements.txt`     | Python dependencies                                    |
| `README.md`            | Project documentation                                  |
| `.gitignore`           | Prevents unnecessary/private files from being uploaded |
| `.env.example`         | Example environment configuration                      |
| `templates/index.html` | Main application interface                             |
| `static/css/style.css` | Application styling and responsive design              |
| `static/js/script.js`  | Frontend functionality and API communication           |

---

## 🌍 Supported Languages

The application currently provides commonly used languages including:

* English
* Hindi
* Kannada
* Tamil
* Telugu
* Malayalam
* Marathi
* Bengali
* Gujarati
* Punjabi
* Urdu
* French
* German
* Spanish
* Italian
* Portuguese
* Russian
* Japanese
* Korean
* Chinese
* Arabic

---

## ⚙️ How It Works

1. The user enters text into the input area.
2. The user selects the source language.
3. The user selects the target language.
4. The frontend sends the translation request to the Flask backend.
5. Flask validates the input.
6. Flask sends the translation request to the MyMemory Translation API.
7. The API returns the translated text.
8. Flask sends the result back to the frontend.
9. The translated text is displayed to the user.

---

## 🚀 Installation and Setup

### Prerequisites

Make sure the following are installed:

* Python 3.x
* Git
* Visual Studio Code
* Internet connection

**Docker is not required.**

A Google Translate API key is also **not required**.

---

### 1. Clone the Repository

```bash
git clone https://github.com/priyankaspriyanka36-sys/CodeAlpha_LanguageTranslationTool.git
```

Move into the project directory:

```bash
cd CodeAlpha_LanguageTranslationTool
```

---

### 2. Create a Virtual Environment

Windows PowerShell:

```powershell
python -m venv venv
```

---

### 3. Activate the Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

You should see:

```text
(venv)
```

at the beginning of your terminal.

---

### 4. Install Dependencies

```powershell
pip install -r requirements.txt
```

---

### 5. Run the Application

```powershell
python app.py
```

The Flask development server will start at:

```text
http://127.0.0.1:5000
```

Open that address in your web browser.

---

## 🧪 Example

### Input

```text
Hello, how are you?
```

### Source Language

```text
English
```

### Target Language

```text
Hindi
```

### Output

```text
नमस्ते, आप कैसे हैं?
```

The user can then:

* Copy the translation
* Listen to the translation
* Clear the result
* Translate another sentence

---

## 🔌 API Integration

This project uses the **MyMemory Translation API** for translation.

The Flask backend sends the following information:

```text
Text
Source Language
Target Language
```

The API returns the translated text, which is then displayed in the web interface.

The project does **not** require:

* Google Cloud API
* Google Translate API key
* Microsoft Translator API key
* Docker
* Paid translation services

An internet connection is required when performing a translation.

---

## 🔐 Security and Privacy

The project follows basic security practices:

* `.env` is excluded from Git using `.gitignore`
* No API keys are stored in the source code
* User input is validated before sending requests
* A maximum text length of 5000 characters is enforced
* API requests use a timeout to prevent hanging requests

---

## 📊 API Error Handling

The application provides appropriate error handling for:

```text
Empty input
Invalid request
Invalid language
Text too long
Translation service unavailable
Connection error
Request timeout
Unexpected server error
```

This prevents the application from crashing when an external translation service is unavailable.

---

## 🎨 User Interface

The application provides a clean interface containing:

```text
┌─────────────────────────────────────────────┐
│           LANGUAGE TRANSLATION TOOL         │
├─────────────────────────────────────────────┤
│                                             │
│  From Language       ⇄       To Language   │
│                                             │
│  ┌─────────────────┐   ┌─────────────────┐ │
│  │ Enter text...   │   │ Translation     │ │
│  │                 │   │ appears here    │ │
│  └─────────────────┘   └─────────────────┘ │
│                                             │
│              [ Translate ]                  │
│                                             │
│       [Copy] [Listen] [Clear]               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💡 Future Improvements

The project can be extended with:

* Automatic source-language detection
* Translation history
* Favorite languages
* Dark/light theme
* Voice input
* More language support
* Download translated text
* Multiple translation providers
* User accounts and saved translations
* Progressive Web App support

---

## 🎓 Internship Information

**Internship:** CodeAlpha Artificial Intelligence Internship

**Task:** Task 1 – Language Translation Tool

**Domain:** Artificial Intelligence

**Project:** Language Translation Tool

This project was developed as part of the CodeAlpha internship project requirements.

---

## 👩‍💻 Developer

**Priyanka S.**

BCA Student | Artificial Intelligence Intern

---

## 📜 License

This project is created for educational and internship purposes.

---

## ⭐ Acknowledgement

Special thanks to **CodeAlpha** for providing the internship opportunity and project-based learning experience.

If you find this project useful, consider giving the repository a ⭐ on GitHub.
