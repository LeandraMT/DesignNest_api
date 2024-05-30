import mongoose from "mongoose";

// Models
import { UserModel } from "./users";
import { DesignerModel } from "./designers";

const UserMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});


const DesignerMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const DesignerBlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer', required: true },
    timestamp: { type: Date, default: Date.now }
});

export const UserMessageModel = mongoose.model('UserMessage', UserMessageSchema);
export const DesignerMessageModel = mongoose.model('DesignerMessage', DesignerMessageSchema);
export const DesignerBlogPostModel = mongoose.model('DesignerBlogPost', DesignerBlogPostSchema);



// User Message endpoints
export const getUserMessages = () => UserMessageModel.find();
export const createUserMessage = (message: Record<string, any>) => new UserMessageModel(message).save()
    .then((message) => message.toObject());
export const deleteUserMessageById = (id: string) => UserMessageModel.findByIdAndDelete({ _id: id });

// Designer Message endpoints
export const getDesignerMessages = () => DesignerMessageModel.find();
export const createDesignerMessage = (message: Record<string, any>) => new DesignerMessageModel(message).save()
    .then((message) => message.toObject());
export const deleteDesignerMessageById = (id: string) => DesignerMessageModel.findByIdAndDelete({ _id: id });

// Designer BlogPost endpoints
export const getDesignerBlogPosts = () => DesignerBlogPostModel.find();
export const createDesignerBlogPost = (blogPost: Record<string, any>) => new DesignerBlogPostModel(blogPost).save()
    .then((blogPost) => blogPost.toObject());
export const deleteDesignerBlogPostById = (id: string) => DesignerBlogPostModel.findOneAndDelete({ _id: id });