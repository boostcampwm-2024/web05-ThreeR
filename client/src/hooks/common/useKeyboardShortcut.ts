import { useEffect } from "react";

export function useKeyboardShortcut(key: string, callback: () => void, withCtrl: boolean = false) {
  useEffect(() => {
    let isComposing = false;

    const handleCompositionStart = () => {
      isComposing = true;
    };

    const handleCompositionEnd = () => {
      isComposing = false;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isComposing && e.key === key && (!withCtrl || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("compositionstart", handleCompositionStart);
    window.addEventListener("compositionend", handleCompositionEnd);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("compositionstart", handleCompositionStart);
      window.removeEventListener("compositionend", handleCompositionEnd);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [key, callback, withCtrl]);
}
