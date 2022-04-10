import { OrderState } from '../lib/order-state';
import { StateLine } from '../types/order';
import { StateEnum, StateNameEnum } from '../types/state';
import Image from 'next/image';
import checkmark from '../public/green_checkmark.svg';
import circleX from '../public/circle_grey_letter-x.svg';
import styles from '../styles/State.module.scss';

export type StateProps = {
  state: StateEnum;
  finished?: boolean;
};
export function State({ state, finished = false }: StateProps): JSX.Element {
  const stateObj = OrderState.fromString(state);
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image
          src={finished ? checkmark : circleX}
          alt={finished ? 'checkmark' : 'gray x'}
          width={30}
          height={30}
          layout="fixed"
        />
      </div>
      {stateObj.toString()}
    </div>
  );
}
