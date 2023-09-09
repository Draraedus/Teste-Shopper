"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connectionManager_1 = require("../bd/connectionManager");
const packsRoutes = (0, express_1.Router)();
packsRoutes.get('/packs', (req, res) => {
    (0, connectionManager_1.openConnection)((connection) => {
        const sql = 'SELECT * FROM products.packs';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar todos os pacotes:', err);
                res.status(500).json({ error: 'Erro ao buscar pacotes' });
                return;
            }
            res.json(results);
            (0, connectionManager_1.closeConnection)(connection);
        });
    });
});
exports.default = packsRoutes;
