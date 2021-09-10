const express = require('express')
const app = express()
const port = 3000

// Routes importing
const cases = require("./routes/cases");
// const history = require("./routes/history");

// Routing
app.use("/cases",cases);
// app.use("//history",history);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})