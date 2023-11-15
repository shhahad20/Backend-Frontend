import { check } from "express-validator";

export const producutIdValidator = [
  check("id").isNumeric().withMessage("product id must be a number"),
];

export const crateProducutValidator = [
  check("name")
    .notEmpty()
    .withMessage("product name must not be empty.")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters long."),
  check("price").isNumeric().withMessage("product price must be a number"),
];
export const updateProducutValidator = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters long."),
  check("price").optional().isNumeric().withMessage("product price must be a number"),
];