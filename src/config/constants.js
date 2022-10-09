//constants.js
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://project5-sever.herokuapp.com"
    : "http://localhost:8080";
