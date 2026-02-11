export const GetProductApi = async () => {
  const result = await fetch("/api/products");
  const response = await result.json();

  return response;
};
