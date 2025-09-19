// CateTable.tsx
import React, {useState} from "react";
import { Category } from "../core/model";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import useCategory from "../core/action";
import FormCategory from "./FormCategory";

interface CateTableProps {
  category: Category[];
}

const CateTable: React.FC<CateTableProps> = ({category}) => {
    const { categories,onDeleteCategory } = useCategory();
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [showModal, setShowModal] = useState(false);
    const handleEditClick = (category : Category) => {
      setEditCategory(category);
      setShowModal(true);
    };

  return (
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
          {categories.map((cate) => (
            <tr key={cate.id}>
              <td>{cate.id}</td>
              <td>{cate.name}</td>
              <td>{cate.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditClick(cate)}>
                  <PencilSquare /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDeleteCategory(cate.id)}>
                  <Trash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormCategory
          show={showModal}
          handleClose={() => setShowModal(false)}
          mode={editCategory ? 'edit' : 'add'}
          category={editCategory ?? undefined}
      />
    </div>
  );
};

export default CateTable;
