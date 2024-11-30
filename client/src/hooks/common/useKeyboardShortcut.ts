import { useEffect } from "react";

export function useKeyboardShortcut(key: string, callback: () => void, withCtrl: boolean = false) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key && (!withCtrl || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [key, callback, withCtrl]);
}
