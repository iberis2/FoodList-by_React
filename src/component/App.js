import FoodList from "./FoodList";
import originItems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(originItems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleNewestClick = () => {
    setOrder("createdAt");
  };
  const handleCalorieClick = () => {
    setOrder("calorie");
  };

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
