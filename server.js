const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const { Category, Product, Tag } = require('./models');

//For seeding
const seedTags = require('./seeds/tag-seeds')
const seedProductTags = require('./seeds/product-tag-seeds')
const seedProducts = require('./seeds/product-seeds')
const seedCategories = require('./seeds/category-seeds')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {

  seedCategories();
  seedProducts();
  seedProductTags();
  seedTags();
}).then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});  
})

