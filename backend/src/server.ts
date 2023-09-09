import express from 'express';
import productsRoutes from './routes/products';
import packsRoutes from './routes/packs';
import bodyParser from 'body-parser';

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/', productsRoutes)
app.use('/', packsRoutes)

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`)
})
