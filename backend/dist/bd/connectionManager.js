"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.openConnection = void 0;
const dataBaseConfig_1 = __importDefault(require("./dataBaseConfig"));
const mysql_1 = __importDefault(require("mysql"));
function openConnection(callback) {
    const connection = mysql_1.default.createConnection(dataBaseConfig_1.default);
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }
        console.log('Conectado ao banco de dados MySQL!');
        callback(connection);
    });
}
exports.openConnection = openConnection;
function closeConnection(connection) {
    connection.end((err) => {
        if (err) {
            console.error('Erro ao fechar a conexão:', err);
            return;
        }
        console.log('Conexão MySQL fechada.');
    });
}
exports.closeConnection = closeConnection;
