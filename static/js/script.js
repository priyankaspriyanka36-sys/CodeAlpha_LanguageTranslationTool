const inputText = document.getElementById('inputText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const outputText = document.getElementById('outputText');
const characterCount = document.getElementById('characterCount');
const detectedLanguage = document.getElementById('detectedLanguage');
const statusBox = document.getElementById('status');
const translateButton = document.getElementById('translateButton');
const translateLabel = document.getElementById('translateLabel');
const spinner = document.getElementById('spinner');
const copyButton = document.getElementById('copyButton');
const listenButton = document.getElementById('listenButton');
const clearButton = document.getElementById('clearButton');
const swapButton = document.getElementById('swapButton');

const fallbackLanguages = [
    ['en', 'English'], ['hi', 'Hindi'], ['kn', 'Kannada'], ['ta', 'Tamil'], ['te', 'Telugu'],
    ['ml', 'Malayalam'], ['mr', 'Marathi'], ['bn', 'Bengali'], ['gu', 'Gujarati'], ['pa', 'Punjabi'],
    ['ur', 'Urdu'], ['es', 'Spanish'], ['fr', 'French'], ['de', 'German'], ['it', 'Italian'],
    ['pt', 'Portuguese'], ['ru', 'Russian'], ['ja', 'Japanese'], ['ko', 'Korean'], ['zh', 'Chinese']
];

let languageList = [];
let currentTranslation = '';

function showStatus(message, type = 'success') {
    statusBox.textContent = message;
    statusBox.className = `status ${type}`;
    statusBox.hidden = false;
}

function clearStatus() { statusBox.hidden = true; statusBox.textContent = ''; }

function addLanguageOptions(languages) {
    const sourceValue = sourceLanguage.value;
    const targetValue = targetLanguage.value || 'hi';
    sourceLanguage.innerHTML = '<option value="auto">Auto Detect</option>';
    targetLanguage.innerHTML = '';

    languages.forEach(lang => {
        const option1 = new Option(lang.name, lang.code);
        const option2 = new Option(lang.name, lang.code);
        sourceLanguage.appendChild(option1);
        targetLanguage.appendChild(option2);
    });

    sourceLanguage.value = languages.some(l => l.code === sourceValue) ? sourceValue : 'auto';
    targetLanguage.value = languages.some(l => l.code === targetValue) ? targetValue : (languages[0]?.code || 'en');
}

async function loadLanguages() {
    try {
        const response = await fetch('/languages');
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || 'Could not load languages.');
        languageList = data.languages
            .filter(item => item.code && item.name)
            .map(item => ({ code: item.code, name: item.name }));
        addLanguageOptions(languageList);
        showStatus(`Connected to LibreTranslate · ${languageList.length} languages available.`);
    } catch (error) {
        languageList = fallbackLanguages.map(([code, name]) => ({ code, name }));
        addLanguageOptions(languageList);
        showStatus('Could not reach LibreTranslate. The language list shown is a fallback; translation requires LibreTranslate to be running.', 'error');
    }
}

function updateCount() {
    characterCount.textContent = `${inputText.value.length} / 5000`;
}

function setLoading(isLoading) {
    translateButton.disabled = isLoading;
    spinner.hidden = !isLoading;
    translateLabel.textContent = isLoading ? 'Translating…' : 'Translate';
}

function languageName(code) {
    return languageList.find(item => item.code === code)?.name || code || 'Unknown';
}

async function translate() {
    clearStatus();
    const text = inputText.value;
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (!text.trim()) return showStatus('Please enter some text to translate.', 'error');
    if (text.length > 5000) return showStatus('Text must be 5000 characters or fewer.', 'error');
    if (!target) return showStatus('Please select a target language.', 'error');
    if (source !== 'auto' && source === target) return showStatus('Source and target languages must be different.', 'error');

    setLoading(true);
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, source, target })
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || 'Translation failed.');

        currentTranslation = data.translation || '';
        outputText.textContent = currentTranslation || 'No translation returned.';
        copyButton.disabled = !currentTranslation;
        listenButton.disabled = !currentTranslation || !('speechSynthesis' in window);
        detectedLanguage.textContent = data.detected_source_language
            ? `Detected: ${languageName(data.detected_source_language)} (${data.detected_source_language})`
            : `Source: ${source === 'auto' ? 'Auto Detect' : languageName(source)}`;
        showStatus('Translation completed successfully.');
    } catch (error) {
        currentTranslation = '';
        outputText.textContent = 'Your translation will appear here.';
        copyButton.disabled = true;
        listenButton.disabled = true;
        showStatus(error.message || 'Something went wrong.', 'error');
    } finally {
        setLoading(false);
    }
}

async function copyTranslation() {
    if (!currentTranslation) return;
    try {
        await navigator.clipboard.writeText(currentTranslation);
        showStatus('Translation copied to clipboard.');
    } catch {
        showStatus('Clipboard access was blocked by the browser.', 'error');
    }
}

function listen() {
    if (!currentTranslation || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentTranslation);
    utterance.lang = targetLanguage.value || 'en';
    window.speechSynthesis.speak(utterance);
}

function clearAll() {
    inputText.value = '';
    updateCount();
    currentTranslation = '';
    outputText.textContent = 'Your translation will appear here.';
    detectedLanguage.textContent = 'Detected: —';
    copyButton.disabled = true;
    listenButton.disabled = true;
    clearStatus();
    inputText.focus();
}

function swapLanguages() {
    if (sourceLanguage.value === 'auto') {
        showStatus('Auto Detect cannot be swapped directly. Select the detected/source language after translating, then swap.', 'error');
        return;
    }
    const oldSource = sourceLanguage.value;
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = oldSource;
    const oldInput = inputText.value;
    inputText.value = currentTranslation || oldInput;
    outputText.textContent = oldInput || 'Your translation will appear here.';
    currentTranslation = oldInput;
    copyButton.disabled = !currentTranslation;
    listenButton.disabled = !currentTranslation || !('speechSynthesis' in window);
    updateCount();
    clearStatus();
}

inputText.addEventListener('input', updateCount);
translateButton.addEventListener('click', translate);
copyButton.addEventListener('click', copyTranslation);
listenButton.addEventListener('click', listen);
clearButton.addEventListener('click', clearAll);
swapButton.addEventListener('click', swapLanguages);
inputText.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') translate();
});

updateCount();
loadLanguages();
