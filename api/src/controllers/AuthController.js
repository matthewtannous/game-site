/**
 * Controller for Authentication
 */
import { validationResult } from "express-validator";

export class AuthController {
    /**
     * Constructs a UserController object
     * @param {UserService} userService 
     */
    constructor(authService) {
        this.authService = authService;
    }

    _validate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return null; // no errors
    }

    login = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    register = async (req, res, next) => {
        try {
            if (this._validate(req, res)) {
                return;
            }
            const result = await this.authService.register(req.body);
            if (!result) {
                return res.status(400).json({ message: 'Cannot create' });
            }
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }


}