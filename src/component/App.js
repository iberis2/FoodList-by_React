import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import { getFoods } from "../api.js";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleLoad = async (options) => {
    const {
      foods,
      paging: { nextCursor },
    } = await getFoods(options);
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, cursor });
  };

  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
