## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## Implementation

Client side we have two scripts inside script folder. 1. `generate.js` which generate random private key and its corresponding public key and ethereum address using `ethereum-cryptography` package (Example keys are added in this file). 2. `signTransaction.js` that uses that private to sign a transaction of given message hash.

We have to pass these (`publicKey`, `messageHex`, and `signTransactionHex`) to server side in order to transfer funds to another `publicKey`. Sever will verify these to validate whether the transaction is created by the owner of the `privateKey` or not and based on it will transfer fund.

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/
5. Use the existing key inside `generate.js` or create new ones by running the `generate.js` script, command `node scripts/generate.js`
6. Sign a Transaction (make sure to update the private key inside `signTransaction.js` with your generated privateKey), command `node scripts/signTransaction.js`. NOTE: Make sure to copy the output.
7. Make sure server is running, fill all the given fields.
    1. `Sender Public Key`: public key of sender generated with `generate.js` script.
    2. `Message Hex`: message hex output that you copied on step 6.
    3. `Sign Transaction Hex`: signature output that you copied on step 6.
    4. `Send Amount`: Any amount less than or equal to user funds.
    5. `Recipient Public Key`: public key of another recipient generated with `generate.js` script.

Transaction will be successful, if all of these things will be correct and user has enough funds. You can always see users funds in balance field by public key on wallet side. But for it make sure you set the balances object server side inside `index.js`.

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server
4. Make sure to update the `balances` object with public keys as keys of object and values as balance corresponding to those public keys.

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
