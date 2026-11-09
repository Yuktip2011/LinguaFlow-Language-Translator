/* =====================================================================
   LinguaFlow – Smart Language Translator
   script.js  |  CodeAlpha Internship  |  Premium Edition
   ===================================================================== */
'use strict';

// ══════════════════════════════════════════════════════════════
// 1. LANGUAGE REGISTRY
//    All codes verified against MyMemory API documentation.
//    tts: BCP-47 tag used for SpeechSynthesis.
//    rtl: true for right-to-left languages.
// ══════════════════════════════════════════════════════════════
const LANGUAGES = [
  // ── Detection / Auto ──
  { code: 'auto',  name: 'Auto Detect',           flag: '🌐', tts: null,    rtl: false, noTarget: true },
  // ── South Asian ──
  { code: 'en',    name: 'English',                flag: '🇬🇧', tts: 'en-US', rtl: false },
  { code: 'hi',    name: 'Hindi',                  flag: '🇮🇳', tts: 'hi-IN', rtl: false },
  { code: 'mr',    name: 'Marathi',                flag: '🇮🇳', tts: 'mr-IN', rtl: false },
  { code: 'gu',    name: 'Gujarati',               flag: '🇮🇳', tts: 'gu-IN', rtl: false },
  { code: 'bn',    name: 'Bengali',                flag: '🇧🇩', tts: 'bn-IN', rtl: false },
  { code: 'ta',    name: 'Tamil',                  flag: '🇮🇳', tts: 'ta-IN', rtl: false },
  { code: 'te',    name: 'Telugu',                 flag: '🇮🇳', tts: 'te-IN', rtl: false },
  { code: 'kn',    name: 'Kannada',                flag: '🇮🇳', tts: 'kn-IN', rtl: false },
  { code: 'ml',    name: 'Malayalam',              flag: '🇮🇳', tts: 'ml-IN', rtl: false },
  { code: 'pa',    name: 'Punjabi',                flag: '🇮🇳', tts: 'pa-IN', rtl: false },
  { code: 'ur',    name: 'Urdu',                   flag: '🇵🇰', tts: 'ur-PK', rtl: true  },
  { code: 'ne',    name: 'Nepali',                 flag: '🇳🇵', tts: 'ne-NP', rtl: false },
  { code: 'si',    name: 'Sinhala',                flag: '🇱🇰', tts: 'si-LK', rtl: false },
  // ── Western European ──
  { code: 'fr',    name: 'French',                 flag: '🇫🇷', tts: 'fr-FR', rtl: false },
  { code: 'de',    name: 'German',                 flag: '🇩🇪', tts: 'de-DE', rtl: false },
  { code: 'es',    name: 'Spanish',                flag: '🇪🇸', tts: 'es-ES', rtl: false },
  { code: 'pt',    name: 'Portuguese',             flag: '🇵🇹', tts: 'pt-BR', rtl: false },
  { code: 'it',    name: 'Italian',                flag: '🇮🇹', tts: 'it-IT', rtl: false },
  { code: 'nl',    name: 'Dutch',                  flag: '🇳🇱', tts: 'nl-NL', rtl: false },
  { code: 'ca',    name: 'Catalan',                flag: '🏳️',  tts: 'ca-ES', rtl: false },
  { code: 'af',    name: 'Afrikaans',              flag: '🇿🇦', tts: 'af-ZA', rtl: false },
  // ── Northern European ──
  { code: 'sv',    name: 'Swedish',                flag: '🇸🇪', tts: 'sv-SE', rtl: false },
  { code: 'da',    name: 'Danish',                 flag: '🇩🇰', tts: 'da-DK', rtl: false },
  { code: 'fi',    name: 'Finnish',                flag: '🇫🇮', tts: 'fi-FI', rtl: false },
  { code: 'no',    name: 'Norwegian',              flag: '🇳🇴', tts: 'nb-NO', rtl: false },
  // ── Eastern European ──
  { code: 'ru',    name: 'Russian',                flag: '🇷🇺', tts: 'ru-RU', rtl: false },
  { code: 'pl',    name: 'Polish',                 flag: '🇵🇱', tts: 'pl-PL', rtl: false },
  { code: 'uk',    name: 'Ukrainian',              flag: '🇺🇦', tts: 'uk-UA', rtl: false },
  { code: 'cs',    name: 'Czech',                  flag: '🇨🇿', tts: 'cs-CZ', rtl: false },
  { code: 'sk',    name: 'Slovak',                 flag: '🇸🇰', tts: 'sk-SK', rtl: false },
  { code: 'ro',    name: 'Romanian',               flag: '🇷🇴', tts: 'ro-RO', rtl: false },
  { code: 'hu',    name: 'Hungarian',              flag: '🇭🇺', tts: 'hu-HU', rtl: false },
  { code: 'bg',    name: 'Bulgarian',              flag: '🇧🇬', tts: 'bg-BG', rtl: false },
  { code: 'hr',    name: 'Croatian',               flag: '🇭🇷', tts: 'hr-HR', rtl: false },
  { code: 'sr',    name: 'Serbian',                flag: '🇷🇸', tts: 'sr-RS', rtl: false },
  { code: 'sl',    name: 'Slovenian',              flag: '🇸🇮', tts: 'sl-SI', rtl: false },
  { code: 'lt',    name: 'Lithuanian',             flag: '🇱🇹', tts: 'lt-LT', rtl: false },
  { code: 'lv',    name: 'Latvian',                flag: '🇱🇻', tts: 'lv-LV', rtl: false },
  { code: 'et',    name: 'Estonian',               flag: '🇪🇪', tts: 'et-EE', rtl: false },
  // ── Mediterranean ──
  { code: 'el',    name: 'Greek',                  flag: '🇬🇷', tts: 'el-GR', rtl: false },
  // ── Middle Eastern ──
  { code: 'ar',    name: 'Arabic',                 flag: '🇸🇦', tts: 'ar-SA', rtl: true  },
  { code: 'he',    name: 'Hebrew',                 flag: '🇮🇱', tts: 'he-IL', rtl: true  },
  { code: 'fa',    name: 'Persian (Farsi)',         flag: '🇮🇷', tts: 'fa-IR', rtl: true  },
  { code: 'tr',    name: 'Turkish',                flag: '🇹🇷', tts: 'tr-TR', rtl: false },
  // ── East Asian ──
  { code: 'ja',    name: 'Japanese',               flag: '🇯🇵', tts: 'ja-JP', rtl: false },
  { code: 'zh-CN', name: 'Chinese (Simplified)',   flag: '🇨🇳', tts: 'zh-CN', rtl: false },
  { code: 'ko',    name: 'Korean',                 flag: '🇰🇷', tts: 'ko-KR', rtl: false },
  // ── Southeast Asian ──
  { code: 'th',    name: 'Thai',                   flag: '🇹🇭', tts: 'th-TH', rtl: false },
  { code: 'vi',    name: 'Vietnamese',             flag: '🇻🇳', tts: 'vi-VN', rtl: false },
  { code: 'id',    name: 'Indonesian',             flag: '🇮🇩', tts: 'id-ID', rtl: false },
  { code: 'ms',    name: 'Malay',                  flag: '🇲🇾', tts: 'ms-MY', rtl: false },
  // ── African ──
  { code: 'sw',    name: 'Swahili',                flag: '🇰🇪', tts: 'sw-KE', rtl: false },
];

// ══════════════════════════════════════════════════════════════
// 2. API CONFIGURATION
// ══════════════════════════════════════════════════════════════
const API_CONFIG = {
  /**
   * Active API: 'mymemory' (default, free, no key needed)
   * Switch to 'libretranslate' by changing this value and setting LIBRE_API_KEY.
   */
  USE_API: 'mymemory',

  /* MyMemory – free, up to 5000 chars/day anonymously */
  MYMEMORY_URL: 'https://api.mymemory.translated.net/get',
  MYMEMORY_EMAIL: '',  // Add your email → 10,000 chars/day free

  /* LibreTranslate – self-hosted or paid */
  LIBRE_URL: 'https://libretranslate.com/translate',
  LIBRE_API_KEY: '',
};

// ══════════════════════════════════════════════════════════════
// 3. DOM HELPERS
// ══════════════════════════════════════════════════════════════
const $ = (id) => document.getElementById(id);

const els = {
  sourceLang:         $('sourceLang'),
  targetLang:         $('targetLang'),
  sourceText:         $('sourceText'),
  translatedText:     $('translatedText'),
  translateBtn:       $('translateBtn'),
  swapBtn:            $('swapBtn'),
  clearBtn:           $('clearBtn'),
  copyBtn:            $('copyBtn'),
  downloadBtn:        $('downloadBtn'),
  sourceTtsBtn:       $('sourceTtsBtn'),
  targetTtsBtn:       $('targetTtsBtn'),
  saveHistBtn:        $('saveHistBtn'),
  detectLangBtn:      $('detectLangBtn'),
  charCount:          $('charCount'),
  wordCount:          $('wordCount'),
  detectedLangBadge:  $('detectedLangBadge'),
  loadingSpinner:     $('loadingSpinner'),
  errorBanner:        $('errorBanner'),
  errorMsg:           $('errorMsg'),
  errorClose:         $('errorClose'),
  toast:              $('toast'),
  themeToggle:        $('themeToggle'),
  themeIcon:          $('themeIcon'),
  navbar:             $('navbar'),
  hamburger:          $('hamburger'),
  mobileMenu:         $('mobileMenu'),
  voiceSettingsBar:   $('voiceSettingsBar'),
  voiceSettingsToggle:$('voiceSettingsToggle'),
  speechSpeed:        $('speechSpeed'),
  speedValue:         $('speedValue'),
  sourceVoiceSelect:  $('sourceVoiceSelect'),
  targetVoiceSelect:  $('targetVoiceSelect'),
  historyList:        $('historyList'),
  historyEmpty:       $('historyEmpty'),
  clearHistoryBtn:    $('clearHistoryBtn'),
  particlesCanvas:    $('particles-canvas'),
};

// ══════════════════════════════════════════════════════════════
// 4. STATE
// ══════════════════════════════════════════════════════════════
let currentTranslation = '';
let currentTargetLang  = '';
let isSpeaking         = false;
let activeTtsButton    = null;
let toastTimer         = null;
let availableVoices    = [];
let voicesLoaded       = false;

// ══════════════════════════════════════════════════════════════
// 5. POPULATE LANGUAGE DROPDOWNS
// ══════════════════════════════════════════════════════════════
function populateDropdowns() {
  const sourceOpts = LANGUAGES.map(l =>
    `<option value="${l.code}">${l.flag} ${l.name}</option>`
  ).join('');

  // Target dropdown excludes "auto"
  const targetOpts = LANGUAGES
    .filter(l => !l.noTarget)
    .map(l => `<option value="${l.code}">${l.flag} ${l.name}</option>`)
    .join('');

  els.sourceLang.innerHTML = sourceOpts;
  els.targetLang.innerHTML = targetOpts;

  // Defaults
  els.sourceLang.value = 'en';
  els.targetLang.value = 'hi';

  // Restore from localStorage
  const savedSrc = localStorage.getItem('lf_source_lang');
  const savedTgt = localStorage.getItem('lf_target_lang');
  if (savedSrc && LANGUAGES.find(l => l.code === savedSrc)) els.sourceLang.value = savedSrc;
  if (savedTgt && LANGUAGES.find(l => l.code === savedTgt && !l.noTarget)) els.targetLang.value = savedTgt;
}

function getLangMeta(code) {
  return LANGUAGES.find(l => l.code === code) || null;
}

// ══════════════════════════════════════════════════════════════
// 6. TRANSLATION API LAYER
// ══════════════════════════════════════════════════════════════
async function callTranslateAPI(text, source, target) {
  switch (API_CONFIG.USE_API) {
    case 'mymemory':     return translateMyMemory(text, source, target);
    case 'libretranslate': return translateLibre(text, source, target);
    default: throw new Error('No translation API configured. See API_CONFIG in script.js.');
  }
}

/** MyMemory API – free, no key required */
async function translateMyMemory(text, source, target) {
  // Validate codes before sending
  const srcCode = source === 'auto' ? 'en' : source; // fallback if auto-detect failed
  const langPair = `${srcCode}|${target}`;

  const params = new URLSearchParams({ q: text, langpair: langPair });
  if (API_CONFIG.MYMEMORY_EMAIL) params.set('de', API_CONFIG.MYMEMORY_EMAIL);

  const url  = `${API_CONFIG.MYMEMORY_URL}?${params}`;
  const resp = await fetchWithTimeout(url, {}, 15000);

  if (!resp.ok) throw new Error(`Server error ${resp.status}. Please try again.`);

  const data = await resp.json();

  if (data.responseStatus === 429) {
    throw new Error('Daily translation limit reached. Add your email to API_CONFIG for a higher limit.');
  }
  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails || 'Translation failed. Try a different language pair.');
  }

  const translated = data.responseData?.translatedText?.trim();
  if (!translated) throw new Error('Empty response from API. Please try again.');

  // Guard: MyMemory echoes source when pair is unsupported
  if (translated.toLowerCase() === text.trim().toLowerCase()) {
    throw new Error(
      `The language pair "${getLangMeta(srcCode)?.name ?? srcCode} → ${getLangMeta(target)?.name ?? target}" ` +
      `may not be supported. Try routing through English as an intermediate step.`
    );
  }

  return translated;
}

/** LibreTranslate API */
async function translateLibre(text, source, target) {
  const body = JSON.stringify({
    q: text,
    source: source === 'auto' ? 'en' : source,
    target,
    format: 'text',
    api_key: API_CONFIG.LIBRE_API_KEY || '',
  });
  const resp = await fetchWithTimeout(API_CONFIG.LIBRE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }, 15000);
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}));
    throw new Error(e.error || `HTTP ${resp.status}`);
  }
  const data = await resp.json();
  if (!data.translatedText) throw new Error('Empty response from LibreTranslate.');
  return data.translatedText;
}

/** fetch with AbortController timeout */
async function fetchWithTimeout(url, options = {}, ms = 12000) {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out. Check your internet connection.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ══════════════════════════════════════════════════════════════
// 7. CLIENT-SIDE LANGUAGE DETECTION (Unicode Script Ranges)
// ══════════════════════════════════════════════════════════════
const SCRIPT_MAP = [
  // Check Japanese BEFORE CJK (Japanese may contain CJK chars too)
  { regex: /[\u3040-\u309F\u30A0-\u30FF]/,  code: 'ja'    }, // Hiragana / Katakana
  { regex: /[\uAC00-\uD7AF]/,               code: 'ko'    }, // Hangul
  { regex: /[\u4E00-\u9FFF\u3400-\u4DBF]/,  code: 'zh-CN' }, // CJK
  { regex: /[\u0E00-\u0E7F]/,               code: 'th'    }, // Thai
  { regex: /[\u0600-\u06FF]/,               code: 'ar'    }, // Arabic
  { regex: /[\u0590-\u05FF]/,               code: 'he'    }, // Hebrew
  { regex: /[\u0400-\u04FF]/,               code: 'ru'    }, // Cyrillic
  { regex: /[\u0370-\u03FF]/,               code: 'el'    }, // Greek
  { regex: /[\u0980-\u09FF]/,               code: 'bn'    }, // Bengali
  { regex: /[\u0A00-\u0A7F]/,               code: 'pa'    }, // Gurmukhi (Punjabi)
  { regex: /[\u0A80-\u0AFF]/,               code: 'gu'    }, // Gujarati
  { regex: /[\u0B00-\u0B7F]/,               code: 'or'    }, // Odia (Oriya)
  { regex: /[\u0B80-\u0BFF]/,               code: 'ta'    }, // Tamil
  { regex: /[\u0C00-\u0C7F]/,               code: 'te'    }, // Telugu
  { regex: /[\u0C80-\u0CFF]/,               code: 'kn'    }, // Kannada
  { regex: /[\u0D00-\u0D7F]/,               code: 'ml'    }, // Malayalam
  { regex: /[\u0D80-\u0DFF]/,               code: 'si'    }, // Sinhala
  { regex: /[\u0900-\u097F]/,               code: 'hi'    }, // Devanagari → Hindi (most common)
  { regex: /[\u0E80-\u0EFF]/,               code: 'lo'    }, // Lao
  { regex: /[\u1000-\u109F]/,               code: 'my'    }, // Burmese
];

function detectLanguageFromText(text) {
  const sample = text.trim().slice(0, 300);
  if (!sample) return 'en';
  for (const { regex, code } of SCRIPT_MAP) {
    if (regex.test(sample)) return code;
  }
  return 'en'; // Default: Latin script → English
}

// ══════════════════════════════════════════════════════════════
// 8. TEXT-TO-SPEECH ENGINE
//    FIX: Properly waits for voiceschanged, selects best voice.
// ══════════════════════════════════════════════════════════════
const synth = window.speechSynthesis;

function loadVoices() {
  if (!synth) return;
  availableVoices = synth.getVoices();
  voicesLoaded    = availableVoices.length > 0;
  populateVoiceSelects();
}

// Browsers load voices asynchronously; listen for the event
if (synth) {
  synth.addEventListener('voiceschanged', loadVoices);
  // Also try immediately (Firefox populates synchronously)
  loadVoices();
  // Fallback: retry after 500ms if still empty (some Chromium builds)
  setTimeout(() => { if (!voicesLoaded) loadVoices(); }, 500);
  setTimeout(() => { if (!voicesLoaded) loadVoices(); }, 1500);
}

/**
 * Find the best available voice for a BCP-47 lang tag.
 * Priority: exact match → prefix match → any voice.
 */
function findBestVoice(ttsLang) {
  if (!availableVoices.length) loadVoices();
  if (!ttsLang || !availableVoices.length) return null;

  const lang    = ttsLang.toLowerCase();
  const prefix  = lang.split('-')[0];

  // 1. Exact match (e.g. hi-IN = hi-IN)
  let voice = availableVoices.find(v => v.lang.toLowerCase() === lang);
  // 2. Prefix match (e.g. hi-IN starts with hi)
  if (!voice) voice = availableVoices.find(v => v.lang.toLowerCase().startsWith(prefix));
  // 3. Local (device) voices preferred for non-Latin scripts
  if (!voice) voice = null;

  return voice;
}

/**
 * Speak text in the given language code.
 * If already speaking, stops it (toggle behavior).
 */
function speakText(text, langCode, button) {
  if (!synth) {
    showError('Text-to-speech is not supported in your browser.');
    return;
  }

  // ── STOP if already speaking ──
  if (isSpeaking) {
    synth.cancel();
    setSpeakingState(false);
    return;
  }

  if (!text || !text.trim()) {
    showToast('⚠️ No text to speak.');
    return;
  }

  const meta   = getLangMeta(langCode);
  const ttsTag = meta?.tts ?? langCode;
  const voice  = findBestVoice(ttsTag);

  if (!voice && meta?.tts) {
    // Show a warning but still attempt – browser may use its own fallback
    console.warn(`[TTS] No exact voice found for ${ttsTag}. Browser will use default.`);
  }

  const utter   = new SpeechSynthesisUtterance(text);
  utter.lang    = voice ? voice.lang : (ttsTag || 'en-US');
  utter.rate    = parseFloat(els.speechSpeed.value) || 1.0;
  utter.pitch   = 1;
  utter.volume  = 1;

  if (voice) utter.voice = voice;

  utter.onstart = () => {
    isSpeaking       = true;
    activeTtsButton  = button;
    setSpeakingUI(button, true);
  };

  utter.onend = () => {
    isSpeaking = false;
    setSpeakingUI(button, false);
    activeTtsButton = null;
  };

  utter.onerror = (e) => {
    isSpeaking = false;
    setSpeakingUI(button, false);
    activeTtsButton = null;
    // 'interrupted' fires when we manually cancel – not an error
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      const langName = meta?.name ?? langCode;
      if (e.error === 'language-unavailable' || e.error === 'voice-unavailable') {
        showError(`Voice for "${langName}" is not available on this device. Try a different browser or install the voice.`);
      } else {
        console.warn('[TTS] Speech error:', e.error);
      }
    }
  };

  synth.speak(utter);
}

function setSpeakingUI(button, on) {
  if (!button) return;
  button.classList.toggle('speaking', on);
  const icon = button.querySelector('i');
  const span = button.querySelector('span');
  if (icon) icon.className = on ? 'fa-solid fa-stop' : 'fa-solid fa-volume-high';
  if (span) span.textContent = on ? 'Stop' : 'Listen';
}

function setSpeakingState(on) {
  if (!on && activeTtsButton) {
    setSpeakingUI(activeTtsButton, false);
  }
  isSpeaking = on;
}

/** Populate voice <select>s for current source/target language */
function populateVoiceSelects() {
  populateVoiceSelect(els.sourceVoiceSelect, els.sourceLang.value);
  populateVoiceSelect(els.targetVoiceSelect, els.targetLang.value);
}

function populateVoiceSelect(selectEl, langCode) {
  if (!selectEl) return;
  const meta    = getLangMeta(langCode);
  const ttsTag  = meta?.tts;
  if (!ttsTag) {
    selectEl.innerHTML = '<option>No voice available</option>';
    return;
  }
  const prefix  = ttsTag.toLowerCase().split('-')[0];
  const matched = availableVoices.filter(v =>
    v.lang.toLowerCase() === ttsTag.toLowerCase() ||
    v.lang.toLowerCase().startsWith(prefix)
  );
  if (!matched.length) {
    selectEl.innerHTML = `<option>No "${meta.name}" voice on this device</option>`;
    return;
  }
  selectEl.innerHTML = matched
    .map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`)
    .join('');
  // Store matched voices for retrieval
  selectEl._voices = matched;
}

function getSelectedVoice(selectEl) {
  if (!selectEl || !selectEl._voices) return null;
  return selectEl._voices[parseInt(selectEl.value, 10)] ?? null;
}

// ══════════════════════════════════════════════════════════════
// 9. UI STATE HELPERS
// ══════════════════════════════════════════════════════════════
function showLoading(on) {
  els.loadingSpinner.hidden = !on;
  els.translateBtn.disabled = on;
  els.translateBtn.classList.toggle('loading', on);

  // Spinner inside button
  const existing = els.translateBtn.querySelector('.btn-spin');
  if (on && !existing) {
    const spin = document.createElement('span');
    spin.className = 'btn-spin';
    els.translateBtn.prepend(spin);
  } else if (!on && existing) {
    existing.remove();
  }
}

function showError(msg) {
  els.errorMsg.textContent = msg;
  els.errorBanner.hidden   = false;
  clearTimeout(window._errorTimer);
  window._errorTimer = setTimeout(() => { els.errorBanner.hidden = true; }, 8000);
}

function hideError() {
  els.errorBanner.hidden = true;
  clearTimeout(window._errorTimer);
}

let _toastTimer = null;
function showToast(msg, duration = 2800) {
  clearTimeout(_toastTimer);
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  _toastTimer = setTimeout(() => els.toast.classList.remove('show'), duration);
}

function setOutputText(text, langCode) {
  currentTranslation = text;
  currentTargetLang  = langCode;

  // Clear → set text
  els.translatedText.textContent = '';
  els.translatedText.textContent = text;

  // RTL direction
  const meta = getLangMeta(langCode);
  els.translatedText.setAttribute('dir', meta?.rtl ? 'rtl' : 'ltr');

  // Target panel glow
  document.querySelector('.target-panel').classList.add('has-translation');

  // Enable buttons
  els.copyBtn.disabled     = false;
  els.downloadBtn.disabled = false;
  els.targetTtsBtn.disabled = false;
  els.saveHistBtn.disabled  = false;

  // Update target voice select
  populateVoiceSelect(els.targetVoiceSelect, langCode);
}

function resetOutput() {
  currentTranslation = '';
  currentTargetLang  = '';
  els.translatedText.innerHTML = '<span class="placeholder-text">Your translation will appear here…</span>';
  els.translatedText.removeAttribute('dir');
  document.querySelector('.target-panel').classList.remove('has-translation');
  els.copyBtn.disabled      = true;
  els.downloadBtn.disabled  = true;
  els.targetTtsBtn.disabled = true;
  els.saveHistBtn.disabled  = true;
}

function updateCounters() {
  const text = els.sourceText.value;
  const len  = text.length;
  const max  = parseInt(els.sourceText.maxLength, 10);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  els.charCount.textContent = `${len.toLocaleString()} / ${max.toLocaleString()}`;
  els.charCount.classList.toggle('warn', len > max * 0.8 && len <= max);
  els.charCount.classList.toggle('over', len > max);

  els.wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;

  // Enable source TTS only when there's text
  els.sourceTtsBtn.disabled = len === 0;
  els.detectLangBtn.disabled = len === 0;
}

// ══════════════════════════════════════════════════════════════
// 10. CORE TRANSLATE HANDLER
// ══════════════════════════════════════════════════════════════
async function handleTranslate() {
  // Stop any ongoing speech first
  if (isSpeaking) { synth?.cancel(); setSpeakingState(false); }

  const rawText  = els.sourceText.value;
  const text     = rawText.trim();
  let   source   = els.sourceLang.value;
  const target   = els.targetLang.value;

  hideError();

  if (!text) {
    showError('Please enter some text before translating.');
    els.sourceText.focus();
    return;
  }

  // Auto-detect source language if set to 'auto'
  if (source === 'auto') {
    source = detectLanguageFromText(text);
    const detectedMeta = getLangMeta(source);
    if (detectedMeta) {
      els.detectedLangBadge.textContent = `Detected: ${detectedMeta.flag} ${detectedMeta.name}`;
      els.detectedLangBadge.hidden = false;
    }
  } else {
    els.detectedLangBadge.hidden = true;
  }

  if (source === target) {
    showError('Source and target languages are the same. Please select different languages.');
    return;
  }

  showLoading(true);
  resetOutput();

  try {
    const result = await callTranslateAPI(text, source, target);
    setOutputText(result, target);
    showToast('✅ Translation complete!');
  } catch (err) {
    showError(err.message || 'An unexpected error occurred. Please try again.');
    console.error('[LinguaFlow] Translation error:', err);
  } finally {
    showLoading(false);
  }
}

// ══════════════════════════════════════════════════════════════
// 11. SWAP HANDLER
// ══════════════════════════════════════════════════════════════
function handleSwap() {
  // Cannot swap when source is 'auto'
  if (els.sourceLang.value === 'auto') {
    showToast('⚠️ Set a specific source language before swapping.');
    return;
  }

  if (isSpeaking) { synth?.cancel(); setSpeakingState(false); }

  const tmpLang = els.sourceLang.value;
  els.sourceLang.value = els.targetLang.value;
  els.targetLang.value = tmpLang;

  // Swap text as well
  if (currentTranslation) {
    els.sourceText.value = currentTranslation;
    resetOutput();
    updateCounters();
  }

  els.detectedLangBadge.hidden = true;
  populateVoiceSelects();
  saveLanguagePrefs();
}

// ══════════════════════════════════════════════════════════════
// 12. COPY HANDLER
// ══════════════════════════════════════════════════════════════
async function handleCopy() {
  if (!currentTranslation) return;
  try {
    await navigator.clipboard.writeText(currentTranslation);
    setIconFeedback(els.copyBtn, 'fa-solid fa-check', 'Copied!', 'copied', 2200);
    showToast('📋 Translation copied to clipboard!');
  } catch {
    fallbackCopy(currentTranslation);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast('📋 Translation copied!');
  } catch {
    showError('Could not copy. Please select the text and copy manually.');
  }
  document.body.removeChild(ta);
}

/** Temporarily change icon + text on a button with a CSS class */
function setIconFeedback(btn, iconClass, label, cssClass, ms = 2000) {
  const icon = btn.querySelector('i');
  const span = btn.querySelector('span');
  const origIcon  = icon?.className;
  const origLabel = span?.textContent;
  btn.classList.add(cssClass);
  if (icon) icon.className = iconClass;
  if (span) span.textContent = label;
  setTimeout(() => {
    btn.classList.remove(cssClass);
    if (icon) icon.className = origIcon;
    if (span) span.textContent = origLabel;
  }, ms);
}

// ══════════════════════════════════════════════════════════════
// 13. DOWNLOAD HANDLER
// ══════════════════════════════════════════════════════════════
function handleDownload() {
  if (!currentTranslation) return;

  const srcMeta = getLangMeta(els.sourceLang.value);
  const tgtMeta = getLangMeta(els.targetLang.value);
  const src = els.sourceText.value.trim();

  const content = [
    '═══════════════════════════════════════',
    '  LinguaFlow – Translation Export',
    '  CodeAlpha Internship Project',
    '═══════════════════════════════════════',
    '',
    `Source Language : ${srcMeta?.name ?? els.sourceLang.value}`,
    `Target Language : ${tgtMeta?.name ?? els.targetLang.value}`,
    `Date            : ${new Date().toLocaleString()}`,
    '',
    '── SOURCE TEXT ─────────────────────────',
    src,
    '',
    '── TRANSLATION ─────────────────────────',
    currentTranslation,
    '',
    '═══════════════════════════════════════',
    '  Powered by MyMemory Translation API',
    '═══════════════════════════════════════',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `translation_${els.sourceLang.value}_to_${els.targetLang.value}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('⬇️ Translation downloaded!');
}

