const dev = process.env.NODE_ENV === "development";
const baseUrl = dev ? "http://localhost" : "";

export {
  dev,
  baseUrl
};