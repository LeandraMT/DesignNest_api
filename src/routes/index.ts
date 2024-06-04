import express from 'express';

import authentication from './authentication';
import users from './users';
import designers from './designers';
import features from './features';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    designers(router);
    features(router);
    
    return router;
}