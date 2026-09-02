from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# MyMemory is a free translation API and does not require a Google API key.
TRANSLATION_API_URL = "https://api.mymemory.translated.net/get"

MAX_TEXT_LENGTH = 5000


# Supported languages
LANGUAGES = [
    {"code": "en", "name": "English"},
    {"code": "hi", "name": "Hindi"},
    {"code": "kn", "name": "Kannada"},
    {"code": "ta", "name": "Tamil"},
    {"code": "te", "name": "Telugu"},
    {"code": "ml", "name": "Malayalam"},
    {"code": "mr", "name": "Marathi"},
    {"code": "bn", "name": "Bengali"},
    {"code": "gu", "name": "Gujarati"},
    {"code": "pa", "name": "Punjabi"},
    {"code": "ur", "name": "Urdu"},
    {"code": "fr", "name": "French"},
    {"code": "de", "name": "German"},
    {"code": "es", "name": "Spanish"},
    {"code": "it", "name": "Italian"},
    {"code": "pt", "name": "Portuguese"},
    {"code": "ru", "name": "Russian"},
    {"code": "ja", "name": "Japanese"},
    {"code": "ko", "name": "Korean"},
    {"code": "zh-CN", "name": "Chinese"},
    {"code": "ar", "name": "Arabic"},
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/languages", methods=["GET"])
def languages():
    """Return the list of supported languages."""
    return jsonify({
        "success": True,
        "languages": LANGUAGES
    })


@app.route("/translate", methods=["POST"])
def translate():
    """Translate text using the MyMemory API."""

    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "error": "Invalid request."
            }), 400

        text = str(data.get("text", "")).strip()
        source = str(data.get("source", "en")).strip()
        target = str(data.get("target", "en")).strip()

        # Validate text
        if not text:
            return jsonify({
                "success": False,
                "error": "Please enter some text to translate."
            }), 400

        if len(text) > MAX_TEXT_LENGTH:
            return jsonify({
                "success": False,
                "error": f"Text cannot exceed {MAX_TEXT_LENGTH} characters."
            }), 400

        # Validate target language
        valid_codes = [language["code"] for language in LANGUAGES]

        if target not in valid_codes:
            return jsonify({
                "success": False,
                "error": "Invalid target language."
            }), 400

        # Auto-detect source language
        if source == "auto":
            source = "en"

        if source not in valid_codes:
            return jsonify({
                "success": False,
                "error": "Invalid source language."
            }), 400

        # Same language
        if source == target:
            return jsonify({
                "success": True,
                "translation": text,
                "detected_source_language": source
            })

        # MyMemory language pair format
        language_pair = f"{source}|{target}"

        params = {
            "q": text,
            "langpair": language_pair
        }

        response = requests.get(
            TRANSLATION_API_URL,
            params=params,
            timeout=20
        )

        response.raise_for_status()

        result = response.json()

        # Check MyMemory response
        response_data = result.get("responseData", {})
        translated_text = response_data.get("translatedText")

        if not translated_text:
            return jsonify({
                "success": False,
                "error": "Translation service returned no translation."
            }), 502

        return jsonify({
            "success": True,
            "translation": translated_text,
            "detected_source_language": source
        })

    except requests.exceptions.Timeout:
        return jsonify({
            "success": False,
            "error": "Translation request timed out. Please try again."
        }), 504

    except requests.exceptions.ConnectionError:
        return jsonify({
            "success": False,
            "error": "Could not connect to the translation service. Check your internet connection."
        }), 503

    except requests.exceptions.RequestException:
        return jsonify({
            "success": False,
            "error": "Translation service is currently unavailable."
        }), 502

    except Exception as error:
        print("Unexpected error:", error)

        return jsonify({
            "success": False,
            "error": "An unexpected error occurred."
        }), 500


if __name__ == "__main__":
    print("=" * 50)
    print("Language Translation Tool")
    print("Server: http://127.0.0.1:5000")
    print("=" * 50)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )