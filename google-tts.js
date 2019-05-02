import key from 'key';
import tts from 'tts';

export default function (text, lang, speed, timeout) {
  return key(timeout).then((key) => {
    return tts(text, key, lang || 'en', speed || 1);
  });
};
