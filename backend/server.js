const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const usersRouter = require("./routes/users");
const costsRouter = require("./routes/costs");
const PORT = process.env.PORT || 5010;
const app = express();

app.use(express.json());
connectDB();
app.use("/users", usersRouter);
app.use("/costs", costsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running. Listening on port ${PORT}`);
});
