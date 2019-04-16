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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var products = [{id: 0, name: "ItemOne", price: 100}, {id: 1, name: "ItemTwo", price:200}]
