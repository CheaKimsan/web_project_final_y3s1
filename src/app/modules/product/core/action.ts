import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { reqAddProduct, reqDeleteProduct, reqGetProducts, reqUpdateProduct } from "./request";
import { setProducts } from "./reducer";
import Swal from "sweetalert2";

const useProduct = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await reqGetProducts();
      dispatch(setProducts(response.data));
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  const addProduct = async (product: any) => {
    try {
      await reqAddProduct(product);
      await fetchProducts();
      await Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "The product has been added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error("Failed to add product", err);
      await Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text: err.response?.data?.message || err.message || "Something went wrong",
      });
    }
  };

  const onDeleteProduct = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        reqDeleteProduct(id)
            .then(() => {
              fetchProducts();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The product has been deleted successfully.",
                timer: 2000,
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || err.message || "Failed to delete product",
              });
            });
      }
    });
  };

  const updateProduct = async (id: number, product: any) => {
    try {
      // Ensure all required fields are present
      const payload = {
        pro_name: product.pro_name || '',
        qty: product.qty || 0,
        price: product.price || 0,
        desc: product.desc || '',
        cate_id: product.cate_id || '',
        image: product.image || null,
        sup_id: product.sup_id || null,
      };

      // Validate required fields
      if (!payload.pro_name || !payload.cate_id || !payload.price || !payload.qty || !payload.desc) {
        throw new Error("Missing required fields: pro_name, cate_id, price, qty, or desc");
      }

      await reqUpdateProduct(id, payload);
      await fetchProducts();

      await Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "The product has been updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error("Failed to update product", err);
      await Swal.fire({
        icon: "error",
        title: "Failed to Update Product",
        text: err.response?.data?.message || err.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, fetchProducts, addProduct, onDeleteProduct, updateProduct };
};

export { useProduct };