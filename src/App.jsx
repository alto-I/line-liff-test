import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useForm } from 'react-hook-form';
import './App.css';

const Input = ({ label, value, register, required }) => (
  <>
    <label>{label}</label>:
    <input {...register(value, { required })} />
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
    initLiff();
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
    const messages = `商品
      ${postData.product}
      総合評価
      ${postData.rate}
      ニックネーム
      ${postData.nickname}
      タイトル
      ${postData.title}
      本文
      ${postData.description}
      `
      .trim()
      .replace(/(?<=^|\r|\r?\n)\s+/g, '');
    liff
      .sendMessages([
        {
          type: 'text',
          text: 'aaa',
        },
      ])
      .then(() => {
        window.alert('Message sent');
      })
      .catch((error) => {
        window.alert('Error sending message: ' + error);
      });
  };

  return (
    <>
      <p>ようそこ LIFFアプリへ!</p>
      <form onSubmit={handleSubmit(handleSendMessages)}>
        {/* ここはRailsから取ってきて商品一覧にしたい */}
        <Input label="商品" value="product" register={register} />
        {/* <br />
        <Select label="総合評価" {...register('rate')} />
        <br />
        <Input label="ニックネーム" value="nickname" register={register} />
        <br />
        <Input label="タイトル" value="title" register={register} />
        <br />
        <Input label="本文" value="description" register={register} />
        <br /> */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="投稿する" />
      </form>
    </>
  );
}

export default App;
