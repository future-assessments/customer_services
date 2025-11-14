const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();

/*
const kcConfig = {
  "realm": "account-realm",
  "auth-server-url": "http://localhost:8090/",
  "ssl-required": "external",
  "resource": "account-domain",
  "bearerOnly": true,
  "clientId": "account-domain",  
  "credentials": {
    "secret": "PRtVX6qq1NPE33owEljvpzddT1E1iYj5"
  },
  "confidential-port": 0
};
*/
const kcConfig = {
    clientId: 'account-domain',
    bearerOnly: true,
    serverUrl: 'http://localhost:8090{kc_base_path}',
    realm: 'account-realm"',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmSjnJG/9h/VzIn61Sp1xbBlsMuwDZCH/mPqSvOzJHH49LSGs10C+G0dIbU6HG98fcvWlzBNAQOYIguQrk8tsSr/UqQsCdGK3MKaeJjV0qDIakSPmflJdeBeNl4JMFT5CPQmasHqaatA3BRaXs521Qxx9WrRPkgeJmPdNlFcDdI7P0DGaqhNNlEj2cuS6lnq7hUDJ2T2ub1B6aBOAEx67nHSljvUyUBYJBcmBWu7WGIrZWyVj9s49562ikDcBzpxyZBKcvSnGzdeDCTcYtHi16U0pUGcxPyKvdHGS0ucRD49xSIMT2ToPDcUVSuPvoar3fvpXGzutOO4xCGBJoaeQjwIDAQAB'
};

const app = express();
const cors = require('cors');

app.use(cors()); 
app.use(
    session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

const keycloak = new Keycloak({store: memoryStore, scope: 'address'}, kcConfig);


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


app.get('/customer', keycloak.protect(), (req,res) => {
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

app.use(keycloak.middleware());

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is successfully running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
