import { Router, Request, Response } from 'express';
import { closeConnection, openConnection } from '../bd/connectionManager';

const packsRoutes = Router();

packsRoutes.get('/packs', (req: Request, res: Response) => {
    openConnection((connection) => {
        const sql = 'SELECT * FROM products.packs'
    
        connection.query(sql, (err, results) => {
          if (err) {
    
            console.error('Erro ao buscar todos os pacotes:', err)
            res.status(500).json({ error: 'Erro ao buscar pacotes' })
            return
          }
    
          res.json(results);
          closeConnection(connection)
        })
    })
})

export default packsRoutes
