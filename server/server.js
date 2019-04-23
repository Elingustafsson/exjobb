const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())



app.get('/', (req, res) => res.send('Hello World!'))

//här ska alla routes ligga.
app.get('/products', (req, res) => {
  res.send(products);
})

app.get('/placeHolder', (req, res) => {
  res.send(placeHolder);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var products = [
  {id: 0, name: "ItemOne", price: 100, categoryType: "clothes", type: "shirts" },
  {id: 1, name: "ItemTwo", price:200}
]

var placeHolder = [
  {id: 0, name: "test0"},
  {id: 1, name: "test1"},
  {id: 2, name: "test2"},
  {id: 3, name: "test3"},
  {id: 4, name: "test4"},
  {id: 5, name: "test5"},
  {id: 6, name: "test6"},
  {id: 7, name: "test7"},
  {id: 8, name: "test8"},
  {id: 9, name: "test9"}
]
