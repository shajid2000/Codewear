const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pincode: { type: String, default: "You need to add pincode in your account section"},
    address: { type: String, default: "You need to add address in your account section" },
    phone: { type: String, default: "You need to add phone in your account section" }
} ,
{ timestamps: true }

);
mongoose.models = {}
export default mongoose.model("User", UserSchema);
// module.exports =
//     mongoose.models.User || mongoose.model('User', UserSchema);
// const User = mongoose.models.User || mongoose.model('User', UserSchema);

// export default User;