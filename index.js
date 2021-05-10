const express = require('express');
var app = express();
const fetch = require('node-fetch');

//876893
app.get("/", (req, res) => {
    res.redirect('./index');
});

app.get("/index", (req, res) => {
    if (req.query.id !== null && req.query.id !== "") {
        res.send("<html> <body> <form method='get' action='./addplayer'> <input type='number' name='id' placeholder='ID' value='" + req.query.id + "'> <input type='text' name='basename' placeholder='Name'> <input type='number' name='amount' placeholder='Amount'> <input type='submit'> </form></body> </html>");
    } else {
        res.send("<html> <body> <form method='get' action='./addplayer'> <input type='number' name='id' placeholder='ID'> <input type='text' name='basename' placeholder='Name'> <input type='number' name='amount' placeholder='Amount'> <input type='submit'> </form></body> </html>");
    }
});

//http://localhost:42069/addplayer/876893/poggerman1/10
app.get("/addplayer/", (req, res) => {
        for (i = 1; i < parseInt(req.query.amount) + 1; i++) {
            const params = new URLSearchParams();
            params.append('id', req.query.id);
            params.append('name', req.query.basename + i);
            fetch("https://api.blooket.com/api/firebase/join", {
                "headers": {
                    "Referer": "https://www.blooket.com/",
                },
                "body": params,
                "method": "PUT",
            })
        }
    res.redirect("/index?id=" + req.query.id);
});

app.listen(3008)