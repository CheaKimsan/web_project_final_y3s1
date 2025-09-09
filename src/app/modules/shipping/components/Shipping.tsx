import React from "react";
import "../../../../_stock_management/assets/scss/Dashboard.scss";
const shippingData = [
  { id: '#TD805784', flag: '🇺🇸', destination: 'USA', customer: 'Wade Warren', time: '2-3 days', cost: 50.00, status: 'On Delivery' },
  { id: '#TD8057825', flag: '🇨🇦', destination: 'Canada', customer: 'Jenny Wilson', time: '3-5 days', cost: 70.00, status: 'On Delivery' },
  { id: '#TD8057826', flag: '🇩🇪', destination: 'German', customer: 'Robert Fox', time: '5-7 days', cost: 70.00, status: 'On Delivery' },
  { id: '#TD8057827', flag: '🇷🇺', destination: 'Russia', customer: 'Cody Fisher', time: '6-9 days', cost: 50.00, status: 'On Delivery' },
  { id: '#TD8057829', flag: '🇦🇹', destination: 'Austria', customer: 'Albert Flores', time: '9-10 days', cost: 70.00, status: 'On Delivery' },
];
const Shipping = () => {
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
              <th>Tracking ID</th>
              <th>Destination</th>
              <th>Customer</th>
              <th>Delivery Time</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shippingData.map((item) => (
              <tr key={item.id}>
                <td >{item.id}</td>
                <td>{item.flag} {item.destination}</td>
                <td>{item.customer}</td>
                <td>{item.time}</td>
                <td>${item.cost.toFixed(2)}</td>
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
