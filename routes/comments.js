import { Router } from "express";
import commentsController from "../controllers/commentsController.js";
import {
  commentValidationRules,
  commentUpdateValidationRules,
  idValidationRules,
  validate
} from "../helpers/validate.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const router = Router();
router.get(
  /*
        #swagger.tags = ['Comments']
        #swagger.summary = 'Get comments by journal ID'
        #swagger.description = 'Returns a list of comments associated with a specific journal ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID of the journal whose comments are to be retrieved',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'List of comments',
            schema: { $ref: '#/definitions/Comment' }
        }
        #swagger.responses[404] = { description: 'Journal not found' }
        #swagger.responses[500] = { description: 'Internal server error' }
    */
  "/id-journal/:id",
  idValidationRules(),
  validate,
  commentsController.getCommentsByIdJournal
);

// #swagger.tags = ['Comments']
// #swagger.summary = 'Create a new comment'
router.post(
  /* 
    #swagger.tags = ['Comments']
    #swagger.summary = 'Create a new comment'
    #swagger.description = 'Creates a new comment for a journal entry'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Comment object to be created',
        required: true,
        schema: { $ref: '#/definitions/Comment' }
        }
    #swagger.responses[201] = {
        description: 'Comment created successfully',
        schema: { $ref: '#/definitions/Comment' }
        }
    #swagger.responses[400] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[422] = { description: 'Unprocessable Entity' }
    */
  "/",
  authenticateJWT,
  commentValidationRules(),
  validate,
  commentsController.createComment
);

router.get(
  /*
    #swagger.tags = ['Comments']
    #swagger.summary = 'Get all comments'
    #swagger.description = 'Returns a list of all comments'
    #swagger.responses[200] = {
        description: 'List of comments',
        schema: { $ref: '#/definitions/Comment' }
        }
    #swagger.responses[500] = { description: 'Internal server error' }
    */
  "/",
  commentsController.getComments
);

router.get(
  /*
    #swagger.tags = ['Comments']
    #swagger.summary = 'Get a comment by ID'
    #swagger.parameters['id'] = { description: 'Comment ID' }
    #swagger.responses[200] = {
        description: 'Comment found',
        schema: { $ref: '#/definitions/Comment' }
    }
    #swagger.responses[404] = { description: 'Comment not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    */
  "/:id",
  idValidationRules(),
  validate,
  commentsController.getCommentById
);

router.put(
  /*
    #swagger.tags = ['Comments']
    #swagger.summary = 'Update a comment'
    #swagger.description = 'Updates an existing comment by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the comment to update',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated comment data',
        required: true,
        schema: { $ref: '#/definitions/Comment' }
    }
    #swagger.responses[200] = {
        description: 'Comment updated successfully',
        schema: { $ref: '#/definitions/Comment' }
    }
    #swagger.responses[404] = { description: 'Comment not found' }
    #swagger.responses[400] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'Internal server error' }
    #swagger.responses[422] = { description: 'Unprocessable Entity' }
    */
  "/:id",
  authenticateJWT,
  idValidationRules(),
  commentUpdateValidationRules(),
  validate,
  commentsController.updateComment
);

router.delete(
  /*
    #swagger.tags = ['Comments']
    #swagger.summary = 'Delete a comment'
    #swagger.description = 'Deletes a comment by its ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID of the comment to delete',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = { description: 'Comment deleted successfully' }
    #swagger.responses[404] = { description: 'Comment not found' }
    #swagger.responses[500] = { description: 'Internal server error' }
    */
  "/:id",
  authenticateJWT,
  idValidationRules(),
  validate,
  commentsController.deleteComment
);

export default router;
