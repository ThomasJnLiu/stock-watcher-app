import axios from "axios";

export default axios.create({
  baseURL: "https://stock-watcher-app-edfee-default-rtdb.firebaseio.com/",
});
