const express = require("express");
// const { google } = require("googleapis");
const app = express();

// app.set('views', __dirname + '/views')

const clienteRota = require('./route/rotasClientes');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/bazar-desconto', clienteRota);

app.listen('3000', (req, res) => console.log("running on 3000"));