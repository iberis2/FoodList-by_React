export async function getFoods(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(`https://learn.codeit.kr/1974/foods?${query}`);
  const body = response.json();
  return body;
}

//