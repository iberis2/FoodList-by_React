import { useState } from "react";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  const changeNumber = (type, value) => {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((preValues) => {
      return { ...preValues, [name]: changeNumber(type, value) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input
        name="title"
        value={values.title}
        type="text"
        onChange={handleChange}
      ></input>
      <input
        name="calorie"
        value={values.calorie}
        type="number"
        onChange={handleChange}
      ></input>
      <input
        name="content"
        value={values.content}
        type="textarea"
        onChange={handleChange}
      ></input>
      <button onSubmit={handleSubmit}> 확인 </button>
    </form>
  );
}

export default FoodForm;
