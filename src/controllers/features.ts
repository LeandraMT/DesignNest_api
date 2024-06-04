import express from 'express';

import { DesignerBlogPostModel, MessageModel, createDesignerBlogPost, deleteDesignerBlogPostById, getDesignerBlogPosts } from '../db/features';


// Send messages
export const sendMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { senderId, senderModel, recipientId, recipientModel, content } = req.body;

        if (!senderId || !senderModel || !recipientId || !recipientModel || !content) {
            return res.sendStatus(400);
        }

        if (!['User', 'Designer'].includes(senderModel) || !['User', 'Designer'].includes(recipientModel)) {
            return res.sendStatus(400);
        }

        const message = new MessageModel({
            sender: senderId,
            senderModel,
            recipient: recipientId,
            recipientModel,
            content
        });

        await message.save();

        return res.status(201).json(message);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getMessagesForUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id, userModel } = req.params;

        if (!['User', 'Designer'].includes(userModel)) {
            return res.sendStatus(400);
        }

        const messages = await MessageModel.find({ recipient: id, recipientModel: userModel})
            .populate('sender', 'username').exec();
        
        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};



// BlogPosts
export const createBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.sendStatus(400);
        }

        const blogPost = await createDesignerBlogPost({
            title,
            content,
            author,
        });

        return res.status(201).json(blogPost);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getAllBlogPosts = async (req: express.Request, res: express.Response) => {
    try {
        const blogPosts = await getDesignerBlogPosts();

        return res.status(200).json(blogPosts);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const editExistingBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title && !content) {
            return res.sendStatus(400);
        }

        const updatedFields: Record<string, any> = {};
        if (title) updatedFields.title = title;
        if (content) updatedFields.content = content;

        const updatedBlogPost = await DesignerBlogPostModel.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedBlogPost) {
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedBlogPost.toObject());
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const deleteBlogPost = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedBlogPost = await deleteDesignerBlogPostById(id);

        return res.json(deletedBlogPost);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};