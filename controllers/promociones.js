const Promocion = require('../modelos/promocion');

/**
 * Método para obtener todas las promociones.
 */
const getPromociones = async (req,res) =>{

    try{

        await Promocion.find()
            .populate('delete_user')
            .then( promociones => {
            res.status(200).json({
                ok: true,
                msg: "Listado de promociones",
                promociones
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
 * Método para obtener una promoción.
 */
const getOnePromocion = async (req,res)=>{

    const id = req.params.id;

    try{

        await Promocion.findById(id)
            .populate('delete_user')
            .then( promocion => {
            res.status(200).json({
                ok: true,
                msg: "Promoción",
                promocion
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
 * Método para crear una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 */
const createPromocion = async (req,res) =>{

    try{

        if(req.usuario.rol === 'USER_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario sin permisos'
            });
        }

        const promocion = new Promocion (req.body);

        await promocion.save();

        res.status(201).json({
            ok: true,
            msg: 'Promoción creada',
            promocion
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., llame a su administrador",
            error
        });
    }

}

/**
 * Método para actualizar una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 */
const updatePromocion = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        await Promocion.findByIdAndUpdate(id, req.body, {new: true})
            .then( promocion => {
                res.status(201).json({
                    ok: true,
                    msg: 'Promoción actualizado',
                    promocion
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
 * Método para eliminar una promoción.
 *  - Si eres Usuario no puedes acceder al método.
 */
const deletePromocion = async (req,res) =>{

    if(req.usuario.rol === 'USER_ROLE'){
        return res.status(401).json({
            ok: false,
            msg: 'Usuario sin permisos'
        });
    }

    const id = req.params.id;

    try{

        const data = await Promocion.findById(id);

        if(!data){
            res.status(404).json({
                ok: false,
                msg: "No se encontro la promoción"
            });
        }

        data.active = false;
        data.delete_date = Date.now();
        data.delete_reason = req.body.reason || 'Sin motivo';
        data.delete_user = req.usuario.id;

        await Promocion.findByIdAndUpdate(id, data, {new: true})
            .then( promocion => {
            res.status(201).json({
                ok: true,
                msg: 'Promoción eliminada',
                promocion
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
    getPromociones,
    getOnePromocion,
    createPromocion,
    updatePromocion,
    deletePromocion
}
