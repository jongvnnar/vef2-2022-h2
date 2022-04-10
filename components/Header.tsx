import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import s from '../styles/Header.module.scss';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
  const { numLines } = useCart();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header>
      <nav className={s.navigation}>
        <div className={s.navLink}>
          <Link href="/" passHref>
            <strong>Gũrme Restaurang</strong>
          </Link>
        </div>
        {!sidebarOpen ? (
          <button
            className={s.burger}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <Image src="/Hamburger_icon.svg" layout="fill" alt="menu" />
          </button>
        ) : (
          <></>
        )}
        <div className={s.navigationMenu}>
          <NavLink label="Menu" href="/menu" icon="/menu_icon.svg" />
          <NavLink label="Cart" href="/cart" icon="/cart_icon.svg" />
          <CartStatus quantity={numLines} sidebar={false} />
        </div>
      </nav>
      <Sidebar
        open={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
        }}
        cartQuantity={numLines}
      />
    </header>
  );
}

type NavLinkProps = {
  label: string;
  href: string;
  icon: string;
  onClick?: () => void;
};

const NavLink = ({ label, href, icon, onClick }: NavLinkProps) => {
  return (
    <div className={s.navLink}>
      <Link href={href} passHref>
        <div onClick={onClick}>
          <Image src={icon} width={20} height={20} alt="" />
          <p>{label}</p>
        </div>
      </Link>
    </div>
  );
};

const Sidebar = ({
  open,
  onClose,
  cartQuantity,
}: {
  open: boolean;
  onClose: () => void;
  cartQuantity: number;
}) => {
  return (
    <>
      {open ? (
        <button className={s.sidebarIcon} onClick={onClose}>
          <Image src="/close_icon.svg" width={40} height={40} alt="close" />
        </button>
      ) : (
        <></>
      )}
      <div
        className={classNames(s.sidebarContainer, { [s.sidebarOpen]: open })}
      >
        <div className={s.sidebarNavigationMenu}>
          <NavLink
            label="Menu"
            href="/menu"
            icon="/menu_icon.svg"
            onClick={onClose}
          />
          <NavLink
            label="Cart"
            href="/cart"
            icon="/cart_icon.svg"
            onClick={onClose}
          />
          <CartStatus quantity={cartQuantity} sidebar={true} />
        </div>
      </div>
    </>
  );
};

type CartStatusProps = {
  quantity: number;
  sidebar: boolean;
};

const CartStatus = ({ quantity, sidebar }: CartStatusProps) => {
  if (quantity > 0) {
    return (
      <div
        className={classNames(s.cartStatus, {
          [s.cartStatus_sidebar]: sidebar,
        })}
      >
        <p>{quantity}</p>
      </div>
    );
  }
  return <></>;
};
