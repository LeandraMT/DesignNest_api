import express from 'express';

import { sendMessage, 
    getMessagesForUser,
    createBlogPost,
    editExistingBlogPost,
    deleteBlogPost,
    getAllBlogPosts
} from '../controllers/features';


export default (router: express.Router) => {
    // Messages
    router.post('/send-message', sendMessage);
    router.get('/:userModel/:id/messages', getMessagesForUser);

    // BlogPosts
    router.get('/blog-posts', getAllBlogPosts);
    router.post('/blog-posts', createBlogPost);
    router.put('/blog-posts/:id', editExistingBlogPost);
    router.delete('/blog-posts/:id', deleteBlogPost);
};