// ══════════════════════════════════════════════════════════════
// 14. TRANSLATION HISTORY (localStorage)
// ══════════════════════════════════════════════════════════════
const HISTORY_KEY = 'lf_translation_history';
const MAX_HISTORY = 30;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch { return []; }
}

function saveToHistory() {
  if (!currentTranslation || !els.sourceText.value.trim()) return;

  const srcMeta = getLangMeta(els.sourceLang.value === 'auto'
    ? detectLanguageFromText(els.sourceText.value)
    : els.sourceLang.value);
  const tgtMeta = getLangMeta(els.targetLang.value);

  const entry = {
    id:         Date.now(),
    sourceText: els.sourceText.value.trim(),
    targetText: currentTranslation,
    sourceLang: els.sourceLang.value,
    targetLang: els.targetLang.value,
    sourceName: srcMeta?.name ?? els.sourceLang.value,
    targetName: tgtMeta?.name ?? els.targetLang.value,
    sourceFlag: srcMeta?.flag ?? '',
    targetFlag: tgtMeta?.flag ?? '',
    timestamp:  new Date().toISOString(),
  };

  const history = [entry, ...getHistory()].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
  showToast('🔖 Saved to history!');
}

function clearHistory() {
  if (!confirm('Clear all translation history? This cannot be undone.')) return;
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  showToast('🗑️ History cleared.');
}

