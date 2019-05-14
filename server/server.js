const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

//här ska alla routes ligga.
app.get('/products', (req, res) => {
  res.send(products);
})

app.post('/register', (req, res) => {
  console.log(req.body);
  var userData = {
    username: req.body.username,
    password: req.body.password,
    cart: []
  }


  if (users.find( user => userData.username === user.username)) {
    res.sendStatus(409)
  } else {
    res.sendStatus(201)
    users.push(userData)
  }
})

app.post('/login', (req, res) => {
  if (currentUser = users.find( user => req.body.username === user.username && req.body.password === user.password)) {
    res.status(200).json(currentUser)
  } else {
    res.sendStatus(400)
  }
})

app.post('/addToCart', (req, res) => {
  let currentUser = users.find(user => user.username === req.body.username)

  let hit = currentUser.cart.find( item => item.id === req.body.itemId)
  if (hit) {
    hit.amount ++
  } else {
    currentUser.cart.push({id: req.body.itemId, amount: 1})
    console.log(currentUser);
  }
})

app.post('/removeFromCart', (req, res) => {
  let currentUser = users.find(user => user.username === req.body.username)
  currentUser.cart.splice(req.body.itemIdx, 1)
})

app.post('/replaceCart', (req, res) => {
  let currentUser = users.find(user => user.username === req.body.username)
  currentUser.cart = req.body.cart
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

var users = [
  {username: 'elin', password: 'elin', cart: [{id: 1, amount: 1}], extra: {firstName: 'Elin', lastName: 'Gustafsson'}},
  {username: 'sam', password: 'sam', cart: []}
 ]
