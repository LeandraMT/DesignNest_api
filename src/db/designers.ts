import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true},
    title: { type: String},
    description: { type: String}
});

const VideoSchema = new mongoose.Schema({
    url: { type: String, required: true},
    title: { type: String},
    description: { type: String}
});

const LinkSchema = new mongoose.Schema({
    url: { type: String, required: true},
    title: { type: String},
    description: { type: String}
});

const DesignerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false },
    },
    portfolio: {
        images: [ImageSchema],
        videos: [VideoSchema],
        links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
    },
    blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }]
});

export const DesignerModel = mongoose.model('Designer', DesignerSchema);
export const LinkDesignerModel = mongoose.model('Link', LinkSchema);
export const ImageDesignerModel = mongoose.model('Image', ImageSchema);
export const VideoDesignerModel = mongoose.model('Video', VideoSchema);


// Designer
export const getDesigners = () => DesignerModel.find();
export const getDesignerByEmail = (email: string) => DesignerModel.findOne({ email });
export const getDesignerBySessionToken = (sessionToken: string) => DesignerModel.findOne({
    'authentication.sessionToken': sessionToken
});
export const getDesignerById = (id: string) => DesignerModel.findById(id);
export const createDesigner = (values: Record<string, any>) => new DesignerModel(values)
    .save().then((designer) => designer.toObject());
export const deleteDesignerById = (id: string) => DesignerModel.findOneAndDelete({ _id: id });
export const updateDesignerById = (id: string, values: Record<string, any>) => DesignerModel.findByIdAndUpdate(id, values, { new: true });
export const getBlogPostsByDesigners = (id: string) => DesignerModel.findById(id).populate('blogPosts');


// Media endpoints
export const getImages = () => ImageDesignerModel.find();
export const addImage = (values: Record<string, any>) => new ImageDesignerModel(values);
export const updateImage = (id: string, values: Record<string, any>) => ImageDesignerModel.findByIdAndUpdate(id, values, { new: true });
export const deleteImage = (id: string) => ImageDesignerModel.findByIdAndDelete({ id: id });

export const getVideos = () => VideoDesignerModel.find();
export const addVideo = (values: Record<string, any>) => new VideoDesignerModel(values);
export const updateVideo = (id: string, values: Record<string, any>) => VideoDesignerModel.findByIdAndUpdate(id, values, { new: true });
export const deleteVideo = (id: string) => VideoDesignerModel.findByIdAndDelete({ id: id });

export const getLinks = () => LinkDesignerModel.find();
export const addLink = (values: Record<string, any>) => new LinkDesignerModel(values);
export const updateLink = (id: string, values: Record<string, any>) => LinkDesignerModel.findByIdAndUpdate(id, values, { new: true });
export const deleteLink = (id: string) => LinkDesignerModel.findByIdAndDelete({ id: id });