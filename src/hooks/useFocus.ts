import { useEffect, useState, useRef } from "react";
export const useFocus = (callback: () => void) => {
  const [isFocused, setIsFocused] = useState<boolean>(document.hasFocus());
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
      callbackRef.current();
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    if (document.hasFocus()) {
      setTimeout(() => {
        callbackRef.current();
      }, 0);
    }

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return { isFocused };
};

export default useFocus;
