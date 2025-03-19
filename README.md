# Node_API_MichaelMatternFeatures
Create, Read, Update, Delete (CRUD) for:
Items (e.g., product listings)
Customers (e.g., user information)
Orders (with status updates like “pending,” “paid,” “cancelled”)
Asynchronous operation: a simulated delay for payment submission.
Data persistence using MongoDB.
Swagger documentation: auto-generated API docs served at /api-docs.
Prerequisites
Node.js (v14+ recommended)
npm or yarn
MongoDB (local or cloud Atlas instance)
Installation
Clone the repository:
git clone https://github.com/your-username/express-mongodb-order-system.git
cd express-mongodb-order-system
Install dependencies:
npm install
Update MongoDB connection string in index.js (or set an environment variable if desired):
js
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
Start the server:
npm start
(By default, it runs on http://localhost:3000.)
Usage
Once the server is running:

API Base URL: http://localhost:3000
Items endpoints: POST /items, GET /items, PATCH /items/:id, DELETE /items/:id
Customers endpoints: POST /customer, GET /customer, PATCH /customer/:id, DELETE /customer/:id
Orders endpoints:
POST /orders (create)
GET /orders (get all)
PATCH /orders/:id/cancel (cancel an order)
POST /orders/:id/payment (submit payment, with delay)
DELETE /orders/:id (delete)
API Documentation
Swagger is used for API documentation. Once the server is running, navigate to:


http://localhost:3000/api-docs
You’ll see interactive documentation allowing you to explore and test each endpoint.

Testing
You can use Postman to test each endpoint. A few basic example tests:

Create an Item

POST /items
JSON body: {"name": "Wireless Mouse", "description": "Ergonomic mouse"}
Create a Customer

POST /customer
JSON body: {"name": "John Doe", "email": "john@example.com"}
Create an Order

POST /orders
JSON body:
json
{
  "customerId": "<insert valid customer _id>",
  "items": [
    {
      "product": "Laptop",
      "quantity": 1,
      "price": 1200
    }
  ],
  "total": 1200
}
Cancel an Order

PATCH /orders/<orderId>/cancel
Submit Payment (with simulated delay)

POST /orders/<orderId>/payment
Check the server responses and verify your database updates in MongoDB.
