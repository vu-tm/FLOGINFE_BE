// src/services/productService.js
import api from "./api";

//read products
export async function getProducts() {
  const response = await api.get("/products");
  return response.data;
}

//xem chi tieet sp
export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}
// create product
export async function createProduct(productData) {
  const response = await api.post("/products", productData);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  //thuong cai nay se tra ve du lieu rong hoac 1 thong bao da xoa thanh cong
  return response.data;
}

//ham update can id, va du lieu moi
export async function updateProduct(id, productData) {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
}
