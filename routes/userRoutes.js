import express from 'express';
import controller from '../controller/userController.js';

const router = express.Router();

// User endpoints
router.post('/signup', controller.create); // ADD USER
router.get('/', controller.getAll); // GET ALL USERS
router.get('/:id', controller.getOne); // GET 1 USER
router.patch('/:id', controller.update); // UPDATE 1 USER
router.delete('/deleteAll', controller.deleteAll); // DELETE ALL USERS
router.delete('/:id', controller.deleteOne); // DELETE 1 USERS

export default {
    router
};