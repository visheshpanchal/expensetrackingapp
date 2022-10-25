import axios from "axios";

axios.defaults.headers.common["token"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";

export default axios;
