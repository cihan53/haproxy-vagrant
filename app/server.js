const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-crt.pem'),
    ca: fs.readFileSync('certs/ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: true
};

const server = tls.createServer(options, (socket) => {

    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');

    socket.on('error', (error) => {
        console.log(error);
    });

    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(process.stdout);
    socket.pipe(socket);
});

// server.use(function (req, res, next) {
//     if (!req.client.authorized) {
//         //return res.status(401).send('Client cert failed. User is not authorized\n');
//     }
//     // Examine the cert itself, and even validate based on that!
//     var cert = req.socket.getPeerCertificate();
//     if (cert.subject) {
//         console.log('Client Certificate: ',cert);
//         console.log('Client Certificate Common Name: '+cert.subject.CN);
//         console.log('Client Certificate Location: '+cert.subject.L);
//         console.log('Client Certificate Organization Name: '+cert.subject.O);
//         console.log('Client Certificate Email Address: '+cert.subject.emailAddress);
//     }
//
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end("hello world from client cert\n");
//     next();
// });


server.listen(3000, () => {
    console.log('server bound');
});
