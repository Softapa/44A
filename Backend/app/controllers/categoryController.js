const asyncHandler = require("express-async-handler")
const fs           = require("fs")

const getSlider = asyncHandler( async (req, res) => {
    try {
        const files = await fs.readdirSync("./public/images/slider");
        files.map(i => {
            console.log(i)
        });
    } catch (error) {
        console.error('Error reading folder:', error);
    }
});


module.exports = { 
    getSlider,
}