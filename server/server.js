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
  {id: 0, name: "lalae", price: 100, category: "clothes", type: "shirts" },
  {id: 1, name: "vmklrmek", price:10, category: "clothes", type: "shirts"},
  {id: 2, name: "vnrjenverj", price:10, category: "clothes", type: "pants"},
  {id: 3, name: "vnruivne", price:2200, category: "clothes", type: "pants"},
  {id: 4, name: "flrpeforep", price:300, category: "clothes", type: "shoes"},
  {id: 5, name: "fnruigur", price:600, category: "clothes", type: "shoes"},
  {id: 6, name: "dbewifuwi", price:300, category: "clothes", type: "jackets"},
  {id: 7, name: "awfew", price:500, category: "clothes", type: "jackets"},
  {id: 8, name: "jfiweojfiwo", price:400, category: "accessories", type: "jewelry"},
  {id: 9, name: "feiwofjiwo", price:720, category: "accessories", type: "jewelry"},
  {id: 10, name: "mfieowfimow", price:2400, category: "accessories", type: "bags"},
  {id: 11, name: "fewq", price:240, category: "accessories", type: "bags"},
]

// add sale true or false
// var placeHolder = [
//   {id: 0, name: "test0"},
//   {id: 1, name: "test1"},
//   {id: 2, name: "test2"},
//   {id: 3, name: "test3"},
//   {id: 4, name: "test4"},
//   {id: 5, name: "test5"},
//   {id: 6, name: "test6"},
//   {id: 7, name: "test7"},
//   {id: 8, name: "test8"},
//   {id: 9, name: "test9"}
// ]
