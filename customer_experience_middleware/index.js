const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors()); 

const PORT = 3030;

app.get('/', (req,res) => {
    res.status(200);
    res.send("Please select a capability for customers")
});

app.get('/account/:accountId', (req,res) => {
    const accountId = req.params.accountId;
    console.log(`Fetching data for accountId: ${accountId}`);
    fetch(`http://localhost:5045/Account/${accountId}`).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: ", error);
    });
});

app.get('/account', (req,res) => {
    fetch(`http://localhost:5045/Account`).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.contentType('application/json');
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: ", error);
    });
});


app.get('/customer', (req,res) => {
    fetch('http://localhost:5263/Customer').then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.contentType('application/json');
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: ", error);
    });
});

app.get('/customer/:customerId', (req,res) => {
    const customerId = req.params.customerId;
    console.log(`Fetching data for customerId: ${customerId}`);
    fetch(`http://localhost:5263/Customer/${customerId}`).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: ", error);
    });
});

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is successfully running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
