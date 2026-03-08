import { Router } from "express";
import { ChallengeRepository } from "../domain/repositories/ChallengeRepository.js";
import { ChallengeService } from "../services/ChallengeService.js";
import { ChallengeController } from "../controllers/ChallengeController.js";

import { idParam, upsertChallenge } from "../validators/challengeValidators.js";

/**
 * Dependency injection
 */
const repo = new ChallengeRepository();
const service = new ChallengeService(repo);
const controller = new ChallengeController(service);

export const challengeRoutes = Router();

challengeRoutes.get('/', controller.list); // List all Challenge
challengeRoutes.get('/:id', idParam, controller.getById); // List challenge by id

challengeRoutes.put('/:id', [...idParam, upsertChallenge], controller.update); // modfify challenge by id 

challengeRoutes.post('/', upsertChallenge, controller.create); // add challenge

challengeRoutes.delete('/:id', idParam, controller.delete); // delete challenge by id