import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";

//get posts controller
export const getPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const posts = await Post.find({ userId: id }).sort({
      isfavourite: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPosts controller ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//get a singlePost controller
export const getPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in getPost controller ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//create a post controller
export const createPost = async (req, res) => {
  try {
    const { title, image, description, location } = req.body;
    const { id } = req.user;

    //image upload to cloudinary
    let imageurl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageurl = uploadResponse.secure_url;
    }

    if (!title) return res.status(400).json({ message: "Tittle is required" });
    if (!image) return res.status(400).json({ message: "Image is required" });
    if (!description)
      return res.status(400).json({ message: "description is required" });
    if (!location)
      return res.status(400).json({ message: "Location is required" });

    const newPost = await new Post({
      userId: id,
      title,
      image: imageurl,
      description,
      location,
    });

    await newPost.save();

    res.status(200).json({
      userId: id,
      post: newPost,
      message: "Post Created successfully",
    });
  } catch (error) {
    console.log("Error in createPost controller ", error);
    res.status(500).json({ message: "Server error" });
  }
};
//update a post constroller
export const updatePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { title, image, description, location } = req.body;
  try {
    if (location.length === 0) {
      return res.status(400).json({ message: "Location is required" });
    }

    const post = await Post.findOne({ _id: id, userId: userId });
    if (!post) return res.status(404).json({ message: "Post is not found" });

    let imageurl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageurl = uploadResponse.secure_url;
    }

    (post.title = title),
      (post.image = imageurl),
      (post.description = description),
      (post.location = location);

    await post.save();

    res.status(200).json({ post: post, message: "Post Updated successfully" });
  } catch (error) {
    console.log("Error in updatePost controller ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//update isfavourite controller
export const updateisFavourite = async (req, res) => {
  const { id } = req.params;
  const { isFavourite } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        isfavourite: isFavourite,
      },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.save();

    res.status(200).json({ post: post, message: "Post updated successfully" });
  } catch (error) {
    console.log("Error in isFavourite controller ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//delete the post controller
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { id } = req.user;
  try {
    //find the post
    const post = await Post.findOne({ _id: postId, userId: id });

    if (!post) return res.status(404).json({ message: "Post is not found" });

    //delete the image from cloudinary
    if (post.image) {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted Successfully" });
  } catch (error) {
    console.log("Error in deletePost controller ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
