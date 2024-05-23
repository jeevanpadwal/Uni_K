const express = require("express");
const { createTodo, updateTodo } = require("./types"); 
const app = express();
const { todo } = require("./db");
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.post("/todos", async function (req, res) {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        res.status(400).json({
            msg: "You sent wrong inputs",
        });
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    });

    res.json({
        msg: "Todo created",
    });
});

app.get("/todos", async function (req, res) {
    const todos = await todo.find({});

    res.json({
        todos,
    });
});

app.put("/todos/completed", async function (req, res) {
    const updatePayload = req.body; // Corrected res.body to req.body
    const parsePayload = updateTodo.safeParse(updatePayload);

    if (!parsePayload.success) {
        res.status(400).json({
            msg: "You sent wrong inputs",
        });
        return;
    }

    await todo.updateOne(
        { _id: req.body.id },
        { completed: true }
    );

    res.json({
        msg: "Todo marked as completed",
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
