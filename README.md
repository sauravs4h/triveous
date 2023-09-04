# E-Commerce Project

Welcome to our E-Commerce project! This project is built using Node.js and Express and serves as an e-commerce platform. This README provides an overview of the API routes available in the application.

**Base URL:** `http://localhost:8080`

**Deploy URL:** `https://triveous-8zpt.onrender.com/`

**Demo video link** `https://drive.google.com/file/d/15L4FPwk_5olQ4iLsLBwJjPEEN6uefpYW/view?usp=sharing`

## Table of Contents

1. [User Routes](#user-routes-not-authenticate)  /user
2. [Category Routes](#category-routes-not-authenticate)  /category
3. [Product Routes](#product-routes-authenticate)  /product
4. [Cart Routes](#cart-routes-authenticate)   /cart
5. [Order Routes](#order-routes-authenticate)  /order

## User Routes (Not Authenticate Route)

| Route       | Method | Description              | Request Body        |
|-------------|--------|--------------------------|---------------------|
| `/signup`   | POST   | User registration        | `{ Name, Email, Password }` |
| `/login`    | POST   | User login               | `{ Email, Password }` |

## Category Routes (Not Authenticate Route)

| Route           | Method | Description                  | Request Body        |
|-----------------|--------|------------------------------|---------------------|
| `/allcategory`  | GET    | Get all categories           | `{}`                |
| `/addcategory`  | POST   | Add a new category           | `{ Name (name of category) }`          |

## Product Routes (Authenticate Route)

| Route                 | Method | Description                   | Request Body                                   |
|-----------------------|--------|-------------------------------|------------------------------------------------|
| `/getallproduct`      | GET    | Get all products              | `{}`                                           |
| `/getproductbyid/:id` | GET    | Get product by ID            | `{}`                                           |
| `/addproduct`         | POST   | Add a new product            | `{ title, price, description, availability, category }` |

## Cart Routes (Authenticate Route)

| Route                | Method | Description                  | Request Body                                   |
|----------------------|--------|------------------------------|------------------------------------------------|
| `/addtocart`         | POST   | Add a product to the cart    | `{ productid, quantity, total_price }` |
| `/allcart`           | GET    | Get all items in the cart    | `{}`                                           |
| `/update/:id`        | PATCH  | Update quantity in the cart  | `{ quantity }`                                 |
| `/deletecart/:id`    | DELETE | Delete item from the cart    | `{}`                                           |
| `/totalprice`        | GET    | Calculate total cart price   | `{}`                                           |

## Order Routes (Authenticate Route)

| Route               | Method | Description                | Request Body |
|---------------------|--------|----------------------------|--------------|
| `/placeorder`       | POST   | Place  new order          | `{}`         |
| `/allorders`        | GET    | Get user's all orders      | `{}`         |
| `/order/:id`        | GET    | Get order by ID            | `{}`         |
| `/deleteorder/:id`  | DELETE | Delete an order by ID      | `{}`         |


