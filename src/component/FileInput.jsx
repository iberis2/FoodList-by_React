import { useRef, useEffect, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState("");
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

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        ref={inputRef}
        type="file"
        onChange={onInputChange}
        accept="image/png, image/jpeg"
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
