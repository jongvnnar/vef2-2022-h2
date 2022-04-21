import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/Auth';
import Button from './Button';
import { Input } from './Input';
import { Error } from '../types/Error';

import s from '../styles/LoginForm.module.scss';

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
    <>
      <h1 className={s.header}>Sign In</h1>
      <form className={s.loginForm} onSubmit={login} autoComplete="off">
        <Input
          label="Username:"
          name="username"
          value={username}
          setValue={setUsername}
          isError={!!usernameError}
          error={usernameError}
        />
        <Input
          label="Password:"
          name="password"
          value={password}
          setValue={setPassword}
          type="password"
          isError={!!passwordError}
          error={passwordError}
        />

        {loginError ? (
          <p className={s.error}>Wrong username or password</p>
        ) : (
          <></>
        )}

        <Button type="submit" size="large" primary={true}>
          Sign In
        </Button>
      </form>
    </>
  );
}
