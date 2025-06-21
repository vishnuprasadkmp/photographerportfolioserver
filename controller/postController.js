const PostSchema = require('../model/postSchema');

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const payload = {
      post: req.file.buffer,
      contentType: req.file.mimetype,
      name: req.body.name,
      description: req.body.description,
      section: req.body.section
    };

    const createdPost = await PostSchema.create(payload);

    if (!createdPost.post || !Buffer.isBuffer(createdPost.post)) {
      throw new Error("Failed to store image buffer");
    }

    res.status(201).json({
      success: true,
      message: "POST CREATED SUCCESSFULLY",
      payload: {
        _id: createdPost._id,
        name: createdPost.name,
        description: createdPost.description,
        section: createdPost.section,
        image: `data:${createdPost.contentType};base64,${createdPost.post.toString("base64")}`
      }
    });
  } catch (err) {
    console.error("Error in createPost:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// GET ALL POSTS
exports.allPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find({});

    const payload = posts.map(post => ({
      _id: post._id,
      name: post.name,
      description: post.description,
      section: post.section,
      image: `data:${post.contentType};base64,${post.post.toString('base64')}`
    }));

    res.status(200).json({
      success: true,
      message: "POSTS FETCHED SUCCESSFULLY",
      payload
    });
  } catch (err) {
    console.error("Error in allPosts:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET SINGLE POST
exports.singlePost = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "SINGLE POST FETCHED SUCCESSFULLY",
      payload: {
        _id: post._id,
        name: post.name,
        description: post.description,
        section: post.section,
        image: `data:${post.contentType};base64,${post.post.toString('base64')}`
      }
    });
  } catch (err) {
    console.error("Error in singlePost:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      section: req.body.section
    };

    if (req.file) {
      updateData.post = req.file.buffer;
      updateData.contentType = req.file.mimetype;
    }

    const updatedPost = await PostSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "POST UPDATED SUCCESSFULLY",
      payload: {
        _id: updatedPost._id,
        name: updatedPost.name,
        description: updatedPost.description,
        section: updatedPost.section,
        image: `data:${updatedPost.contentType};base64,${updatedPost.post.toString('base64')}`
      }
    });
  } catch (err) {
    console.error("Error in updatePost:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const deleted = await PostSchema.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "SINGLE POST DELETED SUCCESSFULLY" });
  } catch (err) {
    console.error("Error in deletePost:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
