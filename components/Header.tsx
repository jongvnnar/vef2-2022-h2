import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import s from "../styles/Header.module.scss"

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header>
      <nav className={s.navigation}>
        <div className={s.navLink}>
          <Link href="/" passHref>
            <strong>Vefforritunar veitingastaðurinn</strong>
          </Link>
        </div>
        {!sidebarOpen ?
        <button className={s.burger} onClick={() => {setSidebarOpen(true)}}>
          <Image src="/Hamburger_icon.svg" layout="fill" alt="menu" />
        </button> : <></>}
        <div className={s.navigationMenu}>
          <NavLink label="Menu" href="/menu" icon="/menu_icon.svg" />
          <NavLink label="Cart" href="/cart" icon="/cart_icon.svg" />
        </div>
      </nav>
      <Sidebar open={sidebarOpen} onClose={() => {setSidebarOpen(false)}} />
    </header>
  );
}

type NavLinkProps = {
  label: string,
  href: string,
  icon: string,
  onClick?: () => void
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
}

const Sidebar = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  return (
    <>
    {open ?
    <button className={s.sidebarIcon} onClick={onClose}>
      <Image src="/close_icon.svg" width={40} height={40} alt="close" />
    </button> : <></>}
    <div className={classNames(s.sidebarContainer, { [s.sidebarOpen]: open})}>
      <div className={s.sidebarNavigationMenu}>
        <NavLink label="Menu" href="/menu" icon="/menu_icon.svg" onClick={onClose} />
        <NavLink label="Cart" href="/cart" icon="/cart_icon.svg" onClick={onClose} />
      </div>
    </div>
    </>
  )
}
