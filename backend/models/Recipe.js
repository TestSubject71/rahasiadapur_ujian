const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  menuName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true // URL to the image
  },
  videoLink: { 
    type: String, 
    required: true // URL to the YouTube video
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);