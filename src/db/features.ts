import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'recipientModel',
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Designer']
    },
    recipientModel: {
        type: String,
        required: true,
        enum: ['User', 'Designer']
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const DesignerBlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer', required: true },
    timestamp: { type: Date, default: Date.now }
});



export const MessageModel = mongoose.model('Message', MessageSchema);
export const DesignerBlogPostModel = mongoose.model('DesignerBlogPost', DesignerBlogPostSchema);



// Message endpoints
export const getMessages = () => MessageModel.find();
export const createMessage = (message: Record<string, any>) => new MessageModel(message).save()
    .then((message) => message.toObject());
export const deleteMessageById = (id: string) => MessageModel.findByIdAndDelete({ _id: id });


// Designer BlogPost endpoints
export const getDesignerBlogPosts = () => DesignerBlogPostModel.find();
export const createDesignerBlogPost = (blogPost: Record<string, any>) => new DesignerBlogPostModel(blogPost).save()
    .then((blogPost) => blogPost.toObject());
export const deleteDesignerBlogPostById = (id: string) => DesignerBlogPostModel.findOneAndDelete({ _id: id });