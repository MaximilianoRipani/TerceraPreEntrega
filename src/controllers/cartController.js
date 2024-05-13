import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
export const getCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId })
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
}

export const createCart = async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear carrito: ${error}`)
    }

}

export const insertProductCart = async (req, res) => {
    try {
        if (req.user.rol == "User") {
            const cartId = req.params.cid
            const productId = req.params.pid
            const { quantity } = req.body
            const cart = await cartModel.findById(cartId)

            const indice = cart.products.findIndex(product => product.id_prod == productId)

            if (indice != -1) {
                //Consultar Stock para ver cantidades
                cart.products[indice].quantity = quantity //5 + 5 = 10, asigno 10 a quantity
            } else {
                cart.products.push({ id_prod: productId, quantity: quantity })
            }
            const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)
            res.status(200).send(mensaje)
        } else {
            res.status(403).send("Usuario no autorizado")
        }

    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }

}

export const createTicket = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        const prodSinStock = []
        if (cart) {
            cart.products.forEach(async (prod) => {
                let producto = await productModel.findById(prod.id_prod)
                if (producto.stock - prod.quantity < 0) {
                    prodSinStock.push(producto)
                }
            })
            if (prodSinStock.length == 0) {
                //Finalizar compra
            } else {
                //Retornar productos sin stock
            }

        } else {
            res.status(404).send("Carrito no existe")
        }

    } catch (e) {
        res.status(500).send(e)
    }


}
