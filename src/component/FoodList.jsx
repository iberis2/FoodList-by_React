import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt, id } = item;
  const handleDeleteClick = () => onDelete(id);
  const handleEditClick = () => onEdit(id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{`${calorie}kcal`}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleDeleteClick}>삭제</button>
      <button onClick={handleEditClick}>수정</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, title, calorie, content, imgUrl } = item;
          const initialValues = { title, calorie, content };

          const handleUpdate = (formData) => onUpdate(id, formData);
          const handleUpdateSuccess = (food) => {
            setEditingId(null);
            onUpdateSuccess(food);
          };

          return (
            <li key={item.id}>
              <FoodForm
                onCancel={handleCancel}
                initialPreview={imgUrl}
                initialValues={initialValues}
                onSubmit={handleUpdate}
                onSubmitSuccess={handleUpdateSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
