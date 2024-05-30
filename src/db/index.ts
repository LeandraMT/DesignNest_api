import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://devleandra:database_leandra@lmtcluster.fkorchy.mongodb.net/mern_project_api?retryWrites=true&w=majority&appName=LmtCluster';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
