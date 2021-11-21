import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import FadingBalls from "react-cssfx-loading/lib/FadingBalls";

const FeaturedInfo = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [latestPostViews, setLatestPostViews] = useState(0);
  const [allPostsViews, setAllPostsViews] = useState(0);
  const [amountOfPosts, setAmountOfPosts] = useState(0);

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
      setLatestPostViews(res.data[res.data.length-1].views);
      const getViewsOfAllPosts = () => {
        let views = 0;
        for(let i=0; i<res.data.length; i++) {
          views += res.data[i].views;
        }
        setAllPostsViews(views);
      }
      getViewsOfAllPosts();
      setAmountOfPosts(res.data.length)
      setLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }


  useEffect(() => {
      setLoading(true);
      fetchData();

    }, [])


    if(isLoading || !data) {
      return (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><FadingBalls color="#3a43cc" width="20px" height="20px" duration="2s" /></div>
      )
  } else {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Views (latest post)</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{latestPostViews}</span>
          <span className="featuredMoneyRate">
            {/* -11.4 <ArrowDownward  className="featuredIcon negative"/> */}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Views (all posts)</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{allPostsViews}</span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative"/> */}
          </span>
        </div>
        <span className="featuredSub"></span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Amount of all posts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{amountOfPosts}</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon"/> */}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  )};
}

export default FeaturedInfo;