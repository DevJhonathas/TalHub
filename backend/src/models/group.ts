import mongoose,{Document, Schema, ObjectId, mongo} from "mongoose";
interface Group extends Document {
    name: string;
    description: string;
    members: ObjectId[];
    type: 'publico' | 'privado';
    creator: {
      id: mongoose.Types.ObjectId;
      username: string;
    };
  }
  
  const groupSchema = new Schema<Group>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String, enum: ['publico', 'privado'], required: true },
    creator: {
      id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      username: { type: String, required: true }
    }
  }, { timestamps: true });
  
  const GroupModel = mongoose.model<Group>("Group", groupSchema);
  
  export default GroupModel;
  