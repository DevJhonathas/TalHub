import mongoose,{Document, Schema, ObjectId} from "mongoose";
interface Group extends Document {
    name: string;
    description: string;
    members: ObjectId[];
    type: 'public' | 'private';
    creator: ObjectId;
  }
  
  const groupSchema = new Schema<Group>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String, enum: ['public', 'private'], required: true },
    creator: { type: String, required: true }
  });
  
  const GroupModel = mongoose.model<Group>("Group", groupSchema);
  
  export default GroupModel;
  