import Graph from "./components/Graph";
import Shipping from "./components/Shipping";
import StockAvailability from "./components/StockAvailability";
import Statifaction from "./components/CustomerStatisfaction";

const Dashboard = () => {
    return (
        <div className="row g-3 flex-wrap">
            <div className="col-12 col-lg-8">
                <Shipping  />
            </div>
            <div className="col-12 col-lg-4">
                <StockAvailability  />
            </div>
            <div className="col-12 col-lg-8">
                <Graph  />
            </div>
            <div className="col-12 col-lg-4">
                <Statifaction  />
            </div>
        </div>
    );
}

export default Dashboard;
