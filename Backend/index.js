const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const orderFilePath = path.join(__dirname, "orders.json");

const readFileDemo = () => {
    try {
        const data = fs.readFileSync(orderFilePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const writeFileDemo = (orders) => {
    fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2), "utf8");
}

app.post('/orders', (req, res) => {
    const { item, price } = req.body;

    if (!item || !price) {
        return res.status(400).json({
            success: false,
            message: "Item and price are required"
        });
    }

    const orders = readFileDemo();

    const newOrder = {
        id: orders.length + 1,
        item,
        price
    };
    orders.push(newOrder);
    writeFileDemo(orders);
    res.status(200).json(newOrder);
});

app.delete("/orders/:id", (req, res) => {
    const orderID = parseInt(req.params.id, 10);

    let orders = readFileDemo();

    const orderIndex = orders.findIndex(u => u.id === orderID);

    if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        writeFileDemo(orders);
        res.json({
            success: true,
            message: "Order deleted successfully",
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Order not found",
        });
    }
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});
