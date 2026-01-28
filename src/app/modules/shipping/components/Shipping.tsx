import React from "react";
import { useProduct } from "../../product/core/action";
import '../../../../_stock_management/assets/scss/Dashboard.scss'


const Shipping = () => {
  const { products } = useProduct();
  return (
    <div className="card">
      <div className="card-headers">
        <h2>Shipping Performance</h2>
        <button className="btn-secondary">Monthly</button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name.toUpperCase()}</td>
                <td>{item.category_name}</td>
                <td>{item.quantity}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>
                  <span className="status status-on-delivery">{item.status}</span>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipping;
