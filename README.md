# Language Translation Tool

A web-based **Language Translation Tool** developed as part of the **CodeAlpha AI Internship – Task 1**.

The application provides a simple and responsive interface where users can enter text, select source and target languages, and translate the text through a Flask backend using the free MyMemory Translation API.

## 🎯 Project Objective

The objective of this project is to develop a user-friendly language translation application that:

* Accepts text from the user
* Allows selection of source and target languages
* Sends translation requests through a Flask backend
* Uses the MyMemory Translation API
* Supports multiple Indian and international languages
* Provides copy and text-to-speech functionality
* Validates user input
* Handles API and network errors
* Provides a responsive user interface

## ✨ Features

* 🌐 Multiple language support
* 🔄 Source and target language selection
* 🔁 Language swap
* 📝 Maximum input length of 5000 characters
* 📋 Copy translated text
* 🔊 Listen to translated text using browser speech synthesis
* 🧹 Clear input and translation
* ⌨️ `Ctrl + Enter` / `Cmd + Enter` translation shortcut
* ⚠️ Input validation
* 🌐 Network/API error handling
* 📱 Responsive design
* 🖥️ Flask backend
* 🆓 No Google Translate API key required

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* Requests

### Translation API

* MyMemory Translation API

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Python Virtual Environment

## 📂 Project Structure

```text
CodeAlpha_LanguageTranslationTool/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
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

## 🔄 Application Architecture

```text
User
  ↓
HTML/CSS/JavaScript Interface
  ↓
Flask Backend
  ↓
MyMemory Translation API
  ↓
Translation Result
  ↓
Flask Backend
  ↓
Browser
```

The browser sends the user's text, source language, and target language to the Flask `/translate` endpoint.

The Flask backend sends the request to MyMemory and returns the translated result to the browser.

## 🌍 Supported Languages

The application includes support for multiple languages, including:

### Indian Languages

* English
* Hindi
* Kannada
* Tamil
* Telugu
* Malayalam
* Bengali
* Marathi
* Gujarati
* Punjabi
* Urdu

### International Languages

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
* Dutch
* Polish
* Turkish
* Vietnamese
* Thai
* Indonesian
* Ukrainian
* Romanian
* Czech
* Swedish
* Danish
* Finnish
* Norwegian
* Hebrew

> Translation availability can depend on the language support provided by the MyMemory service.

## ⚙️ Requirements

Install the following:

* Python 3.x
* Git
* Modern web browser
* Internet connection

No LibreTranslate installation is required.

No Google Translate API key is required.

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/priyankaspriyanka36-sys/CodeAlpha_LanguageTranslationTool.git
```

Go into the project folder:

```bash
cd CodeAlpha_LanguageTranslationTool
```

### 2. Create a virtual environment

On Windows:

```powershell
python -m venv venv
```

### 3. Activate the virtual environment

```powershell
venv\Scripts\activate
```

### 4. Install dependencies

```powershell
pip install -r requirements.txt
```

## ▶️ Run the Application

Start the Flask server:

```powershell
python app.py
```

The application will run at:

```text
http://127.0.0.1:5000
```

Open the address in your web browser.

## 🧪 Example

### Input

```text
Hello, how are you?
```

### Source

```text
English
```

### Target

```text
Kannada
```

The application sends the text to the Flask backend, which requests a translation from MyMemory and displays the result in the translation panel.

## 🔌 Flask Endpoints

### Home

```text
GET /
```

Displays the translation interface.

### Languages

```text
GET /languages
```

Returns the supported language list in JSON format.

Example response:

```json
{
    "success": true,
    "languages": [
        {
            "code": "en",
            "name": "English"
        },
        {
            "code": "kn",
            "name": "Kannada"
        }
    ],
    "provider": "MyMemory"
}
```

### Translation

```text
POST /translate
```

Example request:

```json
{
    "text": "Hello",
    "source": "en",
    "target": "kn"
}
```

Example successful response:

```json
{
    "success": true,
    "translation": "ಹಲೋ",
    "detected_source_language": "en",
    "provider": "MyMemory"
}
```

## 🛡️ Input Validation

The application validates:

* Empty text
* Text longer than 5000 characters
* Missing target language
* Same source and target language
* Network errors
* API errors
* Request timeout

## 🔐 API Key

This project does not require:

* Google Translate API key
* Microsoft Translator API key
* LibreTranslate API key

The application uses the MyMemory Translation API.

## 🔊 Text-to-Speech

The Listen button uses the browser's built-in Speech Synthesis API.

Availability and voice quality depend on the user's browser and operating system.

## 📋 Copy Translation

The Copy button uses the browser Clipboard API to copy the translated text.

## 📱 Responsive Design

The interface is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

On smaller screens, the translation panels automatically stack vertically.

## ⌨️ Keyboard Shortcut

Press:

```text
Ctrl + Enter
```

on Windows/Linux, or:

```text
Cmd + Enter
```

on macOS to start translation.

## 🧪 Testing Checklist

Before submitting the project, test:

* [ ] English → Hindi
* [ ] English → Kannada
* [ ] Kannada → English
* [ ] English → Tamil
* [ ] English → Telugu
* [ ] Hindi → English
* [ ] Empty input validation
* [ ] 5000-character limit
* [ ] Copy button
* [ ] Listen button
* [ ] Clear button
* [ ] Swap button
* [ ] Same-language validation
* [ ] API/network error handling
* [ ] Mobile responsive layout

## ⚠️ Auto Detect

The interface provides an **Auto Detect** option.

However, the MyMemory API endpoint used by this project does not provide a reliable automatic source-language detection result that should be presented as confirmed detection.

Therefore, when Auto Detect is selected, the application allows the request to be sent without falsely reporting a detected language.

This avoids incorrectly claiming that the source language was detected when it was not.

## 🐛 Troubleshooting

### Flask does not start

Make sure the virtual environment is activated:

```powershell
venv\Scripts\activate
```

Then install the dependencies:

```powershell
pip install -r requirements.txt
```

Run:

```powershell
python app.py
```

### Translation fails

Check your internet connection because MyMemory is an online translation service.

Then refresh the browser and try again.

### Port 5000 is already in use

Stop the other application using port 5000, or change the Flask port in `app.py`.

## 🔮 Future Improvements

Possible future improvements include:

* More accurate automatic language detection
* Translation history
* Voice input
* Document translation
* File translation
* More language options
* Translation caching
* Improved accessibility
* Cloud deployment
* Additional translation providers
* Provider fallback support

## 📚 Learning Outcomes

This project demonstrates:

* Python programming
* Flask web development
* REST API integration
* HTTP requests
* JSON handling
* Frontend/backend communication
* JavaScript Fetch API
* Input validation
* Error handling
* Responsive web design
* Browser Clipboard API
* Browser Speech Synthesis API
* Git and GitHub
* Virtual environment management

## 👩‍💻 Internship Information

**Program:** CodeAlpha AI Internship

**Task:** Task 1 – Language Translation Tool

**Project Type:** Web Application

**Backend:** Flask

**Translation Service:** MyMemory Translation API

## 📄 License

This project was developed for educational and internship purposes.
