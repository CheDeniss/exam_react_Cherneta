const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
const port = 3001;
const API_KEY = '5943be12-8ea3-e1f4-cd65-4a22471b4067';

app.use(cors())



app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/getQuestions', async (req, res) => {
    const apiUrl = 'https://opentdb.com/api.php'
    const { amount = '', category = '', difficulty = '', type = '' } = req.query;

    const params = {
        amount: amount || 12,
        category: category || undefined,
        difficulty: difficulty || undefined,
        type: type || undefined,
        encode: 'url3986',
    };

   const response = await axios.get(apiUrl, {params}).catch((error) => {throw new Error(error.response.status)})
   res.json(response.data)
})

app.get('/getThematics', async (req, res) => {
       const apiUrl = 'https://opentdb.com/api_category.php'
       const response = await axios.get(apiUrl).catch((error) => {throw new Error(error.response.status)})
        console.log('From server getThematics -> ', response.data)
       res.json(response.data.trivia_categories)

})