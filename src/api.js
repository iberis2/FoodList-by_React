export async function getFoods() {
  const response = await fetch("https://learn.codeit.kr/1974/foods/");
  const body = response.json();
  return body;
}

//
