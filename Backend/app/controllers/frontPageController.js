const asyncHandler = require("express-async-handler")
const fs           = require("fs")

const getSlider = asyncHandler( async (req, res) => {
    try {
        const files = await fs.readdirSync("./public/images/slider");
        
        return res.json({ message: files.map(i => {
            return "/public/images/slider/" + i;
        }) });
    } catch (error) {
        console.error('Error reading folder:', error);
    }
});


module.exports = { 
    getSlider,
}