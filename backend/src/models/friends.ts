import mongoose,{Document, Schema, ObjectId} from "mongoose";

interface Friends extends Document{
    first_user: ObjectId;
    second_user: ObjectId;
    timestamp: Date;
}

const friendsSchema = new Schema<Friends>({
    first_user: { type: Schema.Types.ObjectId, ref:'Friendship' },
    second_user: { type: Schema.Types.ObjectId, ref:'Friendship'},
    timestamp: { type: Date, default: Date.now},
});

const friendsModel = mongoose.model<Friends>("Friends", friendsSchema);

export default friendsModel;