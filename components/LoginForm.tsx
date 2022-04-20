import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/Auth';
import Button from './Button';
import { Input } from './Input';
import { Error } from '../types/Error';

import s from '../styles/LoginForm.module.scss';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function LoginForm() {
  const { loginUser, errors, user, token } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loginError, setLoginError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    setUsernameError('');
    setPasswordError('');

    const loginSuccess = await loginUser(username.trim(), password.trim());
    if (!loginSuccess) {
      errors.forEach((error: Error) => {
        if (error.param == 'password') {
          setPasswordError(error.msg);
        } else if (error.param == 'username') {
          setUsernameError(error.msg);
        }
      });
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
