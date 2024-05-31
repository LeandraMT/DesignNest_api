import express from 'express';

import { getDesigners, deleteDesignerById, updateDesignerById } from '../db/designers';

export const getAllDesigners = async (req: express.Request, res: express.Response) => {
    try {
        const designers = await getDesigners();
        console.log("Fetching Designers: ", designers);

        return res.status(200).json(designers);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const deleteDesigner = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedDesigner = await deleteDesignerById(id);

        return res.json(deletedDesigner);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const updateDesigner = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const designer = await updateDesignerById(id, { username });

        if (!designer) {
            return res.sendStatus(404);
        }

        designer.username = username;
        await designer.save();

        return res.status(200).json(designer);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};