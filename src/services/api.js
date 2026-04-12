const BASE_URL = "https://dummyjson.com";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.products;
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};