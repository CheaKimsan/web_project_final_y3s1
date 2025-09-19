import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
} from 'recharts';

const CustomerSatisfaction: React.FC = () => {
  const totalReviews = 960;

  const data = [
    { name: 'Satisfied', value: 75 },
    { name: 'Neutral', value: 15 },
    { name: 'Dissatisfied', value: 10 },
  ];

  const COLORS = ['#4263eb', '#d8d8d8', '#e53e3e'];

  return (
    <div
      className="card"
    >
      <div className="card-headers" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Customer Satisfaction</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pie Chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}

            {/* Center Label */}
            <Label
              value={`${totalReviews} REVIEWS`}
              position="center"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Legend */}
        <div style={{ marginTop: '15px', width: '100%' }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: COLORS[index],
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: 6,
                  }}
                ></span>
                {item.name}
              </div>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
