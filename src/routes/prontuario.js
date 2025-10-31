// Route
import { Router } from "express";
import { prontuarioController } from "../controller/Prontuario/ProntuarioController.js";
export const prontuarioRouter = Router()


prontuarioRouter.get("/prontuarios", prontuarioController.pegarTodosProntuario)
prontuarioRouter.get("/prontuarios/:id", prontuarioController.pegarProntuarioPorID)
prontuarioRouter.post("/prontuarios", prontuarioController.criarProntuario)
prontuarioRouter.put("/prontuarios/:id", prontuarioController.atualizarProntuario)
prontuarioRouter.delete("/prontuarios/:id", prontuarioController.deletarProntuario)