import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import { getFoods, updateFoods, createFoods, deleteFoods } from "../api.js";
import FoodForm from "./FoodForm";
import useAsync from "../hooks/useAsync";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const [isLoading, loadingError, asyncGetFoods] = useAsync(getFoods);
  const [search, setSearch] = useState("");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = async (id) => {
    const result = await deleteFoods(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleLoad = async (options) => {
    let result = await asyncGetFoods(options);
    if (!result) return;

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
    await handleLoad({ order, cursor, search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const spliceId = items.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, spliceId),
        food,
        ...prevItems.slice(spliceId + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <div>
      <FoodForm onSubmitSuccess={handleCreateSuccess} onSubmit={createFoods} />
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateFoods}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
