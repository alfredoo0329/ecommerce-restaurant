const { Router } = require('express');
const router = Router();

//ingredients info
const ingredients = require('../data/ingredients.json');
const api_url = '/api/ingredients';

//methods of ingredients
function isNameRepeated(new_name) {
    for (const ingredient of ingredients) {
        let name_repeated = ingredient.name == new_name;
        if (name_repeated) return true;
    }
    return false;
}

//get all ingredients
router.get(api_url, (_, response) => {
    response.json(ingredients);
});

//get ingredient by id
router.get(api_url + '/:id', (request, response) => {
    const {id} = request.params;
    ingredients.forEach(ingredient => {
        if (ingredient.id == id) {
            response.status(200).json(ingredient);
            return;
        }
    });
    response.status(500).send('ingredient with id #' + id + ' not found');
});

//add new ingredient
router.post(api_url, (request, response) => {
    const {name, price_kg, price_item} = request.body;
    
    if (!(name && price_kg && price_item)) {
        response.status(500).send('missing data');
        return;
    }

    if (isNameRepeated(name)) {
        response.status(500).send('name is repeated');
        return;
    }

    const new_id = ingredients.length + 1;
    ingredients.push({new_id, name, price_kg, price_item});
    response.status(200).send('ingredient added successfully');
});

module.exports = router;