import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
  });
  const [updateProduct, setUpdateProduct] = useState({
    id:0,
    name: '',
    price: 0,
  })
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3003/products");
    setProducts(data.payload);
  };
  const handelDelete = async (id: number) => {
    await axios.delete(`http://localhost:3003/products/${id}`);
    fetchProducts();
  };
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setNewProduct((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };
  const handelUpdateChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUpdateProduct((prevProduct) => {
      return { ...prevProduct, [name]: value };
    });
  };

  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post(`http://localhost:3003/products`, newProduct);
      toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handelCreateProduct = (event: FormEvent) => {
    event.preventDefault();
    createProduct(newProduct);
    setNewProduct({
      name: "",
      price: 0,
    });
  };
  const updatedProduct = async (id:number, name:string, price:number) => {
    try {
      const response = await axios.put(`http://localhost:3003/products/${id}`,{
        id:id,
        name:name,
        price:price,
      });
      setUpdateProduct({
        id:id,
        name: name,
        price: price,
      });
      // toast.success(response.data.message);
      fetchProducts();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handelUpdateProduct = (event: FormEvent) => {
    event.preventDefault();
    updatedProduct(updateProduct.id, updateProduct.name, updateProduct.price);
    toast.success('Prouduct is updated');
    setUpdateProduct({
      id:0,
      name: "",
      price: 0,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <ToastContainer />
      <div>
            <form action="" onSubmit={handelUpdateProduct}>
              <input
                type="text"
                name="name"
                value={updateProduct.name}
                onChange={handelUpdateChanges}
                placeholder="Product name"
              />
              <input
                type="number"
                name="price"
                value={updateProduct.price}
                onChange={handelUpdateChanges}
                placeholder="Price"
              />
              <button type="submit">
                Save
              </button>
            </form>
          </div>
      <div>
        <form action="" onSubmit={handelCreateProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handelChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handelChange}
            required
          />
          <button type="submit">Create product</button>
        </form>
      </div>
      <div>
        {products.length > 0 &&
          products.map((product) => {
            const { id, name, price } = product;
            return (
              <article key={id}>
                <h2>{name}</h2>
                <h2>{price}</h2>
                <button
                  onClick={() => {
                    handelDelete(id);
                  }}
                >
                  Delete
                </button>
                <button                   onClick={() => {
                    updatedProduct(id, name, price);
                  }}>Update</button>
              </article>
            );
          })}
      </div>
    </>
  );
}

export default App;
