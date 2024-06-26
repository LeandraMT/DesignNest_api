import express from 'express';

import { getDesigners, deleteDesignerById, updateDesignerById, getImages, addImage } from '../db/designers';

export const getAllDesigners = async (req: express.Request, res: express.Response) => {
    try {
        const designers = await getDesigners().populate('portfolio.images portfolio.videos portfolio.links');

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


// Media CRUD operations
export const getAllImages = async (req: express.Request, res: express.Response) => {
    try {
        const images = await getImages();

        return res.status(200).json(images);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addImageDesigner = async (req: express.Request, res: express.Response) => {
        try {
            const { url, title, description } = req.body;
    
            if (!url || !title || !description) {
                return res.sendStatus(400);
            }
    
            const imageAdded = await addImage({
                url,
                title,
                description,
            });
    
            return res.status(201).json(imageAdded);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    
}