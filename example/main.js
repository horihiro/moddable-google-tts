debugger;

import googleTTS from 'google-tts';

googleTTS('Hello World', 'en')
.then((result) => {
  const tkk = result;
  trace(tkk);
});
