const mongoose = require("mongoose");

/*

Blog

    - Title
    - Content
    - User (posted by)
    - Created date
    - Like 
    - Image upload 
    - Category/Tags/keywords 
    - Audit history
        - user 
        - timestamp 

*/

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String, // Come back later and replace this with a Mongoose object ID
      required: true,
    },
    likes: {
      type: [String], // Come back and later and replace tis with a Mongoose object ID
      required: false,
    },
    headerImage: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      enum: ["life", "travel", "photography", "coding"],
      required: true,
    },
    editHistory: {
      type: [{ user: String, timestamp: Date }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
  BlogModel,
};
