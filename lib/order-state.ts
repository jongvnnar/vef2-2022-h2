import { StateEnum, StateNameEnum } from "../types/state";

/**
 * Class to handle possible state order can be in
 */
export class OrderState {
  static new = new OrderState(0);

  static prepare = new OrderState(1);

  static cooking = new OrderState(2);

  static ready = new OrderState(3);

  static finished = new OrderState(4);
  private val: number;

  constructor(val: number) {
    if (val < 5 && val >= 0) {
      this.val = val;
      return;
    }
    throw new Error("Attempt to initialize to unauthorized state");
  }

  /**
   * Returns state name
   */
  get name() {
    switch (this.val) {
      case 0:
        return StateEnum.new;
      case 1:
        return StateEnum.prepare;
      case 2:
        return StateEnum.cooking;
      case 3:
        return StateEnum.ready;
      case 4:
        return StateEnum.finished;
      default:
        throw new Error("Unauthorized state");
    }
  }

  /**
   * Return OrderState for each possible state
   * @param {string} name "NEW" | "PREPARE" | "COOKING" | "READY" | "FINISHED"
   * @returns OrderState instance for possible state
   */
  static fromString(name: StateEnum) {
    switch (name) {
      case StateEnum.new:
        return OrderState.new;
      case StateEnum.prepare:
        return OrderState.prepare;
      case StateEnum.cooking:
        return OrderState.cooking;
      case StateEnum.ready:
        return OrderState.ready;
      case StateEnum.finished:
        return OrderState.finished;
      default:
        throw new Error("Unauthorized state");
    }
  }

  toString(): StateNameEnum {
    switch (this.val) {
      case 0:
        return StateNameEnum.new;
      case 1:
        return StateNameEnum.prepare;
      case 2:
        return StateNameEnum.cooking;
      case 3:
        return StateNameEnum.ready;
      case 4:
        return StateNameEnum.finished;
      default:
        throw new Error("Unauthorized state");
    }
  }

  /**
   * Get next state from current one.
   * @returns next possible state
   */
  getNextState() {
    switch (this.val) {
      case 0:
        return OrderState.prepare;
      case 1:
        return OrderState.cooking;
      case 2:
        return OrderState.ready;
      case 3:
        return OrderState.finished;
      default:
        throw new Error("Attempt to reach unauthorized state");
    }
  }
}