function renderHistory() {
  const history = getHistory();
  const list    = els.historyList;

  // Remove all existing items (keep the empty-state div)
  list.querySelectorAll('.history-item').forEach(el => el.remove());

  if (!history.length) {
    els.historyEmpty.style.display = '';
    return;
  }

  els.historyEmpty.style.display = 'none';

  history.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.dataset.id = entry.id;

    const relTime = formatRelativeTime(new Date(entry.timestamp));
    const srcPreview = entry.sourceText.length > 80
      ? entry.sourceText.slice(0, 80) + '…' : entry.sourceText;
    const tgtPreview = entry.targetText.length > 80
      ? entry.targetText.slice(0, 80) + '…' : entry.targetText;

    item.innerHTML = `
      <div class="history-meta">
        <div class="history-langs">
          <span>${entry.sourceFlag} ${entry.sourceName}</span>
          <i class="fa-solid fa-arrow-right" style="font-size:0.65rem;opacity:0.6"></i>
          <span>${entry.targetFlag} ${entry.targetName}</span>
        </div>
        <span class="history-time">${relTime}</span>
      </div>
      <div class="history-texts">
        <div class="history-source">${escapeHtml(srcPreview)}</div>
        <div class="history-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="history-target">${escapeHtml(tgtPreview)}</div>
      </div>
      <div class="history-actions">
        <button class="icon-btn hist-retranslate" data-id="${entry.id}" title="Re-translate this">
          <i class="fa-solid fa-rotate"></i><span>Re-translate</span>
        </button>
        <button class="icon-btn hist-delete danger-btn" data-id="${entry.id}" title="Delete">
          <i class="fa-solid fa-trash-can"></i><span>Delete</span>
        </button>
      </div>
    `;
    list.appendChild(item);
  });

  // Delegate events
  list.querySelectorAll('.hist-retranslate').forEach(btn => {
    btn.addEventListener('click', () => {
      const id    = parseInt(btn.dataset.id, 10);
      const entry = getHistory().find(h => h.id === id);
      if (!entry) return;
      els.sourceText.value = entry.sourceText;
      els.sourceLang.value = entry.sourceLang;
      els.targetLang.value = entry.targetLang;
      updateCounters();
      window.scrollTo({ top: document.getElementById('translator').offsetTop - 80, behavior: 'smooth' });
      handleTranslate();
    });
  });
  list.querySelectorAll('.hist-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id      = parseInt(btn.dataset.id, 10);
      const history = getHistory().filter(h => h.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      renderHistory();
    });
  });
}

function formatRelativeTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return date.toLocaleDateString();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════════════════════════
// 15. DARK / LIGHT THEME
// ══════════════════════════════════════════════════════════════
function initTheme() {
  const saved = localStorage.getItem('lf_theme') || 'dark';
  applyTheme(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lf_theme', theme);
  if (els.themeIcon) {
    els.themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

// ══════════════════════════════════════════════════════════════
// 16. NAVBAR SCROLL + ACTIVE LINK
// ══════════════════════════════════════════════════════════════
function initNavbar() {
  window.addEventListener('scroll', () => {
    els.navbar?.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
  }, { passive: true });

  // Hamburger
  els.hamburger?.addEventListener('click', () => {
    const open = els.mobileMenu.classList.toggle('open');
    els.hamburger.classList.toggle('open', open);
    els.hamburger.setAttribute('aria-expanded', open);
    els.mobileMenu.setAttribute('aria-hidden', !open);
  });
}

function updateActiveNavLink() {
  const sections = ['home','translator','features','how-it-works','history','about'];
  let current = '';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  }
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href')?.slice(1);
    a.classList.toggle('active', href === current);
  });
}

window.closeMobile = function() {
  els.mobileMenu?.classList.remove('open');
  els.hamburger?.classList.remove('open');
  els.hamburger?.setAttribute('aria-expanded', 'false');
  els.mobileMenu?.setAttribute('aria-hidden', 'true');
};

// ══════════════════════════════════════════════════════════════
// 17. PARTICLE CANVAS (animated floating dots)
// ══════════════════════════════════════════════════════════════
function initParticles() {
  const canvas = els.particlesCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W, H, particles;
  const COUNT = window.innerWidth < 768 ? 40 : 80;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 0.5,
      a:  Math.random() * 0.4 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(167,139,250,${p.a})`
        : `rgba(79,70,229,${p.a * 0.6})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
}

// ══════════════════════════════════════════════════════════════
// 18. SCROLL REVEAL (Intersection Observer)
// ══════════════════════════════════════════════════════════════
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.feat-card, .step-card, .history-section, .about-card, .translator-card'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

// ══════════════════════════════════════════════════════════════
// 19. PREFERENCES HELPERS
// ══════════════════════════════════════════════════════════════
function saveLanguagePrefs() {
  localStorage.setItem('lf_source_lang', els.sourceLang.value);
  localStorage.setItem('lf_target_lang', els.targetLang.value);
}

// ══════════════════════════════════════════════════════════════
// 20. KEYBOARD SHORTCUTS
// ══════════════════════════════════════════════════════════════
function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    handleTranslate();
  }
}

