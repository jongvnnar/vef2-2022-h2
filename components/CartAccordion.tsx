import { useState } from "react";
import s from '../styles/MenuItemCard.module.scss';

type PageContentItemAccordionItem = {
  text: string;
}
export function CartAccordion({ text }: PageContentItemAccordionItem) {
  const [hidden, setHidden] = useState<boolean>(true);
  // console.log('hidden :>> ', hidden);
  const onClick = () => {
    // console.log('onclick :>> ');
    setHidden((h) => !h);
  }

  return (
    <div>
      <button className={s.addtocartbutton} onClick={onClick}>{hidden ? "Add to cart" : "Nah"}</button>
      <p style={{ display: hidden ? 'none' : 'block' }}>{text}</p>
    </div>
  )
}
