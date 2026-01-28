import React from 'react';
import { useProduct } from '../../product/core/action';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
} from 'recharts';

type StockItem = {
  name: string;
  units: number;
  status: 'In Stock' | 'Minimum' | 'Out of stock';
};

// Map statuses to colors
const statusColorMap: Record<StockItem['status'], string> = {
  'In Stock': '#4263eb',       
  'Minimum': '#d69e2e',       
  'Out of stock': '#e53e3e',   
};

const CustomerSatisfaction: React.FC = () => {
  const { products } = useProduct();

  const stockData: StockItem[] = products
    .map(product => {
      const units = typeof product.quantity === 'number' ? product.quantity : parseInt(product.quantity, 10) || 0;
      let status: StockItem['status'];
      if (units >= 100) {
        status = 'In Stock';
      } else if (units > 0) {
        status = 'Minimum';
      } else {
        status = 'Out of stock';
      }
      return {
        name: product.name || 'Unknown',
        units,
        status,
      };
    })
    .filter(item => item.units >= 0);

  // Calculate total units
  const totalUnits = stockData.reduce((sum, item) => sum + item.units, 0);

  // Group units by status and calculate percentages
  const statusTotals: Record<StockItem['status'], number> = {
    'In Stock': 0,
    'Minimum': 0,
    'Out of stock': 0,
  };

  stockData.forEach(item => {
    statusTotals[item.status] += item.units;
  });

  const pieData = Object.entries(statusTotals).map(([status, value]) => ({
    name: status,
    value: totalUnits > 0 ? (value / totalUnits) * 100 : 0, // Percentage
  }));

  return (
    <div className="card">
      <div className="card-headers" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Stock Availability Distribution</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pie Chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={statusColorMap[entry.name as StockItem['status']]} />
            ))}

            {/* Center Label */}
            <Label
              value={`${totalUnits} UNITS`}
              position="center"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            />
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        </PieChart>

        {/* Legend */}
        <div style={{ marginTop: '15px', width: '100%' }}>
          {pieData.map((item, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: statusColorMap[item.name as StockItem['status']],
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: 6,
                  }}
                ></span>
                {item.name}
              </div>
              <span>{item.value.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;