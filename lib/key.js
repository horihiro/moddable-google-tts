import {} from 'fetch';
const host = 'https://translate.google.com';

const buffer2String = (buf) => {
  return String.fromCharCode.apply("", new Uint8Array(buf))
}

const largeBuffer2String = (buf) => {
  const tmp = [];
  const len = 128;
  for (var p = 0; p < buf.byteLength; p += len) {
    tmp.push(buffer2String(buf.slice(p, p + len)));
  }
  return tmp.join("");
}

export default function (timeout) {
  return fetch(host, {
    timeout: timeout || 10 * 1000
  })
  .then((res) => {
    // Getting reader of body
    let body = res.body;
    let reader = body.getReader();
    let prev = '';
    let tkk = null;

    return reader.read().then(function processResult(result) {
      const curr = largeBuffer2String(result.value);
      prev += curr;

      if (!tkk) {
        tkk = prev.match(/(?:tkk:|TKK=)'(\d+.\d+)'/);
        if (tkk) {
          tkk = tkk[1];
          trace(`${new Date()}: ${tkk}\n`);
          return reader.closed().then(() => {
            return tkk;
          });
        }
      }
      prev = curr;
      return reader.read().then(processResult);
    });
  })
};
