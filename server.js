const express = require('express')
const Container = require("./container");
const container = new Container("./products.txt");
const app = express();
const PORT = 8080;
const routesProducts = require('./routes/routesProducts')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routesProducts)

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/productos', (req, res) => {
    const productos = container.getAll();
    res.render('pages/list',{productos})
})

app.get('/', (req,res) => {
    res.render('pages/form', {})
})

app.post('/productos',(req,res) => {
    const {body} = req;
    container.save(body);
    res.redirect('/');
})

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));
