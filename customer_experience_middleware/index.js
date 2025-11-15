const express = require('express');
const session = require('express-session');
const { auth } = require('express-oauth2-jwt-bearer');

const memoryStore = new session.MemoryStore();

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
};

app.use(cors(corsOptions)); 
app.use(
    session({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

// Allow CORS preflight requests to succeed without authentication.
// Some browsers will treat a failed preflight as a generic 400/blocked response,
// so respond to OPTIONS early and avoid running the auth middleware for them.
// Note: we already applied CORS globally above with `app.use(cors(...))` and
// handle OPTIONS in the next middleware. No explicit app.options route is
// required (some path-to-regexp versions reject '*' patterns), so omit it.
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Create an auth instance but do NOT mount it globally. Mount it only for
// the routes that should be protected. This prevents unauthenticated requests
// (including preflight) from being rejected with a confusing client-side 400.
// For tests we provide a lightweight stub (so tests don't call an external
// identity provider). When running normally, use the real JWT verifier.
let checkJwt;
if (process.env.NODE_ENV === 'test') {
    checkJwt = (req, res, next) => {
        // Simple test-mode behavior: require Authorization header. Accept
        // the special token 'Bearer test-token' as valid.
        const authz = req.headers && req.headers.authorization;
        if (!authz) {
            const err = new Error('Missing token');
            err.name = 'InvalidRequestError';
            return next(err);
        }
        if (authz === 'Bearer test-token') return next();
        const err = new Error('Invalid token');
        err.name = 'UnauthorizedError';
        return next(err);
    };
} else {
    checkJwt = auth({
        audience: 'account',
        issuerBaseURL: 'http://localhost:8090/realms/account-realm',
    });
}


const PORT = 3030;

app.get('/', (req,res) => {
    res.status(200);
    res.send("Please select a capability for customers")
});

app.get('/account/:accountId', checkJwt, (req,res) => {
    const accountId = req.params.accountId;
    console.log(`Fetching data for accountId: ${accountId}`);
    const headers = {};
    if (req.headers && req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    fetch(`http://localhost:5045/Account/${accountId}`, { headers }).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: " + (error && error.message ? error.message : error));
    });
});

app.get('/account', checkJwt, (req,res) => {
    const headers = {};
    if (req.headers && req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    fetch(`http://localhost:5045/Account`, { headers }).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.contentType('application/json');
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: " + (error && error.message ? error.message : error));
    });
});


app.get('/customer', checkJwt, (req,res) => {
    const headers = {};
    if (req.headers && req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    fetch('http://localhost:5263/Customer', { headers }).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.contentType('application/json');
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: " + (error && error.message ? error.message : error));
    });
});

app.get('/customer/:customerId', checkJwt, (req,res) => {
    const customerId = req.params.customerId;
    console.log(`Fetching data for customerId: ${customerId}`);
    const headers = {};
    if (req.headers && req.headers.authorization) headers['Authorization'] = req.headers.authorization;
    fetch(`http://localhost:5263/Customer/${customerId}`, { headers }).then( apiResp => apiResp.json() )
    .then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
    })
    .catch(error => {
        console.error("Error fetch data: ", error);
        res.status(400);
        res.send("Error fetching data: " + (error && error.message ? error.message : error));
    });
});

if (require.main === module) {
    app.listen(PORT, (error) => {
        if(!error)
            console.log("Server is successfully running, and App is listening on port " + PORT);
        else
            console.log("Error occurred, server can't start", error);
    });
}

// Central error handler: convert auth errors into clean JSON responses.
app.use((err, req, res, next) => {
    if (!err) return next();
    if (err.name === 'InvalidRequestError' || err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: err.message || 'Unauthorized' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// Export the app for tests; only start the listener when run directly.
if (require.main !== module) {
    module.exports = app;
}
