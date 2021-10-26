const express = require('express');
const { google } = require("googleapis");
//K cliente [11] numero de compras
//L cliente [12] no programa
//M cliente [13] descontos aplicados
//N cliente [14] Clientes regulares
//O cliente [15] Clientes Falcão


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
        res.render('home', { clientes });
        // res.send(getRows.data.values);
    },
    edit: async(req, res) => {

        const { id } = req.params
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A2:Z",
        });
        const clientes = getRows.data.values;
        const cliente = clientes.find(cliente => cliente[0] == id)

        return res.render('clientes/edit', { cliente })
    },
    update: async(req, res) => {

        // console.log("TO AQUI");
        const { name, valor } = req.body;
        const { id } = req.params
        const idAt = parseInt(id);
        // console.log(valor);
        // console.log("o nome do user é: " + name);
        // console.log("o id do user é: " + id);
        // console.log();

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";
        console.log(id)
        const request = {
            spreadsheetId: spreadsheetId,
            range: `Sheet1!L${idAt + 1}:Z`,

            valueInputOption: 'RAW', // TODO: Update placeholder value.

            resource: {
                values: [

                    [valor]
                ],
            },

            auth: client,
        };

        googleSheets.spreadsheets.values.update(request);
        // return res.send(id + " separador " + `${id +1}` + " pearador 2 " + `${idAt + 1}`);
        return res.redirect("/clientes")

    }
}
module.exports = clientesController