import express from "express";

//Import controller
import mainController from "../controllers/mainController.js";

const mainRouter = express.Router();

// Page d'accueil 
mainRouter.get('/', mainController.getHomepage);

//Page catalogue
mainRouter.get('/catalogue', mainController.getCatalogue);

//Page produit
mainRouter.get('/products/:coffeeId', mainController.getProductPage,);

// Route pour la page boutique
mainRouter.get('/boutique', (req, res) => {
    res.render('boutique'); // Rend la vue boutique.ejs
});


mainRouter.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || "Une erreur est survenue";
    res.status(status).render("error", {
        error: {
            status: status,
            message: message
        }
    });
});

export default mainRouter;