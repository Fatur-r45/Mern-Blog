const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: "Fatur Rahman Gandi" },
  });

  Posting.save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Create Blog Post Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Blog berhasil dipanggil",
        data: result,
        total_data: totalItems,
        per_Page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog Post tidak ditemukan");
        error.errorStatus = 400;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  // const title = req.body.title;
  // const image = req.file.path;
  // const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!postId) {
        const err = new Error("Blog Post tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      if (req.file) {
        removeImage(post.image);
        post.image = req.file.path;
        post.title = req.body.title;
        post.body = req.body.body;
      } else {
        post.title = req.body.title;
        post.body = req.body.body;
      }

      post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data berhasil diubah",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Blog Post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data berhasil di hapus",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  console.log("filePath", filePath);
  console.log("dirName:", __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
