import app from "./app.js";
import { connectDB, sequelize } from "./config/db.js";
// import { formatPrice } from "./utils/formatPrice.js";
import dotenv from "dotenv";

dotenv.config();


const PORT = process.env.PORT || 3000;

await connectDB();

// console.log(formatPrice(25000)); // 25 000 ₸

sequelize.sync({ after: true }).then(() => {
  console.log(" Database synced ");
  app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)
  );
});