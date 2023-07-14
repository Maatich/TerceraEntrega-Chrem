import mongoose, { Schema }  from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
}, { collection: "Carts" });

cartSchema.pre("find", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model("cart", cartSchema);

export default cartsModel;
