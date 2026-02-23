export const GetProductApi = async () => {
  const result = await fetch("/api/products");
  const response = await result.json();
  console.log(response);

  return response;
};
