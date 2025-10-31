import { Router } from "express";
import { pacienteController } from "../controller/Paciente/PacienteController.js"

export const pacientesRouter = Router()

pacientesRouter.get("/pacientes", pacienteController.pegarTodosPacientes)
pacientesRouter.get("/pacientes/:id", pacienteController.pegarPacientePorId)
pacientesRouter.post("/pacientes", pacienteController.criarPaciente)
pacientesRouter.put("/pacientes/:id", pacienteController.atualizarPaciente)
pacientesRouter.delete("/pacientes/:id", pacienteController.deletePaciente)