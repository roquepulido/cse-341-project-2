import Journal from "../model/Journal.js";
import Comment from "../model/Comment.js";
import { HTTP } from "../util/const.js";

const journalsController = {
  getAllJournals: async (req, res) => {
    console.debug("[GET] /journals - journalsController.getAllJournals", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const journals = await Journal.find();
      res.status(HTTP.OK).json(journals);
    } catch (err) {
      console.error(`Error in journalsController.getAllJournals: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = "journalsController.getAllJournals";
      throw error;
    }
  },

  getJournalById: async (req, res) => {
    console.debug("[GET] /journals/:id - journalsController.getJournalById", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const journal = await Journal.findById(req.params.id);
      if (!journal) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "Journal not found by ID: " + req.params.id
        });
      }
      const comments = await Comment.find({ journalId: journal._id })
        .select("-journalId")
        .populate("commenter", "name profilePicture");
      const journalWithComments = {
        ...journal.toObject(),
        comments
      };
      res.status(HTTP.OK).json(journalWithComments);
    } catch (err) {
      console.error(`Error in journalsController.getJournalById: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = "journalsController.getJournalById";
      throw error;
    }
  },

  createJournal: async (req, res) => {
    console.debug("[POST] /journals - journalsController.createJournal", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    const journal = new Journal(req.body);
    try {
      const savedJournal = await journal.save();
      res.status(HTTP.CREATED).json(savedJournal);
    } catch (err) {
      console.error(`Error in journalsController.createJournal: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.BAD_REQUEST;
      error.controller = "journalsController.createJournal";
      throw error;
    }
  },

  updateJournal: async (req, res) => {
    console.debug("[PUT] /journals/:id - journalsController.updateJournal", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!updatedJournal) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "Journal not found by ID: " + req.params.id
        });
      }
      res.status(HTTP.OK).json(updatedJournal);
    } catch (err) {
      console.error(`Error in journalsController.updateJournal: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.BAD_REQUEST;
      error.controller = "journalsController.updateJournal";
      throw error;
    }
  },

  deleteJournal: async (req, res) => {
    console.debug("[DELETE] /journals/:id - journalsController.deleteJournal", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
      if (!deletedJournal) {
        return res.status(HTTP.NOT_FOUND).json({
          message: "Journal not found by ID: " + req.params.id
        });
      }
      res.status(HTTP.OK).json({ message: "Journal deleted successfully" });
    } catch (err) {
      console.error(`Error in journalsController.deleteJournal: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = "journalsController.deleteJournal";
      throw error;
    }
  },

  getJournalsByIdUser: async (req, res) => {
    console.debug("[GET] /journals/idUser/:id - journalsController.getJournalsByIdUser", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const journals = await Journal.find({ idUser: req.params.idUser });
      if (!journals || journals.length === 0) {
        return res.status(HTTP.NOT_FOUND).json({ message: "No journals found for this user" });
      }
      res.status(HTTP.OK).json(journals);
    } catch (err) {
      console.error(`Error in journalsController.getJournalsByIdUser: ${err}`);
      const error = new Error(err.message || "Internal Server Error");
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = "journalsController.getJournalsByIdUser";
      throw error;
    }
  }
};
export default journalsController;
