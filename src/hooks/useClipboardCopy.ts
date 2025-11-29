import { useCallback, useRef, useState } from "react";

const useClipboardCopy = () => {
  const timeoutRef = useRef<number>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string, delay = 2000) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        timeoutRef.current = null;
      }, delay);
    } catch (error) {
      console.log(error);
      setIsCopied(false);
    }
  }, []);

  return { isCopied, copy };
};

export default useClipboardCopy;
