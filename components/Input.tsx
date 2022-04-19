import classNames from 'classnames';
import React from 'react';
import s from '../styles/Input.module.scss';

type Props = {
  label: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  isError: boolean;
  textarea: boolean;
  type: string;
  error: string;
};

export function Input({
  label,
  name,
  value,
  setValue,
  isError,
  textarea,
  type,
  error,
}: Props) {
  return (
    <div
      className={classNames(
        s.field,
        isError && s.fieldInvalid,
        textarea && s.fieldTextarea
      )}
    >
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {isError && <p className={s.errors}>{error}</p>}
    </div>
  );
}

Input.defaultProps = {
  isError: false,
  textarea: false,
  type: 'text',
  error: '',
};
