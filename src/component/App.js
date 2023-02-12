import FoodList from "./FoodList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");

  const option = items.sort((a, b) => b[order] - a[order]);

  const orderCreatedAt = () => {
    setOrder("createdAt");
  };
  const orderCalorie = () => {
    setOrder("calorie");
  };

  return (
    <div>
      <button onClick={orderCreatedAt}>최신순</button>
      <button onClick={orderCalorie}>칼로리순</button>
      <FoodList items={option} />
    </div>
  );
}

export default App;
