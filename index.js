const express = require("express");
const mongoose = require("mongoose")
const PORT = process.env.port || 5006;
const corsMiddleware = require('./middleware/cors.middleware')
const cors = require('cors');
const formRouter = require('./routes/form.routes');
const userRouter = require('./routes/user.routes');

const app = express();
app.use(corsMiddleware)
app.use(cors());
app.use(express.json())

app.use("/forms", formRouter);
app.use("/auth", userRouter);

app.get("/", (req, res) => {
    res.json({ message: "Nihay!" });
});

const start = async () => {
    try {
        await mongoose.connect(process.env.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()