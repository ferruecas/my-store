const express = require('express');
const faker = require('faker');
//importar logica producto del service
const ProductService = require("../../my-store/service/product.service")
const service = new ProductService
const router = express.Router();

//get all
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

//get id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id)
  res.json(product)
});

//crear
router.post('/', async (req, res) => {

  const body = req.body;
  const newProduct = await service.create(body)

  res.json({
    message: 'created',
    data: newProduct
  })
})

//edit
router.patch('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const body = req.body
    const product = await service.update(id,body)
    res.json(product)

  } catch (error) {
    res.status(400).json({
      message:error.message
    })

  }

});
//delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // const body = req.body
  const product = await service.delete(id)
  res.json(product)
});

module.exports = router;
