import Journal from '../model/Journal.js';
import { HTTP } from '../util/const.js';

const journalsController = {
  getAllJournals: async (req, res) => {
    console.log('journalsController.getAllJournals called');

    try {
      const journals = await Journal.find();
      res.status(HTTP.OK).json(journals);
    } catch (err) {
      console.error(`Error in journalsController.getAllJournals: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = 'journalsController.getAllJournals';
      throw error;
    }
  },

  getJournalById: async (req, res) => {
    console.log('journalsController.getJournalById called with ID:', req.params.id);

    try {
      const journal = await Journal.findById(req.params.id);
      if (!journal) {
        const error = new Error('Journal not found by ID: ' + req.params.id);
        error.status = HTTP.NOT_FOUND;
        error.controller = 'journalsController.getJournalById';
        throw error;
      }
      res.status(HTTP.OK).json(journal);
    } catch (err) {
      console.error(`Error in journalsController.getJournalById: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = 'journalsController.getJournalById';
      throw error;
    }
  },

  createJournal: async (req, res) => {
    console.log('journalsController.createJournal called with body:', req.body);

    const journal = new Journal(req.body);
    try {
      const savedJournal = await journal.save();
      res.status(HTTP.CREATED).json(savedJournal);
    } catch (err) {
      console.error(`Error in journalsController.createJournal: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.BAD_REQUEST;
      error.controller = 'journalsController.createJournal';
      throw error;
    }
  },

  updateJournal: async (req, res) => {
    console.log('journalsController.updateJournal called with ID:', req.params.id);
    console.log('Update data:', req.body);

    try {
      const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!updatedJournal) {
        const error = new Error('Journal not found by ID: ' + req.params.id);
        error.status = HTTP.NOT_FOUND;
        error.controller = 'journalsController.updateJournal';
        throw error;
      }
      res.status(HTTP.OK).json(updatedJournal);
    } catch (err) {
      console.error(`Error in journalsController.updateJournal: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.BAD_REQUEST;
      error.controller = 'journalsController.updateJournal';
      throw error;
    }
  },

  deleteJournal: async (req, res) => {
    try {
      const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
      if (!deletedJournal) {
        const error = new Error('Journal not found by ID: ' + req.params.id);
        error.status = HTTP.NOT_FOUND;
        error.controller = 'journalsController.deleteJournal';
        throw error;
      }
      res.status(HTTP.OK).json({ message: 'Journal deleted successfully' });
    } catch (err) {
      console.error(`Error in journalsController.deleteJournal: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = 'journalsController.deleteJournal';
      throw error;
    }
  },

  getJournalsByIdUser: async (req, res) => {
    try {
      const journals = await Journal.find({ idUser: req.params.idUser });
      if (!journals)
        return res.status(HTTP.NOT_FOUND).json({ message: 'No journals found for this user' });
      res.status(HTTP.OK).json(journals);
    } catch (err) {
      console.error(`Error in journalsController.getJournalsByIdUser: ${err}`);
      const error = new Error(err.message || 'Internal Server Error');
      error.status = HTTP.INTERNAL_SERVER_ERROR;
      error.controller = 'journalsController.getJournalsByIdUser';
      throw error;
    }
  }
};
export default journalsController;
