import express from 'express';

import { deleteDesigner, getAllDesigners, updateDesigner } from '../controllers/designers';
import { isAuthenticated, isOwner } from '../middlewares/index';

export default (router: express.Router) => {
    router.get('/designers', isAuthenticated, getAllDesigners);
    router.delete('/designers/:id',isAuthenticated, isOwner, deleteDesigner);
    router.put('/designers/:id', isAuthenticated, isOwner, updateDesigner);
};