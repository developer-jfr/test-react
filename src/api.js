import axios from 'axios'
console.log(process.env.REACT_APP_YT_API_KEY)
const request = axios.create({
   baseURL: 'https://youtube.googleapis.com/youtube/v3/',
   params: {
      key: "AIzaSyAAA2DlI1KHdKC1NZg4N-SlQjY0AgRjfkk",
   },
})


export const authAPI = {
   signUp(username, email, password) {
     return axios.post(
       "https://trello.backend.tests.nekidaem.ru/api/v1/users/create/",
       { username, email, password }
     );
   },
   login(username, password) {
     return axios.post(
       `https://trello.backend.tests.nekidaem.ru/api/v1/users/login/`,
       { username, password }
     );
   },
 };

export default request
