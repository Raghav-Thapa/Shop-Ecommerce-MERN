const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    parent:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    image:{
        type: String,
    },
    slug:{
        type: String,
        require: true,
        unique: true
    },
    brands:[{
        type: mongoose.Types.ObjectId,
        ref:"Brand",
        default: null
    }],
    attributes:[{
        key: String,
        value: [String]
    }],
        status:{
            type: String,
            ennum:['active','inactive'],
            default: 'inactive'
        }
},{
    timestamps:true,
    autoInced:true
})

const CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = CategoryModel