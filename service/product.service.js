const faker = require("faker");
const boom = require("@hapi/boom")

class ProductService {

  constructor() {
    this.products = []
    this.generate()
  }

  async generate() {

    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    if (data.length === 0) {
      throw boom.notAcceptable("Products not found")
    } else {
      const newProduct = {
        id: faker.datatype.uuid(),
        ...data,
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      }
      this.products.push(newProduct)
      return newProduct
    }



  }
  find() {
    // return new Promise((resolve,reject)=>{
    //   setTimeout(() => {
    //     resolve(this.products)
    //   }, 5000);
    // })
    if (this.products.length === 0) {
      throw boom.notFound("Products not found")
    }
    else {
      return this.products
    }


  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound("Product not found")
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block")
    }
    return product

  }

  async update(id, change) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound("Product not found")
    } else {
      const product = this.products[index]
      this.products[index] = {
        ...product,
        ...change
      }
      return this.products[index]
    }

  }

  async delete(id) {

    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound("Product not found")
    } else {
      this.products.splice(index, 1)
      return { id };
    }
  }

}

module.exports = ProductService
