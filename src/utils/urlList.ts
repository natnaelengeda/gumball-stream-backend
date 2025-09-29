const isProduction = process.env.NODE_ENV === "production";

export const UrlList = isProduction
  ? [
    "https://gumball-streaming.vercel.app",
  ]
  : [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://192.168.1.4:5174",
    "https://192.168.0.118:5173"
  ]; // accept all in development