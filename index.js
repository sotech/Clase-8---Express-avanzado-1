const { Producto } = require("./producto");
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let listaProductos = [];

//Listar todos los productos
app.get('/api/productos/listar', (req, res) => {
    //Hay productos?
    if(listaProductos.length > 0){
        res.json({
            productos: listaProductos
        });
    }else{
        res.json({
            error:'no hay productos cargados'
        });
    }
});

//Listar un unico producto por ID
app.get('/api/productos/listar/:id', (req, res) => {
    if(req.params.id < 0 || req.params.id > listaProductos.length - 1){
        res.json({
            error: 'producto no encontrado'
        });
    }else{
        res.json({
            producto: listaProductos[req.params.id]
        })
    }
});

//Almacenar un nuevo producto. Retornar el producto creado
app.post('/api/productos/guardar', (req, res) => {
    let producto = new Producto(req.body.title, req.body.price, req.body.thumbnail);
    producto.id = listaProductos.length;
    listaProductos.push(producto);
    res.json(producto);
});

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto " + port);
});