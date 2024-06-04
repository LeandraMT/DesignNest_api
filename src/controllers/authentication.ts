import express from 'express';
import { authentication, random } from '../auth';
import { createUser, getUserByEmail } from '../db/users';
import { createDesigner, getDesignerByEmail } from '../db/designers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username, accountType } = req.body;

        if (!email || !password || !username || !accountType) {
            return res.sendStatus(400);
        }

        if (!['User', 'Designer'].includes(accountType)) {
            return res.sendStatus(400);
        }

        let existingAccount;
        if (accountType === 'User') {
            existingAccount = await getUserByEmail(email);
        } else if (accountType == 'Designer') {
            existingAccount = await getDesignerByEmail(email);
        }

        if (existingAccount) {
            return res.sendStatus(400);
        }

        const salt = random();
        const hashedPassword = authentication(salt, password);

        let account;
        if (accountType === 'User') {
            account = await createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: hashedPassword,
                }
            });
        } else if (accountType === 'Designer') {
            account = await createDesigner({
                email,
                username,
                authentication: {
                    salt,
                    password: hashedPassword,
                }
            });
        }

        return res.status(200).json(account).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        const designer = await getDesignerByEmail(email).select('+authentication.salt +authentication.password');
        const account = user || designer;
        console.log("Designer: ", designer);

        if (!account || !account.authentication) {
            return res.sendStatus(400);
        }

        const hashedPassword = authentication(account.authentication.salt!, password);

        if (account.authentication.password !== hashedPassword) {
            return res.sendStatus(403);
        }

        const salt = random();
        account.authentication.sessionToken = authentication(salt, account._id.toString());

        await account.save();

        res.cookie('demo_auth', account.authentication.sessionToken,
            {
                domain: 'localhost',
                path: '/'
            }
        );

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};