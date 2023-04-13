import { useState } from "react";
import FileInput from "./FileInput.jsx";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
  });

  const changeNumber = (type, value) => {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  };

  const handleChange = (name, value, type = "text") => {
    setValues((preValues) => {
      return { ...preValues, [name]: changeNumber(type, value) };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        type="text"
        onChange={handleInputChange}
      ></input>
      <input
        name="calorie"
        value={values.calorie}
        type="number"
        onChange={handleInputChange}
      ></input>
      <input
        name="content"
        value={values.content}
        type="textarea"
        onChange={handleInputChange}
      ></input>
      <button onSubmit={handleSubmit}> 확인 </button>
    </form>
  );
}

export default FoodForm;
