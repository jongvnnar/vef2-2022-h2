import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import Button from './Button';
import { Input } from './Input';

import s from '../styles/LoginForm.module.scss';
import { stringify } from 'querystring';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function LoginForm() {
  const { loginUser, message } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loginError, setLoginError] = useState(false);



  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    setUsernameError("");
    setPasswordError("");

    console.log('username :>> ', username);
    console.log('password :>> ', password);

    const loginSuccess = await loginUser(username, password);
    if (loginSuccess) {
      alert("þú hefur loggað þig inn");
    }
    else {
      alert("virkar ekki" + message);
    }

  };

  return (
    <form className={s.loginForm} onSubmit={login} autoComplete="off">
      <Input
        label="Notendanafn:"
        name="username"
        value={username}
        setValue={setUsername}
        isError={!!usernameError}
        error={usernameError}
      />
      <Input
        label="Lykilorð:"
        name="password"
        value={password}
        setValue={setPassword}
        type="password"
        isError={!!passwordError}
        error={passwordError}
      />

      {loginError ? (
        <p className={s.error}>Vitlaust notendanafn eða lykilorð</p>
      ) : (
        <></>
      )}

      <Button type="submit" size="large" primary={true}>
        Innskrá
      </Button>
    </form>
  );
}
