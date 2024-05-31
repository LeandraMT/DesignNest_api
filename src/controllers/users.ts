import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../db/users';
import { random, authentication } from '../auth/index';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!username && !email && !password) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        if (!user) {
            return res.sendStatus(404);
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            if (!user.authentication) {
                user.authentication = { password: '', salt: '' };
            }
            const salt = random();
            const hashedPassword = authentication(salt, password);
            user.authentication.password = hashedPassword;
            user.authentication.salt = salt;
        }

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};