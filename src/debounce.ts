type Callback = (...args: any[]) => void | Promise<void>;

export function debounce<T extends Callback>(cb: T, wait: number) {
  let timeout: NodeJS.Timeout;
  // return a function that is triggered only after the user events are finished.
  // every time this function is called (i.e user triggers an event, a new timeout is created.)
  // this delays the execution of cb until the user is idle for ${wait} milliseconds.
  function debounced(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  }

  return debounced;
}
