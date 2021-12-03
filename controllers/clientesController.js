const express = require('express');
const { google } = require("googleapis");
//K cliente [11] numero de compras
//L cliente [12] no programa
//M cliente [13] descontos aplicados
//N cliente [14] Clientes regulares
//O cliente [15] Clientes Falcão


const clientesController = {
    get: async(req, res) => {
        const { pesquisa } = req.body;
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

        // const getRows = await googleSheets.spreadsheets.values.get({
        //     auth,
        //     spreadsheetId,
        //     range: "Sheet1!A2:Z",
        // });
        const getLinha = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet1!A2:Z",
        });
        const getDesh = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Sheet2!A2:Z",
        });
        const desh = getDesh.data.values;
        
        // const clientes = getRows.data.values;
        // console.log(desh[0]);
        const ordem = getLinha.data.values;


        const ordemCompra = ordem.sort((a, b) => {

            if (a[10] > b[10]) return 1;

            if (a[10] < b[10]) return -1;

            return 0;

        }).reverse();
        // console.log(ordemCompra);
        const clientes = ordemCompra;

        res.render('home', { clientes, desh });
    },
    getCliente: async(req, res) => {
        // console.log("entrei no getclientes");
        const { pesquisa } = req.body;
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
            range: "Sheet1!A2:z",
        });
        const clientes = getRows.data.values;
        // const cliente = clientes.filter(cliente => cliente == pesquisa);
        // for (let i = 0; i < clientes.length; i++) {
        //     // clientes[i][1].toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())
        //     console.log(clientes);
        // }


        const novaPesquisa = pesquisa.toLocaleLowerCase()
        console.log(novaPesquisa);


        const cliente = clientes.filter((cliente) => cliente[1].toLocaleLowerCase().includes(novaPesquisa))

        return res.render('lista', { cliente })

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
        const alvo = clientes.find(cliente => cliente[0] == id)


        return res.render('clientes/edit', { alvo })
    },
    update: async(req, res) => {

        // console.log("TO AQUI");
        const { maisUm, valor } = req.body;
        const { id } = req.params
        const idAt = parseInt(id);

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1itSmKJWgNzmJNyVllDqGXVJ_j1Baz0asfBcrVimSzeY";
        // console.log(id)
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `Sheet1!M2`,
        });
        const clientes = getRows.data.values;
        var descontoBac = parseInt(clientes) + 1;
        const desconto = parseInt(maisUm);

        if (desconto == 1) {
            const zerarHis = {
                spreadsheetId: spreadsheetId,
                range: `Sheet1!K${idAt + 1}:Z`,
                valueInputOption: 'RAW', // TODO: Update placeholder value.
                resource: {
                    values: [
                        ["0"]
                    ],
                },
                auth: client,
            };
            const hisDesconto = {
                spreadsheetId: spreadsheetId,
                range: `Sheet1!M2`,
                valueInputOption: 'RAW', // TODO: Update placeholder value.
                resource: {
                    values: [
                        [descontoBac]
                    ],
                },
                auth: client,
            };
            googleSheets.spreadsheets.values.update(hisDesconto);
            googleSheets.spreadsheets.values.update(zerarHis);

        } else {

            const request = {
                spreadsheetId: spreadsheetId,
                range: `Sheet1!K${idAt + 1}:Z`,
                valueInputOption: 'RAW', // TODO: Update placeholder value.
                resource: {
                    values: [
                        [valor]
                    ],
                },
                auth: client,
            };
            googleSheets.spreadsheets.values.update(request);
        }






        // return res.send(id + " separador " + `${id +1}` + " pearador 2 " + `${idAt + 1}`);
        return res.redirect("/bazar-desconto")

    }
}
module.exports = clientesController