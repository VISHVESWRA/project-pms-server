import dotenv from "dotenv";
import app from "./src/app";
import connectDb from "./src/config/db";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
