"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connectionManager_1 = require("../bd/connectionManager");
const productsRoutes = (0, express_1.Router)();
productsRoutes.get('/products', (req, res) => {
    (0, connectionManager_1.openConnection)((connection) => {
        const sql = 'SELECT * FROM products.products';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar todos os produtos:', err);
                res.status(500).json({ error: 'Erro ao buscar produtos' });
                return;
            }
            res.json(results);
            (0, connectionManager_1.closeConnection)(connection);
        });
    });
});
productsRoutes.put('/products', (req, res) => {
    const products = req.body.produtos;
    if (!products || !Array.isArray(products)) {
        res.status(400).json({ error: 'Requisição inválida' });
        return;
    }
    (0, connectionManager_1.openConnection)((connection) => {
        const sql = 'UPDATE products.products SET sales_price = ? WHERE id = ?';
        products.forEach((product) => {
            const values = [product.novoValor, product.id];
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(`Erro ao atualizar o valor do produto ID ${product.id}:`, err);
                    return;
                }
                if (results.affectedRows === 0) {
                    console.log(`Nenhum produto com ID ${product.id} foi atualizado.`);
                }
                else {
                    console.log(`Valor do produto com ID ${product.id} atualizado com sucesso.`);
                }
            });
        });
        (0, connectionManager_1.closeConnection)(connection);
        res.json({ message: 'Produtos atualizados com sucesso' });
    });
});
exports.default = productsRoutes;
