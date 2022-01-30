require('dotenv').config();
const sequelize_initializer = require('./src/db');
const sequelize_models = require('./src/models');
const express = require('express');
const jsonBodyParser = require('body-parser').json();
const Sequelize = require('sequelize');
const { addXSecondsToDate } = require('./src/utils');
const { nanoid } = require('nanoid');

const sequelize = sequelize_initializer();
for (const { modelName, attributes, options } of sequelize_models) {
   sequelize.define(modelName, attributes, options);
}

const app = express();
app.use(jsonBodyParser);
app.use((req, res, next) => {
   res.set({
      'Access-Control-Allow-Origin': `http://localhost:3000`,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
   });
   next();
});

app.get('/homepage-posts', async (req, res) => {
   const { Post } = sequelize.models;
   const { Op } = Sequelize;
   const posts = await Post.findAll({
      where: { expirationDate: { [Op.gt]: new Date() } },
      order: [ ['createdAt', 'ASC'] ],
   });
   res.json(posts);
});

app.post('/posts', async (req, res) => {
   const { Post } = sequelize.models;
   const { body: { content } } = req;
   await Post.create({
      uuid: nanoid(),
      content,
      likes: 0,
      expirationDate: addXSecondsToDate(new Date(), 60),
   });
   res.send('Finished.');
});

app.post('/like-post/:uuid', async (req, res) => {
   const { Post } = sequelize.models;
   const { params: { uuid } } = req;
   const { likes, expirationDate } = await Post.findOne({ where: { uuid } });
   await Post.update(
      { likes: likes + 1, expirationDate: addXSecondsToDate(expirationDate, 30) },
      { where: { uuid },
   });
   res.send('Finished.');
});

sequelize.sync({
   force: false,
   logging: false,
})
   .then(() => {
      const serverPort = process.env.SERVER_PORT;
      app.listen(serverPort, () => {
         console.log(`Reddit clone backend listening at http://localhost:${serverPort}`);
      });
   });
