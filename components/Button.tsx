import { ReactNode } from 'react';
import classNames from 'classnames';
import s from '../styles/Button.module.scss';

type Props = {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size: 'small' | 'large';
  primary: boolean;
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
};

export default function Button({
  children,
  onClick,
  size,
  primary,
  type,
  disabled
}: Props) {
  return (
    <button
      className={classNames(s.button, s[size], {
        [s.primary]: primary,
        [s.secondary]: !primary,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => {},
  disabled: false,
};
