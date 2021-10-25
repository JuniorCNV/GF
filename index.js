const express = require("express");
// const { google } = require("googleapis");
const app = express();

const clienteRota = require('./route/rotasClientes');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(clienteRota);

app.listen(3000, (req, res) => console.log("running on 3000"));