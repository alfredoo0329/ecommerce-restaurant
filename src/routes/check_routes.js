const { Router } = require('express');
const router = Router();

//check info
const check = require('../data/check.json');
const api_url = '/api/check';
const recipes = require('../data/recipes.json');

//get check
router.get(api_url, (_, response) => {
    response.status(200).json(check);
});

//add recipe to check
router.post(api_url, (request, response) => {
    const {id} = request.params;
    
    recipes.forEach(recipe => {
        if (recipe.id == id) {
            
            const {price}=recipe.price;
            const {cantidad} = request.params;

            const newTotal = (price*cantidad + check.total);
    
            check.total = newTotal;
            check.wIVA = (newTotal*.16)+newTotal;
            
            check.platillos.push({id,cantidad,price});
    
            response.status(200).send('recipe added to check');
            return;
        }
    });  
    response.status(500).send('recipe not found');
});

module.exports = router;