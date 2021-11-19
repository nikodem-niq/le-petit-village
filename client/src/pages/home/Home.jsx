import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Topbar/>
    <div style={{display: 'flex'}}>
      <Sidebar activeDashboard/>
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
      </div>
    </div>
    </div>
    </div>
  );
}
