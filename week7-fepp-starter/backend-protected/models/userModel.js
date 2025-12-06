const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },            // Full name
    email: { type: String, required: true, unique: true }, // Unique email for login
    password: { type: String, required: true },        // Hashed password
    phone_number: { type: String, required: true },    // Contact number
    gender: { type: String, required: true },          // Gender
    address: {
      street: { type: String, required: true },        // Street address
      city: { type: String, required: true },          // City
      zipCode: { type: String, required: true }        // Postal/ZIP code
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
