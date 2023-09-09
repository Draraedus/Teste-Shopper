"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const packs_1 = __importDefault(require("./routes/packs"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use('/', products_1.default);
app.use('/', packs_1.default);
app.listen(port, () => {
    console.log(`Servidor Express está rodando na porta ${port}`);
});
