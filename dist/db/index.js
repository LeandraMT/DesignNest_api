"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = 'mongodb+srv://devleandra:database_leandra@lmtcluster.fkorchy.mongodb.net/mern_project_api?retryWrites=true&w=majority&appName=LmtCluster';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('Successfully connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map