import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {reqAddCategory, reqDeleteCategory, reqGetCategories, reqUpdateCategory} from "./request";
import { setCategories } from "./reducer";
import Swal from "sweetalert2";

const  useCategory = () => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);


    const fetchCategories = async () => {
        try{
            setLoading(true);
            const response = await reqGetCategories();
            dispatch(setCategories(response.data));
            console.log(response.data);
            setLoading(false);   
        }
        catch(error:any){
            setError(error.message || "Failed to fetch categories");
            setLoading(false);
        }
    };
    const addCategory  = async (category: any) => {
        try {
            await reqAddCategory(category);
            await fetchCategories();
            await Swal.fire({
                icon: "success",
                title: "Category Added",
                text: "Category has been added successfully!",
                timer: 2000,
                showConfirmButton: false,
            });
        }
        catch (err: any) {
            console.error("Failed to add Category", err);
            await Swal.fire({
                icon: "error",
                title: "Failed to Add Product",
                text: err.response?.data?.message || err.message || "Something went wrong",
            });
        }
    }

    const onDeleteCategory = (id: number) => {
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
                reqDeleteCategory(id)
                    .then(() => {
                        fetchCategories();
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


    const updateCategory = async (id: number, category: any) => {
        try {
            await reqUpdateCategory(id, category);
            await fetchCategories();
            await Swal.fire({
                icon: "success",
                title: "Category Updated",
                text: "The Category has been updated successfully!",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err: any) {
            console.error("Failed to update category", err);
            await Swal.fire({
                icon: "error",
                title: "Failed to Update Product",
                text: err.response?.data?.message || err.message || "Something went wrong",
            });
        }
    }
    return { categories, loading ,error, navigate,addCategory ,updateCategory,onDeleteCategory};
};
export default useCategory;