import dotenv from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/config/db.js";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
