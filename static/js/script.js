const inputText = document.getElementById('inputText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const outputText = document.getElementById('outputText');
const characterCount = document.getElementById('characterCount');
const detectedLanguage = document.getElementById('detectedLanguage');
const statusBox = document.getElementById('status');

const translateButton =
    document.getElementById('translateButton');

const translateLabel =
    document.getElementById('translateLabel');

const spinner =
    document.getElementById('spinner');

const copyButton =
    document.getElementById('copyButton');

const listenButton =
    document.getElementById('listenButton');

const clearButton =
    document.getElementById('clearButton');

const swapButton =
    document.getElementById('swapButton');


let languageList = [];
let currentTranslation = '';


function showStatus(message, type = 'success') {
    statusBox.textContent = message;
    statusBox.className = `status ${type}`;
    statusBox.hidden = false;
}


function clearStatus() {
    statusBox.textContent = '';
    statusBox.className = 'status';
    statusBox.hidden = true;
}


function addLanguageOptions(languages) {

    const previousSource =
        sourceLanguage.value || 'auto';

    const previousTarget =
        targetLanguage.value || 'hi';


    sourceLanguage.innerHTML =
        '<option value="auto">Auto Detect</option>';

    targetLanguage.innerHTML = '';


    languages.forEach(language => {

        const sourceOption =
            new Option(
                language.name,
                language.code
            );

        const targetOption =
            new Option(
                language.name,
                language.code
            );


        sourceLanguage.appendChild(
            sourceOption
        );

        targetLanguage.appendChild(
            targetOption
        );
    });


    const sourceExists =
        languages.some(
            language =>
                language.code === previousSource
        );


    sourceLanguage.value =
        sourceExists
            ? previousSource
            : 'auto';


    const targetExists =
        languages.some(
            language =>
                language.code === previousTarget
        );


    if (targetExists) {

        targetLanguage.value =
            previousTarget;

    } else if (languages.length > 0) {

        const hindiExists =
            languages.some(
                language =>
                    language.code === 'hi'
            );

        targetLanguage.value =
            hindiExists
                ? 'hi'
                : languages[0].code;
    }
}


async function loadLanguages() {

    try {

        const response =
            await fetch('/languages');


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.error ||
                'Could not load languages.'
            );
        }


        languageList =
            (data.languages || [])
                .filter(
                    language =>
                        language.code &&
                        language.name
                )
                .map(
                    language => ({
                        code: language.code,
                        name: language.name
                    })
                );


        if (!languageList.length) {
            throw new Error(
                'No languages were returned.'
            );
        }


        addLanguageOptions(
            languageList
        );


        showStatus(
            `Connected to MyMemory · ` +
            `${languageList.length} languages available.`
        );


    } catch (error) {

        showStatus(
            error.message ||
            'Could not load languages.',
            'error'
        );
    }
}


function updateCount() {

    characterCount.textContent =
        `${inputText.value.length} / 5000`;
}


function setLoading(isLoading) {

    translateButton.disabled =
        isLoading;

    spinner.hidden =
        !isLoading;

    translateLabel.textContent =
        isLoading
            ? 'Translating…'
            : 'Translate';
}


function languageName(code) {

    return (
        languageList.find(
            language =>
                language.code === code
        )?.name ||
        code ||
        'Unknown'
    );
}


async function translate() {

    clearStatus();


    const text =
        inputText.value;

    const source =
        sourceLanguage.value;

    const target =
        targetLanguage.value;


    if (!text.trim()) {

        showStatus(
            'Please enter some text to translate.',
            'error'
        );

        return;
    }


    if (text.length > 5000) {

        showStatus(
            'Text must be 5000 characters or fewer.',
            'error'
        );

        return;
    }


    if (!target) {

        showStatus(
            'Please select a target language.',
            'error'
        );

        return;
    }


    if (
        source !== 'auto' &&
        source === target
    ) {

        showStatus(
            'Source and target languages must be different.',
            'error'
        );

        return;
    }


    setLoading(true);


    try {

        const response =
            await fetch('/translate', {

                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify({
                    text,
                    source,
                    target
                })
            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.error ||
                'Translation failed.'
            );
        }


        currentTranslation =
            data.translation || '';


        outputText.textContent =
            currentTranslation ||
            'No translation returned.';


        copyButton.disabled =
            !currentTranslation;


        listenButton.disabled =
            !currentTranslation ||
            !('speechSynthesis' in window);


        if (data.detected_source_language) {

            detectedLanguage.textContent =
                `Source: ${
                    languageName(
                        data.detected_source_language
                    )
                }`;

        } else if (source === 'auto') {

            detectedLanguage.textContent =
                'Detected: Not available';

        } else {

            detectedLanguage.textContent =
                `Source: ${
                    languageName(source)
                }`;
        }


        showStatus(
            'Translation completed successfully.'
        );


    } catch (error) {

        currentTranslation = '';

        outputText.textContent =
            'Your translation will appear here.';


        copyButton.disabled = true;

        listenButton.disabled = true;


        showStatus(
            error.message ||
            'Something went wrong.',
            'error'
        );


    } finally {

        setLoading(false);
    }
}


async function copyTranslation() {

    if (!currentTranslation) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            currentTranslation
        );


        showStatus(
            'Translation copied to clipboard.'
        );


    } catch {

        showStatus(
            'Clipboard access was blocked by the browser.',
            'error'
        );
    }
}


function listen() {

    if (
        !currentTranslation ||
        !('speechSynthesis' in window)
    ) {
        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            currentTranslation
        );


    utterance.lang =
        targetLanguage.value || 'en';


    window.speechSynthesis.speak(
        utterance
    );
}


function clearAll() {

    inputText.value = '';

    updateCount();


    currentTranslation = '';


    outputText.textContent =
        'Your translation will appear here.';


    detectedLanguage.textContent =
        'Detected: —';


    copyButton.disabled = true;

    listenButton.disabled = true;


    clearStatus();


    inputText.focus();
}


function swapLanguages() {

    if (sourceLanguage.value === 'auto') {

        showStatus(
            'Auto Detect cannot be swapped directly. ' +
            'Select a source language before swapping.',
            'error'
        );

        return;
    }


    const oldSource =
        sourceLanguage.value;

    const oldTarget =
        targetLanguage.value;


    sourceLanguage.value =
        oldTarget;

    targetLanguage.value =
        oldSource;


    const oldInput =
        inputText.value;


    inputText.value =
        currentTranslation || oldInput;


    outputText.textContent =
        oldInput ||
        'Your translation will appear here.';


    currentTranslation =
        oldInput;


    copyButton.disabled =
        !currentTranslation;


    listenButton.disabled =
        !currentTranslation ||
        !('speechSynthesis' in window);


    detectedLanguage.textContent =
        'Detected: —';


    updateCount();

    clearStatus();
}


inputText.addEventListener(
    'input',
    updateCount
);


translateButton.addEventListener(
    'click',
    translate
);


copyButton.addEventListener(
    'click',
    copyTranslation
);


listenButton.addEventListener(
    'click',
    listen
);


clearButton.addEventListener(
    'click',
    clearAll
);


swapButton.addEventListener(
    'click',
    swapLanguages
);


inputText.addEventListener(
    'keydown',
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key === 'Enter'
        ) {
            translate();
        }
    }
);


updateCount();

loadLanguages();