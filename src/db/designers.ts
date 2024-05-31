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
        images: [{ type: String }],
        videos: [{ type: String }],
        links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
    },
    blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }]
});

export const DesignerModel = mongoose.model('Designer', DesignerSchema);

export const getDesigners = () => DesignerModel.find();
export const getDesignerByEmail = (email: string) => DesignerModel.findOne({ email });
export const getDesignerById = (id: string) => DesignerModel.findById(id);
export const createDesigner = (values: Record<string, any>) => new DesignerModel(values)
    .save().then((designer) => designer.toObject());
export const deleteDesignerById = (id: string) => DesignerModel.findOneAndDelete({ _id: id });
export const updateDesignerById = (id: string, values: Record<string, any>) => DesignerModel.findByIdAndUpdate(id, values, { new: true });
export const getDesignerBySessionToken = (sessionToken: string) => DesignerModel.findOne({
    'authentication.sessionToken': sessionToken
});