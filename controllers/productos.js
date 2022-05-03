const Producto = require('../modelos/producto');

/**
 * Método para obtener el listado de productos.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getProductos = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        await Producto.find().then( productos => {
            res.status(200).json({
                ok: true,
                msg: "Listado de productos",
                productos
            })
        });


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para obtener un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const getOneProducto = async (req,res)=>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Producto.findById(id).then( producto => {
            res.status(200).json({
                ok: true,
                msg: "Producto",
                producto
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para crear un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createProducto = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    try{

        const producto = new Producto (req.body);

        await producto.save();

        res.status(201).json({
            ok: true,
            msg: 'Producto creada',
            producto
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para actualizar un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updateProducto = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Producto.findByIdAndUpdate(id, req.body, {new: true})
            .then( producto => {
                res.status(201).json({
                    ok: true,
                    msg: 'Producto actualizado',
                    producto
                })
            });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

/**
 * Método para eliminar un producto.
 *  - Si eres Usuario no puedes acceder al método.
 */
const deleteProducto = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Producto.findByIdAndDelete(id).then( producto => {
            res.status(201).json({
                ok: true,
                msg: 'Producto eliminado',
                producto
            });
        });

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador"
        });
    }

}

module.exports = {
    getProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto
}
