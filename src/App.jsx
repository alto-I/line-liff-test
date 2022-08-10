import { useEffect, useState } from 'react';
import liff from '@line/liff';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [version, setVersion] = useState('');
  const [login, setLogin] = useState('');

  useEffect(() => {
    initLiff();
  }, []);

  const initLiff = () => {
    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        if (liff.isLoggedIn() === false) {
          liff.login({});
          getUserInfo();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserInfo = () => {
    liff
      .getProfile()
      .then((profile) => {
        alert(JSON.stringify(profile));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   setVersion(liff.getLineVersion());
  //   liff
  //     .init({
  //       liffId: import.meta.env.VITE_LIFF_ID,
  //     })
  //     .then(() => {
  //       setMessage('LIFF init succeeded.');
  //       setLogin(liff.isLoggedIn().toString());
  //     })
  //     .catch((e) => {
  //       setMessage('LIFF init failed.');
  //       setError(`${e}`);
  //     });
  // });

  return (
    <>
      {liff.isInClient() === false ? (
        <p>ブラウザからは使えない。LIFF使え!!</p>
      ) : (
        <p>ようそこ LIFFアプリへ!</p>
      )}
    </>
  );
}

export default App;
