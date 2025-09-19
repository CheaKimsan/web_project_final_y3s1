import axios from "axios";
import { Category } from "./model";

export const reqGetCategories = () => {
  return axios.get<Category[]>("http://localhost/index.php?resource=categories");
};
export const reqAddCategory = (category: any) => {
  return axios.post("http://localhost/index.php?resource=categories", {
    name : category.name,
    description : category.description,
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const reqDeleteCategory = (id:number) => {
  return axios.delete(`http://localhost/index.php?resource=categories&id=${id}`);
};

export const reqUpdateCategory = (id:number, category: any) => {
  return axios.put(`http://localhost/index.php?resource=categories&id=${id}`, {
    name: category.name,
    description: category.description ?? null

  }, {
    headers: { 'Content-Type': 'application/json' }
  });
}


