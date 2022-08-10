import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useForm } from 'react-hook-form';
import './App.css';

const Input = ({ label, register, required }) => (
  <>
    <label>{label}</label>:
    <input {...register(label, { required })} />
  </>
);

const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </>
));

function App() {
  const [profile, setProfile] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // initLiff();
  }, []);

  const initLiff = () => {
    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        if (liff.isLoggedIn() === false) liff.login({});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const getUserInfo = () => {
  //   liff
  //     .getProfile()
  //     .then((profile) => {
  //       console.log(profile);
  //       setProfile(JSON.stringify(profile));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const handleSendMessages = (postData) => {
    console.log(postData);
    liff
      .sendMessages([
        {
          type: 'text',
          text: postData,
        },
      ])
      .then(() => {
        window.alert('Message sent');
      })
      .catch((error) => {
        window.alert('Error sending message: ' + error);
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
      <p>ようそこ LIFFアプリへ!</p>
      <form onSubmit={handleSubmit(handleSendMessages)}>
        {/* ここはRailsから取ってきて商品一覧にしたい */}
        <Input label="商品" register={register} required />
        <br />
        <Select label="総合評価" {...register('総合評価')} />
        <br />
        <Input label="ニックネーム" register={register} required />
        <br />
        <Input label="タイトル" register={register} required />
        <br />
        <Input label="本文" register={register} required />
        <br />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="投稿する" />
      </form>
    </>
  );
}

export default App;
