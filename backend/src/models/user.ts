import mongoose, {Schema, Document} from "mongoose";

interface User extends Document{
    username: string;
    password: string;
    email: string;
    role: "admin_master" | "admin_grupo" | "usuario";
    profileImage: string;
    createdAt: Date;
    updatedAt: Date; 
}

const userSchema = new Schema<User>({
    _id: {type: Schema.Types.ObjectId, auto: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum:["admin_master", "admin_grupo", "usuario"], required: true},
    profileImage: {type: String,  default:"default.jpg"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
}, { timestamps: true });

const userModel = mongoose.model<User>("User", userSchema);

export default userModel;