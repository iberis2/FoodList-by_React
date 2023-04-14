import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [Error, setError] = useState(null);

  const wrappedFunction = async (...arg) => {
    try {
      setPending(true);
      setError(null);
      return await asyncFunction(...arg);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, Error, wrappedFunction];
}

export default useAsync;
