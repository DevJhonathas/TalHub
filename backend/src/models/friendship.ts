import mongoose,{Document, Schema, ObjectId} from "mongoose";

interface Friendship extends Document {
    request_user: ObjectId;
    receive_user: ObjectId;
    status: 'pendente' | 'aceito' | 'rejeitado';
    timestamp: Date;
  }
  
  const friendshipSchema = new Schema<Friendship>({
    request_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receive_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pendente', 'aceito', 'rejeitado'], default: 'pendente' },
    timestamp: { type: Date, default: Date.now}
  });
  
  const FriendshipModel = mongoose.model<Friendship>("Friendship", friendshipSchema);
  
  export default FriendshipModel;
  