import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true},
    last_name: { type: String, trim: true},
    age: { type: Number, trim: true},
    email: { type: String, unique: true, trim: true },
    password: { type: String},
    cartId: { type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    role:{ type: String, default: "Usuario"}
  },
  {
    timestamps: true,
    versionKey: false,
  }, { collection: "Users" });


const usersModel = mongoose.model('user', userSchema);

export default usersModel;