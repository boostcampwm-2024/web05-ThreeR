import { useEffect, useState } from "react";

export function useKeyboardShortcut(key: string, callback: () => void, withCtrl: boolean = false) {
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    const handleKeydown = (e: KeyboardEvent) => {
      if (!isComposing && e.key === key && (!withCtrl || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("compositionstart", handleCompositionStart);
    window.addEventListener("compositionend", handleCompositionEnd);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("compositionstart", handleCompositionStart);
      window.removeEventListener("compositionend", handleCompositionEnd);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [key, callback, withCtrl, isComposing]);
}
