import {PencilSquare, Trash} from "react-bootstrap-icons";
import React from "react";

const roleTable = () =>{
    return (
        <div className='table-responsive'>
            <table className='table align-middle table-hover'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Role</th>
                    <th>Permission</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}
export default roleTable;