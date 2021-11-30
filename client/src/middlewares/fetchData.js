// import axios from 'axios';

// export const fetchData = async whatToFetch => {
//     axios({
//       method: 'get',
//       url: `/${whatToFetch}/fetch`,
//       headers: {
//           'Content-Type': 'application/json',
//           'x-access-token' : localStorage.getItem('userToken')
//       },
//   }).then(res => {
//     res.data.map((row) => {
//       row['id'] = row.reservationId;
//       return res.data;
//     })
//   }).catch(err => {
//     console.log(err);
//   })
//   }