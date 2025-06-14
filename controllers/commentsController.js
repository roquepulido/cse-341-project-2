import Comment from "../model/Comment.js";
import { HTTP } from "../util/const.js";

const commentsController = {
  // get all comments
  getComments: async (req, res) => {
    console.debug("[GET] /comments - commentsController.getComments", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const comments = await Comment.find().populate("commenter", "name profilePicture");
      res.status(HTTP.OK).json(comments);
    } catch (error) {
      console.error(`Error in commentsController.getComments: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.INTERNAL_SERVER_ERROR;
      err.controller = "commentsController.getComments";
      throw err;
    }
  },

  // get comment by ID
  getCommentById: async (req, res) => {
    console.debug("[GET] /comments/:id - commentsController.getCommentById", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const comment = await Comment.findById(req.params.id).populate(
        "commenter",
        "name profilePicture"
      );
      if (!comment) {
        res.status(HTTP.NOT_FOUND).json({
          message: "Comment not found by ID: " + req.params.id
        });
        return;
      }
      res.status(HTTP.OK).json(comment);
    } catch (error) {
      console.error(`Error in commentsController.getCommentById: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.INTERNAL_SERVER_ERROR;
      err.controller = "commentsController.getCommentById";
      throw err;
    }
  },

  // create a new comment
  createComment: async (req, res) => {
    console.debug("[POST] /comments - commentsController.createComment", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    const comment = new Comment(req.body);
    try {
      const savedComment = await comment.save();
      res.status(HTTP.CREATED).json(savedComment);
    } catch (error) {
      console.error(`Error in commentsController.createComment: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.BAD_REQUEST;
      err.controller = "commentsController.createComment";
      throw err;
    }
  },

  updateComment: async (req, res) => {
    console.debug("[PUT] /comments/:id - commentsController.updateComment", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!updatedComment) {
        res.status(HTTP.NOT_FOUND).json({
          message: "Comment not found by ID: " + req.params.id
        });
      } else {
        res.status(HTTP.OK).json(updatedComment);
      }
    } catch (error) {
      console.error(`Error in commentsController.updateComment: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.INTERNAL_SERVER_ERROR;
      err.controller = "commentsController.updateComment";
      throw err;
    }
  },

  deleteComment: async (req, res) => {
    console.debug("[DELETE] /comments/:id - commentsController.deleteComment", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      if (!deletedComment) {
        res.status(HTTP.NOT_FOUND).json({
          message: "Comment not found by ID: " + req.params.id
        });
      } else {
        res.status(HTTP.OK).json({ message: "Comment deleted successfully" });
      }
    } catch (error) {
      console.error(`Error in commentsController.deleteComment: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.INTERNAL_SERVER_ERROR;
      err.controller = "commentsController.deleteComment";
      throw err;
    }
  },
  getCommentsByIdJournal: async (req, res) => {
    console.debug("[GET] /comments/id-journal/:id - commentsController.getCommentsByIdJournal", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const comments = await Comment.find({ journalId: req.params.id }).populate(
        "commenter",
        "name profilePicture"
      );
      if (!comments || comments.length === 0) {
        res.status(HTTP.NOT_FOUND).json({
          message: "No comments found for this journal ID"
        });
      } else {
        res.status(HTTP.OK).json(comments);
      }
    } catch (error) {
      console.error(`Error in commentsController.getCommentsByIdJournal: ${error}`);
      const err = new Error(error.message || "Internal Server Error");
      err.status = HTTP.INTERNAL_SERVER_ERROR;
      err.controller = "commentsController.getCommentsByIdJournal";
      throw err;
    }
  }
};
export default commentsController;
