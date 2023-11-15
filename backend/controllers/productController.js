import { v4 as uuidv4 } from "uuid";

let products = [
  {
    id: "1",
    name: "iphone 14",
    price: 300,
  },
  {
    id: "2",
    name: "MacBook Pro",
    price: 800,
  },
  {
    id: "3",
    name: "ipad",
    price: 600,
  },
  {
    id: "4",
    name: "applewatch",
    price: 200,
  },
];

const errorResponse = (statusCode, res, message) => {
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
export const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      message: "get all products",
      payload: products,
    });
  } catch (error) {
    // errorResponse(500, error.message)
    next();
  }
};

export const getSingleProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      const error = new Error(`Product with id ${id} not found!`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: "get single product",
      payload: product,
    });
  } catch (error) {
    // errorResponse(500, error.message)
    next(error);
  }
};

export const deleteProduct = (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      const error = new Error(`Product with id ${id} not found!`);
      error.status = 404;
      throw error;
    }
    const filteredProducts = products.filter((product) => product.id !== id);
    products = filteredProducts;
    res.status(200).json({
      message: "get single product",
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = (req, res) => {
  try {
    const newData = req.body;
    const newProduct = {
      id: uuidv4(),
      name: newData.name,
      price: newData.price,
    };
    products.push(newProduct);
    res.status(201).json({
      message: "Product is created",
      payload: products,
    });
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const {name,price} = req.body;
    const product = products.find((product) => product.id === id);
    if (!product) {
      const error = new Error(`Product with id ${id} not found!`);
      error.status = 404;
      throw error;
    }
    products
      .filter((product) => product.id === id)
      .map((product) => {
        if(name){
          product.name = name;
        }
        if(price){
          product.price = price;
        }
      });

    res.status(200).json({
      message: "Product is updated",
      payload: product,
    });
    console.log(product)
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};
