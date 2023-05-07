import { useEffect } from "react";

function useKeyPress(targetKey, callback) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === targetKey) {
        callback();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
}

export default useKeyPress;
