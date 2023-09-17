const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    houseNo: Number,
    streetName: String,
    address : String
    // munRular: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Muni"
    // }

})

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        min: 3,
        // default: // for default value
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    image:{
        type: String
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["admin","seller","customer"],
        default: "customer"
    },
    status:{
        type: String,
        enum: ["active","inactive"],
        default: "inactive"
    },
    activationToken: {
        type: String,
        default: null
    },
    resetToken:{
        type:String,
        default: null
    },
    address:{
        shippingAddress: AddressSchema,
        billingAddress: AddressSchema
    }
},{
    timestamps: true, //createAt, updateAt
    autoIndex: true
})

const UserModel = mongoose.model("User", UserSchema)
//table name => plural form of model name
//User => users
//Document => key:value

module.exports = UserModel;