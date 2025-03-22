import mongoose from "mongoose"

const plantSchema = new mongoose.Schema({  
        plantname:{
                type:String,
                required : true
        },
        sciencename:{
                type:String,
                required : true
        },
        planttype:{
                type:String,
                required : true,
                enum: ["Herb", "Shrub", "Tree", "Flower"]
        },
        plantcategory:{
                type:String,
                required : true,
                enum: ["Medicinal", "Culinary", "Aromatic", "Ornamental"]
        },
        description:{
                type:String,
                required : true
        },
        plantsize:{
                type:String,
                required : true,
                enum: ["Small", "Medium", "Large"]
        },
        wateringfeq:{
                type:String,
                required : true,
                enum: ["Daily", "Weekly", "Bi-weekly", "Monthly"]
        },
        temp:{
            type:String,
            required : true
        },
        light:{
            type:String,
            required : true,
            enum: ["Full Sun", "Partial Shade", "Shade"]
        },
        avalquaantity:{
            type:String,
            required : true
        },
        priceunit:{
                type:String,
                required : true
        },
        origin:{
            type:String,
            required : true
    },
});

const Plants = mongoose.model("Plants", plantSchema);
export default Plants;