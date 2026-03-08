import { validationResult } from "express-validator";

export class ChallengeController {

    constructor(challengeService) {
        this.challengeService = challengeService;
    }

    _validate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return null; // no errors
    }

    list = async (req, res, next) => {
        try {
            res.json(await this.challengeService.listChallenges());
        } catch (e) {
            next(e);
        }
    }

    getById = async (req, res, next) => {
        try {
            if (this._validate(req, res)) { // if not null --> there are errors
                return;
            }
            const data = await this.challengeService.getChallengeById(req.params.id);
            if (!data) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }

    create = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.challengeService.createChallenge(req.body);
            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    update = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const data = await this.challengeService.updateChallenge(req.params.id, req.body);
            if (!data) {
                return res.status(404).json({ message: 'No data found' });
            }

            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    delete = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }

            const ok = await this.challengeService.deleteChallenge(req.params.id);
            if (!ok) {
                return res.status(404).json('Not found');
            }

            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}