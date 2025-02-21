const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,  // Ensure emails are unique
    },
    wishlist: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
        }
    ],
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productModel",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
      }
    ],
  },
  { timestamps: true }
);

// Explicitly set `usernameField` to "username"
userSchema.plugin(passportLocalMongoose, { usernameField: "username" });

module.exports = mongoose.model("userModel", userSchema);
