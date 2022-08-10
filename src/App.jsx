import { useEffect, useState } from 'react';
import liff from '@line/liff';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [version, setVersion] = useState('');

  useEffect(() => {
    setVersion(liff.getLineVersion());
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage('LIFF init succeeded.');
        if (!liff.isInClient()) {
          window.alert(
            'This button is unavailable as LIFF is currently being opened in an external browser.',
          );
        } else {
          liff
            .sendMessages([
              {
                type: 'text',
                text: 'Hello, World!',
              },
            ])
            .then(() => {
              window.alert('Message sent');
            })
            .catch((error) => {
              window.alert('Error sending message: ' + error);
            });
        }
      })
      .catch((e) => {
        setMessage('LIFF init failed.');
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      <p>line version: {version}</p>
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default App;
