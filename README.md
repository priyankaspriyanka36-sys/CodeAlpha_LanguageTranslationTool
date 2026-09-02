# Language Translation Tool

A professional Flask-based language translation web application built for an AI internship project. It sends user text from the browser to a Flask backend, which calls a real **LibreTranslate** translation API and returns the translated result.

## Project Objective

Create a simple, usable language translation tool where users can enter text, choose source and target languages, send the text to a real translation API, and clearly view the translated response.

## Why LibreTranslate?

This project intentionally uses **LibreTranslate instead of Google Cloud Translation**. The application does not require a Google API key, Google Cloud account, Google Cloud billing, a credit/debit card, or a paid subscription. The recommended setup runs LibreTranslate locally on the same Windows computer.

> LibreTranslate availability and supported language/model coverage can vary by installation. The application attempts to read the `/languages` endpoint at startup rather than falsely assuming every listed language is available.

## Features

- Text input with a 5000-character limit
- Source language selection
- Auto Detect option when supported by the running LibreTranslate instance
- Target language selection
- Real translation through LibreTranslate
- Clear translated output
- Detected-language display when returned by the API
- Copy translation to clipboard
- Browser text-to-speech
- Swap source/target languages
- Loading spinner
- Success and error messages
- Responsive/mobile-friendly UI
- Flask JSON backend
- Environment-variable configuration

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Python
- Flask
- Requests
- python-dotenv
- LibreTranslate

## Architecture

```text
Browser (HTML/CSS/JavaScript)
          |
          | POST /translate
          v
     Flask Backend
          |
          | POST /translate
          v
 LibreTranslate API
          |
          | translated response
          v
     Flask Backend
          |
          v
       Browser
```

## Project Structure

```text
language-translation-tool/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── .env.example
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Requirements

- Windows 10/11
- Python 3.10 or newer recommended
- VS Code
- Internet access for installing packages and, depending on your LibreTranslate setup, downloading translation models
- LibreTranslate running locally on port `5001`

## 1. Extract and Open the Project

Extract `language-translation-tool.zip` and open the `language-translation-tool` folder in VS Code.

## 2. Create a Virtual Environment

Open the VS Code terminal in the project folder:

```powershell
python -m venv venv
```

Activate it in PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation for the current terminal session, use:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\venv\Scripts\Activate.ps1
```

## 3. Install Python Dependencies

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 4. Configure the Environment

Copy `.env.example` to `.env`.

PowerShell:

```powershell
Copy-Item .env.example .env
```

The default configuration is:

```text
LIBRETRANSLATE_URL=http://127.0.0.1:5001
```

No API key is required by this project when LibreTranslate is running locally.

## 5. LibreTranslate Setup on Windows

### Recommended local method: Docker

LibreTranslate's official project provides a Docker-based local deployment. Install Docker Desktop for Windows first, then run LibreTranslate on port `5001` so it does not conflict with Flask's `5000` port.

```powershell
docker run -ti --rm -p 5001:5000 libretranslate/libretranslate
```

Leave this terminal running. The LibreTranslate server should then be available at:

```text
http://127.0.0.1:5001
```

> The exact image command can change with LibreTranslate releases. If Docker reports that the image/tag is unavailable, consult the current LibreTranslate documentation or Docker image instructions and keep the host port mapped to `5001`.

### Alternative: native installation

If you prefer not to use Docker, LibreTranslate also has a Python-based installation path in its project documentation. Native installation can require additional system/model dependencies, so Docker is the simpler Windows setup for a repeatable internship project.

## 6. Start Flask

Open a **second** VS Code terminal. Keep LibreTranslate running in the first terminal.

Activate the virtual environment if needed:

```powershell
.\venv\Scripts\Activate.ps1
```

Start Flask:

```powershell
python app.py
```

You should see Flask running on:

```text
http://127.0.0.1:5000
```

## 7. Open the Application

Open your browser and visit:

```text
http://127.0.0.1:5000
```

## How to Use

1. Type or paste text into **Enter text**.
2. Select the source language, or leave it as **Auto Detect** when supported.
3. Select the target language.
4. Click **Translate**.
5. The Flask backend sends the text to LibreTranslate and displays the returned translation.
6. Use **Copy** to copy the result.
7. Use **Listen** to hear the result through browser SpeechSynthesis.
8. Use **Swap** to exchange selected source and target languages.
9. Use **Clear** to reset the translator.

## API Workflow

The browser sends JSON to Flask:

```json
{
  "text": "Hello, how are you?",
  "source": "en",
  "target": "hi"
}
```

Flask then sends a translation request to LibreTranslate. The backend normalizes the API response for the browser into a format like:

```json
{
  "success": true,
  "translation": "नमस्ते, आप कैसे हैं?",
  "detected_source_language": "en"
}
```

The actual `detected_source_language` value depends on what the installed LibreTranslate server returns.

## Supported Languages

The UI initially includes common languages such as English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Urdu, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, and Chinese.

However, **the application does not claim that every one is available on every LibreTranslate installation**. On startup it calls LibreTranslate's `/languages` endpoint and populates the dropdowns with the languages reported by the running server. A fallback list is shown only if the server cannot be reached; translation itself still requires a working LibreTranslate server.

## Error Handling

The backend handles:

- Empty input
- Input over 5000 characters
- Missing target language
- Same source and target language
- Invalid JSON request
- LibreTranslate connection failures
- Network errors
- Timeouts
- HTTP errors from LibreTranslate
- Invalid API responses

The frontend displays readable messages instead of raw server errors where possible.

## Troubleshooting

### `Could not connect to LibreTranslate`

Make sure LibreTranslate is running and mapped to port `5001`:

```powershell
docker run -ti --rm -p 5001:5000 libretranslate/libretranslate
```

Then refresh:

```text
http://127.0.0.1:5000
```

### Flask says port 5000 is already in use

Stop the other application using port 5000, or change the Flask port in `app.py`. If you change Flask's port, LibreTranslate should remain on `5001`.

### LibreTranslate says it cannot load models

Allow the LibreTranslate container to finish its model setup/download process. The first startup can take longer than later starts.

### The language list is incomplete

LibreTranslate's installed translation models determine what `/languages` reports. This project intentionally uses that live endpoint instead of pretending all possible languages are always supported.

### PowerShell will not activate `venv`

Run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\venv\Scripts\Activate.ps1
```

### `ModuleNotFoundError: No module named 'flask'`

Activate the virtual environment and install dependencies:

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Future Improvements

- Translation history
- Download translation as a text file
- Voice input
- More advanced speech-language mapping
- Theme switcher
- Rate limiting and production deployment configuration
- User accounts and saved translations

## Internship Task Requirement Mapping

| Internship requirement | Implementation |
|---|---|
| User enters text | HTML textarea with 5000-character limit |
| Source language selection | Flask-backed UI with live LibreTranslate languages |
| Target language selection | Live language dropdown |
| Translation API | Real LibreTranslate `/translate` endpoint |
| Send text to API | Flask `POST /translate` uses Python `requests` |
| Receive API response | Flask parses `translatedText` and detected language |
| Display translation | Responsive output panel |
| Copy button | Browser Clipboard API |
| Text-to-speech | Browser SpeechSynthesis API |
| Professional UI | Responsive CSS, status messages, loading state, hover effects |
| No Google API key/billing | Local LibreTranslate configuration |

## Security / GitHub Notes

- No API secret is required for the default local setup.
- `.env` is ignored by Git.
- `.env.example` contains only non-secret configuration.
- `venv/`, Python cache files, and local VS Code settings are ignored.

## License / Attribution

This is an educational internship project. LibreTranslate is the external translation service used by the application; review LibreTranslate's own license and service/model documentation for its terms and attribution requirements.
