const express = require('express')
const app = express();
const port = process.env.PORT || 3001;
var nodeFetch = require('node-fetch')
app.use(express.json())


app.listen(port,()=>{
    console.log(`App listen on http://localhost: B ${port}`);
})

app.get('/', (req, res) => {
    res.send('ok')
})


app.get('/buscar_produtos', async (req, res) => {
    const crud = require('./crud')
    res.send(await crud.get('Products'))
})

app.post('/cadastrarProduto', async (req, res) => {
    const crud = require("./crud")
    // const url = `http://destino:3000/resgatar_usuario/${req.body.user}/${req.body.password}`;
    const url = `http://localhost:3000/resgatar_usuario/${req.body.user}/${req.body.password}`;
    nodeFetch(url)
    .then(res => res.text())
    .then(text => {
    if(text){
        // response = crud.save("Products", null, {
        //     'nome': req.body.nome,
        //     'preco': req.body.preco
        // })
        res.send(text);
    }else{
        res.send('deu pt')
    }
    });
    
})



// docker network ls
// docker network create --driver bridge my-network
// docker run -d -p 8080:3000 --name destino --network my-network
// docker run -d -p 8081:3001 --name origem --network my-network
