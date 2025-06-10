import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
