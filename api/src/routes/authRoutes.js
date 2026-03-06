import { Router } from "express";
import { UserRepository } from "../domain/repositories/UserRepository.js";
import { AuthService } from "../services/AuthService.js";
import { AuthController } from "../controllers/AuthController.js";

import { upsertUser } from "../validators/userValidators.js";

/**
 * Dependency injection
 */
const repo = new UserRepository();
const service = new AuthService(repo);
const controller = new AuthController(service);

export const authRoutes = Router();

authRoutes.post('/login', controller.login);
authRoutes.post('/register', controller.register);
// authRoutes.post('/register', upsertUser, controller.register); // BETTER