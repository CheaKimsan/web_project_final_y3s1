import * as React from 'react';
import { BarChart } from '@mui/x-charts'; // ✅ correct import

// Sample dataset for shipping performance
const dataset = [
  { month: 'Jan', shipments: 120 },
  { month: 'Feb', shipments: 150 },
  { month: 'Mar', shipments: 100 },
  { month: 'Apr', shipments: 180 },
  { month: 'May', shipments: 200 },
  { month: 'Jun', shipments: 170 },
  { month: 'Jul', shipments: 190 },
  { month: 'Aug', shipments: 160 },
  { month: 'Sep', shipments: 140 },
  { month: 'Oct', shipments: 130 },
  { month: 'Nov', shipments: 110 },
  { month: 'Dec', shipments: 220 },
];

// ✅ valueFormatter accepts number | null
const valueFormatter = (value: number | null) =>
  value !== null ? `${value} shipments` : '';

// ✅ chart settings
const chartSetting = {
  yAxis: [
    {
      label: 'Shipments',
      width: 60,
    },
  ],
  series: [
    {
      dataKey: 'shipments',
      label: 'Monthly Shipments',
      valueFormatter,
    },
  ],
  height: 300,
  margin: { left: 0 },
};

const Graph = () => {
  return (
    <div className="card">
      <div className="card-headers">
        <h2>Shipping Performance</h2>
        <button className="btn-secondary">Monthly</button>
      </div>

      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: 'month',tickPlacement: 'middle' }]} 
        {...chartSetting}
      />
    </div>
  );
};

export default Graph;
