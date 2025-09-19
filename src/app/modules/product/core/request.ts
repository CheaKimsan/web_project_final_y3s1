    import axios from "axios";
    import { Product } from "./model";

    export const reqGetProducts = () => {
        return axios.get<Product[]>("http://localhost/index.php?resource=products");
    };

  export const reqAddProduct = (product: any) => {
  return axios.post("http://localhost/index.php?resource=products", {
    pro_name: product.pro_name,
    qty: product.qty,
    price: product.price,
    desc: product.desc,
    cate_id: product.cate_id,
    sup_id: product.sup_id ?? null,
    thumbnail: product.thumbnail ?? null
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const reqDeleteProduct = (id:number) => {
        return axios.delete(`http://localhost/index.php?resource=products&id=${id}`);
    };
export const reqUpdateProduct = (id:number, product: any) => {
  return axios.put(`http://localhost/index.php?resource=products&id=${id}`, {
    pro_name: product.pro_name,
    qty: product.qty,
    price: product.price,
    desc: product.desc,
    cate_id: product.cate_id,
    thumbnail: product.thumbnail ?? null
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
}