import { Router } from "express";
import { consultaController } from "../controller/Consulta/ConsultaController.js";

export const consultasRouter = Router();

consultasRouter.get("/consultas", consultaController.pegarTodasConsultas)
consultasRouter.get("/consultas/:id", consultaController.pegarConsultaPorId)
consultasRouter.post("/consultas", consultaController.criarConsulta)
consultasRouter.put("/consultas", consultaController.atualizarConsulta)
consultasRouter.delete("/consultas/:id", consultaController.deletarConsulta)