import express, { response } from "express"
import "dotenv/config";

import mainRouter from "./app/routers/mainRouter.js";


const app = express();
const port = 3000;

app.use(express.static("integration"));

// Ajouter la configuration du moteur de modèles
app.set("views", "./app/views");
app.set("view engine", "ejs");


// * ROUTERS
app.use(mainRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
