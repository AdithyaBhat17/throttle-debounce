import type { Callback } from "./debounce";

export function throttle<T extends Callback>(cb: T, wait: number) {
  let isThrottled: boolean;
  let args: IArguments | null;

  function throttled() {
    if (isThrottled) {
      args = arguments;
      return;
    }

    isThrottled = true;
    cb(arguments);

    setTimeout(() => {
      isThrottled = false;
      // execute the last trailing event that occured before the wait period.
      if (args) {
        cb(args);
        args = null;
      }
    }, wait);
  }

  return throttled;
}
