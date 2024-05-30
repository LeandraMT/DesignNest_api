"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const index_1 = require("../middlewares/index");
exports.default = (router) => {
    router.get('/users', index_1.isAuthenticated, users_1.getAllUsers);
    router.delete('/users/:id', index_1.isAuthenticated, index_1.isOwner, users_1.deleteUser);
    router.put('/users/:id', index_1.isAuthenticated, index_1.isOwner, users_1.updateUser);
};
//# sourceMappingURL=users.js.map