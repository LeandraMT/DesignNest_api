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
    images: [ImageSchema],
    videos: [VideoSchema],
    links: [LinkSchema]
});

export const DesignerModel = mongoose.model('User', DesignerSchema);

export const getDesigners = () => DesignerModel.find();
export const getDesignerByUsername = (username: string) => DesignerModel.findOne({ username });
export const getDesignerById = (id: string) => DesignerModel.findById(id);
export const createDesigner = (values: Record<string, any>) => new DesignerModel(values)
    .save().then((designer) => designer.toObject());
export const deleteDesignerById = (id: string) => DesignerModel.findOneAndDelete({ _id: id });
export const updateDesignerById = (id: string, values: Record<string, any>) => DesignerModel.findByIdAndUpdate(id, values);