import React from "react";
import { Category } from "../core/model";
import { Categories } from "../../../../_stock_management/constants/Category";
import {PencilSquare, Trash} from "react-bootstrap-icons";

interface CateTableProps {
    categories: Category[];
}
const CateTable: React.FC<CateTableProps> = ({ categories }) => {
    return <>
        <div className='table-responsive'>
            <table className='table align-middle table-hover'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Categories.map((cate, index) => (
                            <tr key={cate.id}>
                                <td>{cate.id}</td>
                                <td>{cate.name}</td>
                                <td>{cate.description}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-1">
                                        <PencilSquare/> Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <Trash/> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>
}
export default CateTable;