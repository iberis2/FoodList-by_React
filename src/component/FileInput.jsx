import { useRef } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef(null);

  const onInputChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue, nextValue.type);
  };

  const handleClearClick = () => {
    if (!inputRef.current) return;

    inputRef.current.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <input ref={inputRef} type="file" onChange={onInputChange} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
