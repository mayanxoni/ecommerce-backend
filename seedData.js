const faker = require('faker');
const ProductModel = require('./src/api/models/product.model');

let i = 0;
while (i < 10) {
	const newProduct = new ProductModel({
		sku_id: faker.finance.iban(),
		name: faker.commerce.productName(),
		image: faker.image.image(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		featured: faker.datatype.boolean()
	});
	newProduct.save()
	i++;
}