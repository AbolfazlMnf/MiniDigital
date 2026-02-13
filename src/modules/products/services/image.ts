export const UploadImageApi = async (formdata: FormData) => {
  const res = await fetch("/api/image", {
    method: "post",
    body: formdata,
  });
  const data = await res.json();
  if (data) return data;
};
export const fetchImage = async (productId: string) => {
  const res = await fetch(`/api/image?productId=${productId}`);
  const data = await res.json();
  if (data) return data;
};
export const DeleteImage = async (imageId: string) => {
  const res = await fetch(`/api/image?imageId=${imageId}`, {
    method: "DELETE",
  });
  const data = res.json;
  if (data) return data;
};