// ══════════════════════════════════════════════════════════════
// 21. EVENT LISTENERS
// ══════════════════════════════════════════════════════════════
function bindEvents() {
  // Translate
  els.translateBtn.addEventListener('click', handleTranslate);
  els.sourceText.addEventListener('keydown', handleKeydown);

  // Swap
  els.swapBtn.addEventListener('click', handleSwap);

  // Clear
  els.clearBtn.addEventListener('click', () => {
    if (isSpeaking) { synth?.cancel(); setSpeakingState(false); }
    els.sourceText.value = '';
    els.detectedLangBadge.hidden = true;
    resetOutput();
    hideError();
    updateCounters();
    els.sourceText.focus();
  });

  // Copy
  els.copyBtn.addEventListener('click', handleCopy);

  // Download
  els.downloadBtn.addEventListener('click', handleDownload);

  // Source TTS
  els.sourceTtsBtn.addEventListener('click', () => {
    // Stop target TTS if speaking
    if (isSpeaking && activeTtsButton === els.targetTtsBtn) {
      synth?.cancel(); setSpeakingState(false);
    }
    const voice = getSelectedVoice(els.sourceVoiceSelect);
    const utter = buildUtterance(els.sourceText.value, els.sourceLang.value, voice);
    runSpeech(utter, els.sourceTtsBtn);
  });

  // Target TTS
  els.targetTtsBtn.addEventListener('click', () => {
    if (!currentTranslation) { showToast('⚠️ No translation to speak yet.'); return; }
    // Stop source TTS if speaking
    if (isSpeaking && activeTtsButton === els.sourceTtsBtn) {
      synth?.cancel(); setSpeakingState(false);
    }
    const voice = getSelectedVoice(els.targetVoiceSelect);
    const utter = buildUtterance(currentTranslation, currentTargetLang, voice);
    runSpeech(utter, els.targetTtsBtn);
  });

  // Save to history
  els.saveHistBtn.addEventListener('click', saveToHistory);

  // Auto-detect language
  els.detectLangBtn.addEventListener('click', () => {
    const text = els.sourceText.value.trim();
    if (!text) return;
    const code = detectLanguageFromText(text);
    const meta = getLangMeta(code);
    if (meta) {
      els.sourceLang.value = code;
      els.detectedLangBadge.textContent = `Detected: ${meta.flag} ${meta.name}`;
      els.detectedLangBadge.hidden = false;
      showToast(`🔍 Detected: ${meta.flag} ${meta.name}`);
      populateVoiceSelect(els.sourceVoiceSelect, code);
      saveLanguagePrefs();
    }
  });

  // Error dismiss
  els.errorClose.addEventListener('click', hideError);

  // Char/word counter
  els.sourceText.addEventListener('input', () => {
    updateCounters();
    if (currentTranslation) resetOutput();
    els.detectedLangBadge.hidden = true;
  });

  // Language change
  els.sourceLang.addEventListener('change', () => {
    if (isSpeaking) { synth?.cancel(); setSpeakingState(false); }
    els.detectedLangBadge.hidden = true;
    populateVoiceSelect(els.sourceVoiceSelect, els.sourceLang.value);
    saveLanguagePrefs();
  });
  els.targetLang.addEventListener('change', () => {
    if (isSpeaking) { synth?.cancel(); setSpeakingState(false); }
    populateVoiceSelect(els.targetVoiceSelect, els.targetLang.value);
    saveLanguagePrefs();
  });

  // Theme
  els.themeToggle?.addEventListener('click', toggleTheme);

  // Voice settings toggle
  els.voiceSettingsToggle?.addEventListener('click', () => {
    const open = els.voiceSettingsBar.classList.toggle('open');
    els.voiceSettingsToggle.classList.toggle('active', open);
  });

  // Speed slider
  els.speechSpeed?.addEventListener('input', () => {
    els.speedValue.textContent = `${parseFloat(els.speechSpeed.value).toFixed(1)}×`;
  });

  // History clear
  els.clearHistoryBtn?.addEventListener('click', clearHistory);
}

// ══════════════════════════════════════════════════════════════
// 22. SPEECH HELPERS (refactored)
// ══════════════════════════════════════════════════════════════
function buildUtterance(text, langCode, overrideVoice = null) {
  const meta   = getLangMeta(langCode);
  const ttsTag = meta?.tts ?? langCode;
  const voice  = overrideVoice ?? findBestVoice(ttsTag);

  const utter  = new SpeechSynthesisUtterance(text);
  utter.lang   = voice ? voice.lang : (ttsTag || 'en-US');
  utter.rate   = parseFloat(els.speechSpeed?.value ?? '1') || 1.0;
  utter.pitch  = 1;
  utter.volume = 1;
  if (voice) utter.voice = voice;
  return { utter, meta };
}

function runSpeech({ utter, meta }, button) {
  if (!synth) {
    showError('Text-to-speech is not supported in your browser.');
    return;
  }

  // Toggle off if same button is active
  if (isSpeaking) {
    synth.cancel();
    setSpeakingState(false);
    return;
  }

  if (!utter.text?.trim()) {
    showToast('⚠️ No text to speak.');
    return;
  }

  utter.onstart = () => {
    isSpeaking       = true;
    activeTtsButton  = button;
    setSpeakingUI(button, true);
  };
  utter.onend = () => {
    isSpeaking = false;
    activeTtsButton = null;
    setSpeakingUI(button, false);
  };
  utter.onerror = (e) => {
    isSpeaking = false;
    activeTtsButton = null;
    setSpeakingUI(button, false);
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      if (e.error === 'language-unavailable' || e.error === 'voice-unavailable') {
        showError(`Voice for "${meta?.name ?? utter.lang}" is not available on this device.`);
      } else {
        console.warn('[TTS] Speech error:', e.error, e);
      }
    }
  };

  synth.speak(utter);
}

// ══════════════════════════════════════════════════════════════
// 23. INIT
// ══════════════════════════════════════════════════════════════
function init() {
  initTheme();
  populateDropdowns();
  bindEvents();
  initNavbar();
  initParticles();
  initScrollReveal();
  renderHistory();
  updateCounters();

  // TTS availability guard
  if (!synth) {
    [els.sourceTtsBtn, els.targetTtsBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = true;
      btn.title    = 'Text-to-speech not supported in this browser';
    });
  }

  console.info(
    '%c🌐 LinguaFlow %cPremium Edition – CodeAlpha',
    'color:#a78bfa;font-weight:900;font-size:15px;',
    'color:#67e8f9;font-weight:400;font-size:13px;'
  );
}

document.addEventListener('DOMContentLoaded', init);
