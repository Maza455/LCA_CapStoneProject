import express from 'express'
import controller from '../controller/productsController.js'

const router = express.Router();

    router.post('/', controller.createProduct); // ADD PRODUCT

    router.get('/:createdBy', controller.getProductsByCreatedBy); //GET  PRODUCT BY CREATOR

    router.get('/', controller.getAllProducts); // GET ALL PRODUCT

    router.get('/:id', controller.getProductById); //GET  1 PRODUCT

    router.patch('/:id', controller.updateProduct); // UPDATE 1 PRODUCT

    router.delete('/deleteAll', controller.deleteAllProducts); // DELETE ALL PRODUCT

    router.delete('/:id', controller.deleteProduct); // DELETE 1 PRODUCT

    rs.use('/v1/products/', router)

export default {
    router
}
