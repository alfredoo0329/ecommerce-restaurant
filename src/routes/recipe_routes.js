const { Router } = require('express');
const router = Router();

//recipes info
const recipes = require('../data/recipes.json');
const api_url = '/api/recipes';

//methods of recipes
function isTitleRepeated(new_title) {
    for (const recipe of recipes) {
        let title_repeated = recipe.title == new_title;
        if (title_repeated) return true;
    }
    return false;
}

//get all recipes
router.get(api_url, (_, response) => {
    response.status(200).json(recipes);
});

//get recipe by id
router.get(api_url + '/:id', (request, response) => {
    const {id} = request.params;
    recipes.forEach(recipe => {
        if (recipe.id == id) {
            response.status(200).json(recipe);
            return;
        }
    });
    response.status(500).send('recipe with id #' + id + ' not found');
});

//add new recipe
router.post(api_url, (request, response) => {
    const {image, title, price, tipe, ingredients} = request.body;
    
    if (!(image && title && price && tipe && ingredients)) {
        response.status(500).send('missing data');
        return;
    }

    if (isTitleRepeated(title)) {
        response.status(500).send('title is repeated');
        return;
    }

    const new_id = recipes.length + 1;
    recipes.push({new_id, image, title, price, tipe, ingredients});
    response.status(200).send('recipe added successfully');
});


//modify recipe 
router.post(api_url + '/modify', (request, response) => {
    const {id, image, title, price, tipe, ingredients} = request.body;
    
    if (!(id) || !(image || title || price || tipe || ingredients)) {
        response.status(500).send('missing id or data');
        return;
    }

    recipes.forEach(recipe => {
        if (recipe.id == id) {
            if (image)
                recipe.image = image;
            if (price) 
                recipe.price = price;
            if (tipe) 
                recipe.tipe = tipe;
            if (ingredients) 
                recipe.ingredients = ingredients;
            if (title)
                if (!isTitleRepeated(title)) 
                    recipe.title = title;
                else
                    response.status(200).send('recipe modified successfully but name repeated');  
            response.status(200).send('recipe modified successfully');
            return;
        }
    });

    response.status(500).send('recipe with id #' + id + ' not found');
});

module.exports = router;