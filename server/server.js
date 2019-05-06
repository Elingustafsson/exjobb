const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3001


app.use('/images', express.static(path.join(__dirname, 'images')));

console.log(__dirname + '\\images');

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
  {id: 0, name: "String Waist Sweat", price: 100, category: "clothes", type: "shirts", description: "lalalal här är en beskrivning", img: '/images/shirts01.jpg'},
  {id: 1, name: "Oversized hoodie", price:10, category: "clothes", type: "shirts", description: "lalalal här är en beskrivning", img: '/images/shirts02.jpg'},
  {id: 2, name: "Straight Crepe Pant", price:10, category: "clothes", type: "pants", description: "lalalal här är en beskrivning", img: '/images/pants01.jpg'},
  {id: 3, name: "Dressed PU Pants", price:2200, category: "clothes", type: "pants", description: "lalalal här är en beskrivning", img: '/images/pants02.jpg'},
  {id: 4, name: "Perfect Sneaker", price:300, category: "clothes", type: "shoes", description: "lalalal här är en beskrivning", img: '/images/shoes01.jpg'},
  {id: 5, name: "Braided Plateau Heel", price:600, category: "clothes", type: "shoes", description: "lalalal här är en beskrivning", img: '/images/shoes02.jpg'},
  {id: 6, name: "VISHOW DENIM JACKET - NOOS", price:300, category: "clothes", type: "jackets", description: "lalalal här är en beskrivning", img: '/images/jackets01.jpg'},
  {id: 7, name: "onlAVA FAUX LEATHER BIKER OTW NOOS", price:500, category: "clothes", type: "jackets", description: "lalalal här är en beskrivning", img: '/images/jackets02.jpg'},
  {id: 8, name: "Work Of Art Earrings", price:400, category: "accessories", type: "jewelry", description: "lalalal här är en beskrivning", img: '/images/jewelry01.jpg'},
  {id: 9, name: "Coin Multi Layered Necklace", price:720, category: "accessories", type: "jewelry", description: "lalalal här är en beskrivning", img: '/images/jewelry02.jpg'},
  {id: 10, name: "PCBRANDY BUMBAG", price:2400, category: "accessories", type: "bags", description: "lalalal här är en beskrivning", img: '/images/bags01.jpg'},
  {id: 11, name: "THE EDITOR 38", price:240, category: "accessories", type: "bags", description: "lalalal här är en beskrivning", img: '/images/bags02.jpg'},
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
