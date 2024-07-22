"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const conn_1 = __importDefault(require("./src/db/conn"));
const router_1 = __importDefault(require("./src/routes/router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); //add cors middleware
const port = process.env.PORT;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.default)();
    console.log("Pronto para interagir com o banco de dados.");
    app.use(express_1.default.json());
    app.use("/", router_1.default);
    app.get("/", (req, res) => {
        res.send("Retornando valor teste");
    });
    app.listen(port, () => {
        console.log(`[Servidor]: Servidor está rodando em http://localhost:${port}`);
    });
});
startServer().catch(console.error);
//# sourceMappingURL=server.js.map