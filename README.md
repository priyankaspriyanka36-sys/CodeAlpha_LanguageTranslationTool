from flask import Flask, render_template, request, jsonify
import argostranslate.translate

app = Flask(__name__)


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
    {"code": "ar", "name": "Arabic"},
    {"code": "fr", "name": "French"},
    {"code": "de", "name": "German"},
    {"code": "es", "name": "Spanish"},
    {"code": "it", "name": "Italian"},
    {"code": "pt", "name": "Portuguese"},
    {"code": "ru", "name": "Russian"},
    {"code": "ja", "name": "Japanese"},
    {"code": "ko", "name": "Korean"},
    {"code": "zh", "name": "Chinese"},
    {"code": "tr", "name": "Turkish"},
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/languages")
def languages():
    return jsonify(LANGUAGES)


@app.route("/translate", methods=["POST"])
def translate_text():
    try:
        data = request.get_json()

        text = data.get("text", "").strip()
        source = data.get("source", "en")
        target = data.get("target", "hi")

        if not text:
            return jsonify({
                "success": False,
                "error": "Please enter some text to translate."
            }), 400

        if source == target:
            return jsonify({
                "success": True,
                "translation": text
            })

        # Argos Translate performs the actual translation
        translated_text = argostranslate.translate.translate(
            text,
            source,
            target
        )

        return jsonify({
            "success": True,
            "translation": translated_text
        })

    except Exception as e:
        print("Translation error:", e)

        return jsonify({
            "success": False,
            "error": "Translation model is not available for this language pair yet."
        }), 500


if __name__ == "__main__":
    print("=" * 55)
    print("       LANGUAGE TRANSLATION TOOL")
    print("=" * 55)
    print("Translation Engine : Argos Translate")
    print("API Key Required   : No")
    print("Payment Required   : No")
    print("Server             : http://127.0.0.1:5000")
    print("=" * 55)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )