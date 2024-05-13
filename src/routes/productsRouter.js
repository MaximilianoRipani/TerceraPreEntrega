import { Router } from "express";
import passport from "passport";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

const productsRouter = Router()

productsRouter.get('/', getProducts);

productsRouter.get('/:pid', getProduct)

productsRouter.post('/', passport.authenticate('jwt', { session: false }), createProduct)

productsRouter.put('/:pid', passport.authenticate('jwt', { session: false }), updateProduct)

productsRouter.delete('/:pid', passport.authenticate('jwt', { session: false }), deleteProduct)

export default productsRouter