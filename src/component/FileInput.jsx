function FileInput({ name, value, onChange }) {
  const onInputChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue, nextValue.type);
  };
  return (
    <div>
      <input type="file" onChange={onInputChange} />
    </div>
  );
}

export default FileInput;
