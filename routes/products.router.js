const express = require('express');
const faker = require('faker');
//importar logica producto del service
const ProductService = require("../../my-store/service/product.service")
const service = new ProductService
const router = express.Router();

//get all
router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//get id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id)
  res.json(product)
});

//crear
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body)

  res.json({
    message: 'created',
    data: newProduct
  })
})

//edit
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body
  const product = service.update(id,body)
  res.json(product)
});
//delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // const body = req.body
  const product = service.delete(id)
  res.json(product)
});

module.exports = router;
