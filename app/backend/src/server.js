import app from "./app.js"
import dotenv from "dotenv";

const PORT = process.env.BACKEND_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
