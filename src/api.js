const BASE_URL = "https://learn.codeit.kr/2233";

export async function getFoods({
  order = "",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/foods?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function createFoods(formData) {
  const response = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 전송하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function updateFoods(id, formData) {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteFoods(id) {
  const response = await fetch(`${BASE_URL}/foods/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("데이터를 삭제하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
