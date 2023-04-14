import { useState } from "react";
import FileInput from "./FileInput.jsx";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function FoodForm({
  onSubmit,
  onSubmitSuccess,
  onCancel,
  initialValues = INITIAL_VALUES,
  initialPreview,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    let result;
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
    const { food } = await result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(food);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input
        name="title"
        value={values.title}
        type="text"
        onChange={handleInputChange}
        placeholder="이름을 입력하세요"
      ></input>
      <input
        name="calorie"
        value={values.calorie}
        type="number"
        placeholder="칼로리(숫자)를 입력하세요"
        onChange={handleInputChange}
      ></input>
      <input
        name="content"
        value={values.content}
        type="textarea"
        placeholder="기준 용량을 입력하세요"
        onChange={handleInputChange}
      ></input>
      <button onSubmit={handleSubmit} disabled={isSubmitting}>
        {" "}
        확인{" "}
      </button>
      {onCancel && <button onClick={onCancel}> 취소 </button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;
