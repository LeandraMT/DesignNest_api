import express from 'express';

import { addImageDesigner, deleteDesigner, getAllDesigners, getAllImages, updateDesigner } from '../controllers/designers';
import { isAuthenticated, isOwner } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/designers', isAuthenticated, getAllDesigners);
    router.delete('/designers/:id',isAuthenticated, isOwner, deleteDesigner);
    router.put('/designers/:id', isAuthenticated, isOwner, updateDesigner);

    // Media routes
    router.get('/designers/images', getAllImages);
    router.post('/designers/images', addImageDesigner);
};