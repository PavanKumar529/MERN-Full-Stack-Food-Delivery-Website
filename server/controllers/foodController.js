import fs from "fs"
import foodModel from "../models/foodModel.js"



// Add Food Item
const addFood = async(req, res) => {

    // Check if file is uploaded correctly
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", success: false });
    }

    let image_file = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description ,
        price: req.body.price , 
        category: req.body.category ,
        image: image_file
    })

    try {
        await food.save()
        res.json({ message: "Food Added", success: true})
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Something Wrong while Food Adding", sucess: false})

    }
}


// All Food List
const listFood = async(req, res) => {
    try{
        const foods = await foodModel.find({})
        res.json({ data: foods, success: true})
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error", success: false})
    }

}

// Remove Food Item
const removeFood = async(req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);

        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ message: "Food item not found", success: false });
        }

        // Remove the image file if it exists
        fs.unlink(`uploads/${food.image}`, (error) => {
            if(error) {
                console.log("Failed to delete image file:", err);
            }
        });

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ message: "Food Removed", success: true })    
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error", success: false})
    }
}

export { addFood, listFood, removeFood }