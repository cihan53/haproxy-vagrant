require('dotenv-flow').config();
const tls = require('tls');
const fs = require('fs');


const options = {
    // key: fs.readFileSync('./cert5/client1-key.pem'),
    // cert: fs.readFileSync('./cert5/client1-crt.pem'),
    // ca: fs.readFileSync('./cert5/ca-crt.pem'),
    secure:true,
    port: 4443,
    host: process.env.host,
};

const socket = tls.connect(options, () => {
    console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');

});

socket.setEncoding('utf8');

socket.on('data', (data) => {

    console.log("data", data)
});

socket.on('error', (error) => {
    console.log(error);
});

socket.on('end', (data) => {
    console.log('Socket end event');
});
