debugger;

import googleTTS from 'google-tts';

googleTTS('Hello World', 'en')
.then((result) => {
  const url = result;
  trace(`${url}\n`);
  return googleTTS('こんにちは', 'ja')
})
.then((result) => {
  const url = result;
  trace(`${url}\n`);
});
