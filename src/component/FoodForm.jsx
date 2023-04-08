import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState("");

  return (
    <form>
      <input
        name="title"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        name="calorie"
        value={calorie}
        type="number"
        onChange={(e) => setCalorie(e.target.value)}
      ></input>
      <input
        name="content"
        value={content}
        type="textarea"
        onChange={(e) => setContent(e.target.value)}
      ></input>
    </form>
  );
}

export default FoodForm;
