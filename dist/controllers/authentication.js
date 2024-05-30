"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_1 = require("../auth");
const users_1 = require("../db/users");
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, auth_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, auth_1.authentication)(salt, password),
            }
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user || !user.authentication) {
            return res.sendStatus(400);
        }
        const hashedPassword = (0, auth_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== hashedPassword) {
            return res.sendStatus(403);
        }
        const salt = (0, auth_1.random)();
        user.authentication.sessionToken = (0, auth_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('demo_auth', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.login = login;
//# sourceMappingURL=authentication.js.map