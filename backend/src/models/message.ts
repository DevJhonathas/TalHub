import mongoose,{
    Schema, Document, ObjectId
} from "mongoose";

interface Message  extends Document{
    sender: ObjectId,
    receiver?: ObjectId,
    group?: ObjectId, 
    content: string,
    timestamp: Date,
};

const messageSchema = new Schema<Message>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required:true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    content: { type: String, required:true },
    timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export default MessageModel;