## Backend Requirements:
* Notes to remember: 
    - npm init 
    - npm install express
    - remember to split 3parties imports from the others and make theme on the first on top.
    - to use import do not forget to add "type": "module" in json file.
    - npm install --save-dev nodemon
    - creat the env file inside the root important!
    - npm install dotenv --save
    - see 56 min 20 for the config file.
    - npm install cors
    - npm install --save-dev morgan
    - to control the request number use npm install express-rate-limit -> min 31
    - use MVC
    - npm install express-validator
    - npm i uuid : id creator


- Set up the files and folders.
- Build the server.
- handle client and server errors with express error middleware
- setup the cors, dev setup: nodemon, morgan
- HTTP Requests
- GET: /products -> get All products
- GET: /products/:id -> get a single product
- DELETE: /products/:id -> delete single product based on id
- POST: /products -> create the product
- PUT: /products/:id -> update the product
- Add express-validator validation

## Frontend Requirements:
* Notes to remember: 
    - install react in the frontend folder npm create vite@latest & npm install.
    - to run it: npm run dev
    - npm install axios
    - npm install --save react-toastify fro messages.

- Read all the products from the API
- create a product (call the API)
- Delete a product (call the API)
- Update product (call the API)