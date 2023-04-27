const express = require ('express');
const server = express();
const handlebars = require('express-handlebars');
const viewRouter = require('./routes/viewsRoutes/viewsRouter');
const {Server} = require('socket.io');
const {sockets} = require('./sockets');
// const app = express();

const PUERTO = 8080;

const httpServer = server.listen(PUERTO,()=>console.log(`Listening in port ${PUERTO}`));
//import Routes
//Falta corregir Routes
const productsRouter = require('./routes/products/products.js');
const cartsRouter = require('./routes/cart/cart.js');

//Socket
const socketServer = new Server(httpServer);
sockets(socketServer);

//View Engine
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');


//Middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));
// server.use(router);

//Static archives
server.use(express.static(__dirname + '/public'))

//Routes
server.use('/api/products', productsRouter);
server.use('/api/carts', cartsRouter);
server.use('/', viewRouter);

//Listen Server
// server.listen(PUERTO, () =>{
//     console.log(`Servidor Iniciado en puerto ${PUERTO}`);
// });
