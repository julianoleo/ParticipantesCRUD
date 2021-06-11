import axios from "axios";

export default axios.create({
  baseURL: "https://leilao-rest-api.herokuapp.com/",
  //baseURL: "http://localhost:4000/",
  headers: {
    "Content-type": "application/json"
  }
});