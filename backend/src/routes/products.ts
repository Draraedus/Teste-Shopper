import { Router, Request, Response } from 'express';
import { closeConnection, openConnection } from '../bd/connectionManager';

interface Product {
    code: number
    new_valor: number
}

const productsRoutes = Router()

productsRoutes.get('/products', (req: Request, res: Response) => {

    openConnection((connection) => {

        const sql = 'SELECT * FROM products.products'
    
        connection.query(sql, (err, results) => {
          if (err) {
    
            console.error('Erro ao buscar todos os produtos:', err)
            res.status(500).json({ error: 'Erro ao buscar produtos' })
            return
          }
    
          res.json(results);
          closeConnection(connection)
        })
    })
})

productsRoutes.put('/products', (req: Request, res: Response) => {

  const products:Product[] = []
  const data = req.body 

  products.concat(data)

  if (!products || !Array.isArray(products)) {

    res.status(400).json({ error: 'Requisição inválida' })
    return
  }

  openConnection((connection) => {
        
    const sql = 'UPDATE products.products SET sales_price = ? WHERE code = ?'
    
    products.forEach((product) => {

        const values = [product.new_valor, product.code]
        
        connection.query(sql, values, (err, results) => {

            if (err) {

            console.error(`Erro ao atualizar o valor do produto Code ${product.code}:`, err)
            return
            } else {

            console.log(`Valor do produto com Code ${product.code} atualizado com sucesso.`)
            }
        })
    })

    closeConnection(connection)
    res.json({ message: 'Produtos atualizados com sucesso' })
})
})

export default productsRoutes
