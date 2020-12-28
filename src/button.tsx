import * as React from "react";
import { throttle } from "./throttle";

export default function ThrottleDemo() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount((count) => count + 1);
  }

  const throttledFn = React.useMemo(() => throttle(increment, 2000), []);

  function reset() {
    setCount(0);
  }

  return (
    <>
      <button onClick={throttledFn}>increment</button>
      <button onClick={reset}>reset</button>

      <p>Count = {count}</p>
    </>
  );
}
