import axios from "axios";
import { Product } from "./model";

const API_BASE = "http://localhost/index.php?resource=products";

export const reqGetProducts = () => {
  return axios.get<Product[]>(API_BASE);
};

export const reqAddProduct = (product: any) => {
  const formData = new FormData();
  formData.append("pro_name", product.pro_name);
  formData.append("qty", String(product.qty));
  formData.append("price", String(product.price));
  formData.append("desc", product.desc);
  formData.append("cate_id", String(product.cate_id));
  if (product.sup_id) formData.append("sup_id", String(product.sup_id));
  if (product.thumbnail instanceof File) {
    formData.append("thumbnail", product.thumbnail);
  }

  return axios.post(API_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const reqUpdateProduct = (id: number, product: any) => {
  if (product.thumbnail instanceof File) {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("pro_name", product.pro_name);
    formData.append("cate_id", String(product.cate_id));
    formData.append("price", String(product.price));
    formData.append("qty", String(product.qty));
    formData.append("desc", product.desc);
    formData.append("thumbnail", product.thumbnail);

    return axios.post(`${API_BASE}&id=${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return axios.put(`${API_BASE}&id=${id}`, {
      pro_name: product.pro_name,
      cate_id: product.cate_id,
      price: product.price,
      qty: product.qty,
      desc: product.desc,
    }, {
      headers: { "Content-Type": "application/json" },
    });
  }
};



export const reqDeleteProduct = (id: number) => {
  return axios.delete(`${API_BASE}&id=${id}`);
};

