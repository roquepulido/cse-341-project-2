import { body, param, validationResult } from "express-validator";

const idUserValidationRules = () => {
  return [param("id").isMongoId().withMessage("Invalid user ID")];
};

const commentValidationRules = () => {
  return [
    body("journalId").isMongoId().withMessage("Invalid journal ID"),
    body("text").notEmpty().withMessage("Comment text is required"),
    body("commenter").isMongoId().withMessage("Invalid commenter ID")
  ];
};

const journalValidationRules = () => {
  return [
    body("title").notEmpty().withMessage("Param 'title' is required"),
    body("content").notEmpty().withMessage("Param 'content' is required"),
    body("author").isMongoId().withMessage("Param 'author' is Invalid ID"),
    body("isPublic").isBoolean().withMessage("Param 'isPublic' must be a boolean"),
    body("allowedViewers")
      .optional()
      .isArray()
      .isMongoId()
      .withMessage("Param 'allowedViewers' must be an array of user IDs"),
    body("tags").optional().isArray().withMessage("Param 'tags' must be an array of strings"),
    body("mood").optional().isString().withMessage("Param 'mood' must be a string"),
    body("location").optional().isString().withMessage("Param 'location' must be a string")
  ];
};

const journalUpdateValidationRules = () => [
  body("title").optional().notEmpty().withMessage("Param 'title' is required"),
  body("content").optional().notEmpty().withMessage("Param 'content' is required"),
  body("author").optional().isMongoId().withMessage("Param 'author' is Invalid ID"),
  body("isPublic").optional().isBoolean().withMessage("Param 'isPublic' must be a boolean"),
  body("allowedViewers")
    .optional()
    .isArray()
    .withMessage("Param 'allowedViewers' must be an array"),
  body("tags").optional().isArray().withMessage("Param 'tags' must be an array of strings"),
  body("mood").optional().isString().withMessage("Param 'mood' must be a string"),
  body("location").optional().isString().withMessage("Param 'location' must be a string")
];

const userValidationRules = () => {
  return [
    body("oauthId").notEmpty().withMessage("Param 'oauthId' is required"),
    body("email").isEmail().withMessage("Param 'email' must be a valid email"),
    body("name").notEmpty().withMessage("Param 'name' is required"),
    body("profilePicture")
      .optional()
      .isURL()
      .withMessage("Param 'profilePicture' must be a valid URL")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors
  });
};

export {
  idUserValidationRules,
  journalValidationRules,
  journalUpdateValidationRules,
  commentValidationRules,
  userValidationRules,
  validate
};
