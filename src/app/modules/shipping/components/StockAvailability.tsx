import React from 'react';

type StockItem = {
    name: string;
    units: number;
    status: 'In Stock' | 'Minimum' | 'Out of stock';
};

const stockData: StockItem[] = [
    { name: 'Surgical', units: 800, status: 'In Stock' },
    { name: 'Medicine', units: 0, status: 'Minimum' },
    { name: 'Equipment', units: 0, status: 'Out of stock' },
];

// Map statuses to CSS classes
const statusClassMap: Record<StockItem['status'], string> = {
    'In Stock': 'status-in-stock',
    'Minimum': 'status-minimum',
    'Out of stock': 'status-out-of-stock',
};

// Map statuses to colors
const statusColorMap: Record<StockItem['status'], string> = {
    'In Stock': '#4263eb',       // blue
    'Minimum': '#d69e2e',        // yellow
    'Out of stock': '#e53e3e',   // red
};

const StockAvailability: React.FC = () => {
    const totalUnits = stockData.reduce((sum, item) => sum + item.units, 0);

    // Group units by status
    const statusTotals: Record<StockItem['status'], number> = {
        'In Stock': 0,
        'Minimum': 0,
        'Out of stock': 0,
    };

    stockData.forEach(item => {
        statusTotals[item.status] += item.units;
    });

    return (
        <div className="card">
            <div className="card-headers">
                <h2>Stock Availability</h2>
                <div>
                    <button className="btn-secondary">Sort by</button>
                    <button className="btn-secondary filter-btn">Filter</button>
                </div>
            </div>

            <div className="stock-level">
                <div className="stock-info">
                    <span className="stock-count">{totalUnits}</span>
                    <p>Current Stock Level</p>
                </div>
                <button className="btn btn-primary customize-font">View Full Stock Report</button>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
                {(['In Stock', 'Minimum', 'Out of stock'] as StockItem['status'][]).map(status => {
                    const percent = totalUnits > 0 ? (statusTotals[status] / totalUnits) * 100 : 0;
                    return (
                        <div
                            key={status}
                            className="progress-segment"
                            style={{
                                width: `${percent}%`,
                                backgroundColor: statusColorMap[status],
                            }}
                        />
                    );
                })}
            </div>

            {/* Legend */}
            <div className="legend">
                <span><span className="dot available"></span> Available</span>
                <span><span className="dot low-stock"></span> Low Stock</span>
                <span><span className="dot out-of-stock"></span> Out of Stock</span>
            </div>

            {/* Stock items list */}
            <div className="stock-items">
                {stockData.map(item => (
                    <div className="stock-item" key={item.name}>
                        <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-units">{item.units} Unit</p>
                        </div>
                        <span className={statusClassMap[item.status]}>{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockAvailability;
