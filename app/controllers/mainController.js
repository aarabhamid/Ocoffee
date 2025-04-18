import dataMapper from "../dataMapper.js";

const mainController = {
    //Méthode pour la page d'accueil
    getHomepage: async (req, res, next) => {
        try {
            const coffee = await dataMapper.getLastThreeCoffee();
            res.locals.coffee = coffee;
            res.render("homepage");
        } catch (error) {
            error.status = 404;
            return next(error);
        }
    },

    getCatalogue: async (req, res) => {
        try {
            const originName = req.query.filter;
            const coffees = await dataMapper.getAllCoffees(originName);
            const allOrigins = await dataMapper.getAllOrigins();
            res.status(200).render("catalogue", { coffees, allOrigins, selectedOrigin: originName });
        } catch (error) {
            console.error("Erreur lors de la récupération des cafés :", error);
            res.status(500).send(`Une erreur est arrivée : ${error}`);
        }
    }
    ,
    

    //Méthode pour la page produit
    getProductPage: async (req, res, next) => {
        const coffeeId = Number(req.params.coffeeId);
        try {
            const coffee = await dataMapper.getOneCoffee(coffeeId);
            if (!coffee) {
                const error = new Error("Le café recherché n'existe pas");
                error.status = 404;
                return next(error);
            }
            res.locals.coffee = coffee;
            res.render("products");
        } catch (error) {
            error.status = 404;
            return next(error);
        }
    },
}

export default mainController;