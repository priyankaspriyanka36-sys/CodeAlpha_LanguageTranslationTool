from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

MYMEMORY_URL = "https://api.mymemory.translated.net/get"

MAX_TEXT_LENGTH = 5000

LANGUAGES = [
    ("auto", "Auto Detect"),
    ("en", "English"),
    ("hi", "Hindi"),
    ("kn", "Kannada"),
    ("ta", "Tamil"),
    ("te", "Telugu"),
    ("ml", "Malayalam"),
    ("bn", "Bengali"),
    ("mr", "Marathi"),
    ("gu", "Gujarati"),
    ("pa", "Punjabi"),
    ("ur", "Urdu"),
    ("fr", "French"),
    ("de", "German"),
    ("es", "Spanish"),
    ("it", "Italian"),
    ("pt", "Portuguese"),
    ("ru", "Russian"),
    ("ja", "Japanese"),
    ("ko", "Korean"),
    ("zh", "Chinese"),
    ("ar", "Arabic"),
    ("nl", "Dutch"),
    ("pl", "Polish"),
    ("tr", "Turkish"),
    ("vi", "Vietnamese"),
    ("th", "Thai"),
    ("id", "Indonesian"),
    ("uk", "Ukrainian"),
    ("ro", "Romanian"),
    ("cs", "Czech"),
    ("sv", "Swedish"),
    ("da", "Danish"),
    ("fi", "Finnish"),
    ("no", "Norwegian"),
    ("he", "Hebrew"),
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/languages")
def languages():
    return jsonify([
        {"code": code, "name": name}
        for code, name in LANGUAGES
    ])


@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()

        text = (data.get("text") or "").strip()
        source = data.get("source", "auto")
        target = data.get("target", "en")

        if not text:
            return jsonify({
                "success": False,
                "error": "Please enter some text."
            }), 400

        if len(text) > MAX_TEXT_LENGTH:
            return jsonify({
                "success": False,
                "error": f"Text is too long. Maximum {MAX_TEXT_LENGTH} characters."
            }), 400

        if source == "auto":
            source = "en"

        # MyMemory uses language-region codes for some languages.
        language_map = {
            "kn": "kn-IN",
            "ta": "ta-LK",
            "te": "te-IN",
            "ml": "ml-IN",
            "hi": "hi-IN",
            "bn": "bn-IN",
            "mr": "mr-IN",
            "gu": "gu-IN",
            "pa": "pa-IN",
            "ur": "ur-PK",
        }

        source_code = language_map.get(source, source)
        target_code = language_map.get(target, target)

        params = {
            "q": text,
            "langpair": f"{source_code}|{target_code}"
        }

        response = requests.get(
            MYMEMORY_URL,
            params=params,
            timeout=30
        )

        response.raise_for_status()
        result = response.json()

        if result.get("responseStatus") != 200:
            return jsonify({
                "success": False,
                "error": result.get(
                    "responseDetails",
                    "Translation service returned an error."
                )
            }), 500

        translated_text = result.get("responseData", {}).get(
            "translatedText"
        )

        if not translated_text:
            return jsonify({
                "success": False,
                "error": "No translation was returned."
            }), 500

        return jsonify({
            "success": True,
            "translation": translated_text,
            "detected_source_language": source
        })

    except requests.exceptions.Timeout:
        return jsonify({
            "success": False,
            "error": "Translation service timed out. Please try again."
        }), 504

    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "error": f"Translation service error: {str(e)}"
        }), 502

    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Unexpected error: {str(e)}"
        }), 500


if __name__ == "__main__":
    print("=" * 60)
    print("Language Translation Tool")
    print("=" * 60)
    print("Flask Server : http://127.0.0.1:5000")
    print("Translation  : MyMemory API")
    print("=" * 60)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
