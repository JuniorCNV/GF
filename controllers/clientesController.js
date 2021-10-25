const { v4: uuid } = require('uuid');
const multer = require('multer');
const express = require('express');
const { google } = require("googleapis");

const clientesController = {
    get: async(req, res) => {
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        // // res.send("Ola planilha");

        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";
        // const metaData = await googleSheets.spreadsheets.get({
        //     auth,
        //     spreadsheetId,
        // });

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A2:Z",
        });
        const clientes = getRows.data.values;
        // res.render('clientes/clientes', { clientes });
        res.render('index', { clientes });
        // res.send(getRows.data.values);
    },
    edit: async(req, res) => {

        const { id } = req.params
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        // // res.send("Ola planilha");

        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A2:Z",
        });
        const clientes = getRows.data.values;
        const cliente = clientes.find(cliente => cliente[0] == id)

        // return res.render('clientes/edit', { cliente })
    },
    update: async(req, res) => {

        console.log('cheguei mané');
        const { valor } = req.body

        const { id } = req.params
        console.log(valor);
        console.log(id);

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        // res.send("Ola planilha");

        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";

        googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: "Sheet1!A:B",
            valueInputOption: "USER_ENTERED",
            valueInputOption: 'FORMATTED_VALUE',
            resource: {
                values: [

                    ["teeste update ", "teste ssla"]
                ],

            },
        });

        return res.redirect("/clientes")

    }






}
module.exports = clientesController