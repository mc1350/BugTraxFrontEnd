import axios from "axios";

// export function getAppURL() {
//   return (
//     "http://localhost:8080/api"
//   )
// }
export function getAppURL() {
  // console.log('location: ' + window.location.href);
   if (window.location.href.toLowerCase().indexOf('localhost') > -1) {
       return '/api/WS/'//can do this with proxy set in package.json
   }
   else {
       return '../api/WS/';
   }
}
