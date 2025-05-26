import { Router } from "express";
import {
  journalValidationRules,
  idValidationRules,
  validate,
  journalUpdateValidationRules
} from "../helpers/validate.js";
import journalsController from "../controllers/journalsController.js";

const router = Router();
// returns all journals
router.get(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Get all journals'
    #swagger.description = 'Returns a list of all journals'
    #swagger.responses[200] = {
        description: 'List of journals',
        schema: { $ref: '#/definitions/Journal' }
    }
    #swagger.responses[500] = { description: 'Internal server error' }
*/
  "/",
  journalsController.getAllJournals
);
// returns a journal by ID
router.get(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Get a journal by ID'
    #swagger.description = 'Returns a single journal by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the journal to retrieve',
      required: true,
      type: 'string'
    }
  */
  "/:id",
  idValidationRules(),
  validate,
  journalsController.getJournalById
);
// returns journals by user ID
router.get(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Get journals by user ID'
    #swagger.description = 'Returns a list of journals associated with a specific user ID'
    #swagger.parameters['idUser'] = {
      in: 'path',
      description: 'ID of the user whose journals are to be retrieved',
      required: true,
      type: 'string'
    }
  */
  "/idUser/:id",
  idValidationRules(),
  validate,
  journalsController.getJournalsByIdUser
);
// creates a new journal
router.post(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Create a new journal'
    #swagger.description = 'Creates a new journal with the provided data'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Journal data',
      required: true,
      schema: { $ref: '#/definitions/Journal' }
    }
    #swagger.responses[201] = {
        description: 'Journal created',
        schema: { $ref: '#/definitions/Journal' }
    }
   #swagger.responses[400] = { description: 'Invalid data' }
*/
  "/",
  journalValidationRules(),
  validate,
  journalsController.createJournal
);
// updates a journal by ID
router.put(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Update a journal by ID'
    #swagger.description = 'Updates an existing journal with the provided data'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the journal to update',
      required: true,
      type: 'string'
    }  
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated journal data',
      required: true,
      schema: { $ref: '#/definitions/Journal' }
    }
    #swagger.responses[200] = {
        description: 'Journal updated',
        schema: { $ref: '#/definitions/Journal' }
    }
    #swagger.responses[404] = { description: 'Journal not found' }
    #swagger.responses[400] = { description: 'Invalid data' }
    #swagger.responses[500] = { description: 'Internal server error' }
*/
  "/:id",
  idValidationRules(),
  journalUpdateValidationRules(),
  validate,
  journalsController.updateJournal
);
// deletes a journal by ID
router.delete(
  /*
    #swagger.tags = ['Journal']
    #swagger.summary = 'Delete a journal by ID'
    #swagger.description = 'Deletes a journal by its ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID of the journal to delete',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = { description: 'Journal deleted' }
    #swagger.responses[404] = { description: 'Journal not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
*/
  "/:id",
  idValidationRules(),
  validate,
  journalsController.deleteJournal
);

export default router;
