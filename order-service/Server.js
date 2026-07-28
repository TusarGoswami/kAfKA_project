const express = require("express");
const sendOrder = require("./producer");

const app = express();
app.use(express.json());

let orderID = 1;
app.post("/order", async (req, res) => {

    const order = {
        orderID: orderID++,
        customer: req.body.customer,
        product: req.body.product,
        quantity: req.body.quantity
    };

    try {
        await sendOrder(order);
        res.status(201).json({
            message: "Order created",
            order
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Kafka Error"
        });
    }

});

app.listen(3000, () => {
    console.log("Running at port 3000");
});