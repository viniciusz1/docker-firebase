const { async } = require('@firebase/util');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())




app.get('/buscar_usuarios', (req, res) => {
    const crud = require('./crud')
    crud.get('Users')
        .then(e => {
            console.log(e)
            res.json(e)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
});

async function verificaSeUsuarioExiste(req) {
    const crud = require('./crud')
    let user = null
    const listaUsuarios = await crud.get('Users')
    user = listaUsuarios.find(e => e['Name'] == req.params.usuario && e['Password'] == req.params.senha)

    if(user){
        return user['CPF']
    }
    return false
}

app.get('/resgatar_usuario/:usuario/:senha', async (req, res) => {
    res.send(await verificaSeUsuarioExiste(req))
})


app.post('/cadastrar_usuario', (req, res) => {
    const crud = require('./crud')
    crud.save('Users', null, {
        CPF: req.body.cpf,
        Name: req.body.name,
        Password: req.body.password
    })
        .then(e => {
            res.send(e)
        })
        .catch(err => {
            res.send(err)
        })
})

app.listen(port, () => {
    console.log(`App listen on http://localhost: A ${port}`);
})