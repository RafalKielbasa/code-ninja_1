const http = require('http')

const CONFIG = {
  API_TOKEN: 'secret-token-123',
  PORT: 3000,
}

const products = [
  { id: 1, name: 'Laptop Gaming Pro', price: 1299.99, category: 'Electronics' },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199.99,
    category: 'Electronics',
  },
  { id: 3, name: 'Smart Watch', price: 249.99, category: 'Electronics' },
  { id: 4, name: 'Running Shoes', price: 89.99, category: 'Sports' },
  { id: 5, name: 'Yoga Mat', price: 29.99, category: 'Sports' },
  { id: 6, name: 'Coffee Maker', price: 79.99, category: 'Home' },
  { id: 7, name: 'Backpack', price: 49.99, category: 'Accessories' },
  { id: 8, name: 'Desk Lamp', price: 34.99, category: 'Home' },
  { id: 9, name: 'Water Bottle', price: 19.99, category: 'Sports' },
  { id: 10, name: 'Bluetooth Speaker', price: 89.99, category: 'Electronics' },
]

const validateToken = (req) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  const token = authHeader.split(' ')[1]
  return token === CONFIG.API_TOKEN
}

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res)
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (!validateToken(req)) {
    res.writeHead(401)
    res.end(
      JSON.stringify({ message: 'Unauthorized - Invalid or missing token' })
    )
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname

  if (path === '/api/products') {
    res.writeHead(200)
    res.end(JSON.stringify(products))
    return
  }

  if (path.match(/^\/api\/products\/\d+$/)) {
    const id = parseInt(path.split('/').pop())
    const product = products.find((p) => p.id === id)

    if (product) {
      res.writeHead(200)
      res.end(JSON.stringify(product))
    } else {
      res.writeHead(404)
      res.end(JSON.stringify({ message: 'Product not found' }))
    }
    return
  }

  res.writeHead(404)
  res.end(JSON.stringify({ message: 'Route not found' }))
})

server.listen(CONFIG.PORT, () => {
  console.log(`Server is running on http://localhost:${CONFIG.PORT}`)
})
