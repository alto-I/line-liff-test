import { useEffect, useState } from 'react';
import liff from '@line/liff';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [version, setVersion] = useState('');
  const [login, setLogin] = useState('');

  useEffect(() => {
    setVersion(liff.getLineVersion());
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage('LIFF init succeeded.');
        setLogin(toString(liff.isLoggedIn()));
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
      <p>{login}</p>
    </div>
  );
}

export default App;
