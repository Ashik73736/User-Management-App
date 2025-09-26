import axios from "axios";

const client = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

export default client;
