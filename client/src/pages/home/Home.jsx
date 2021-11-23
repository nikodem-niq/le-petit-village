import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    axios({
      method: 'get',
      url: `/articles/fetch`,
      headers: {
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('userToken')
      },
  }).then(res => {
    setLoading(true);
    res.data.map((row) => {
      row['id'] = row.articleId;
      row.date = moment(row.date).format('L')
    })
    setLoading(false);
    setData(res.data);
    setLoading(false);
  }).catch(err => {
    console.log(err);
  })
}


useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Topbar/>
    <div style={{display: 'flex'}}>
      <Sidebar activeDashboard/>
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="Views Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
      </div>
    </div>
    </div>
    </div>
  );
}

export default Home;
