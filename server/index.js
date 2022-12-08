const secp = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "041d204b70cb6ef137b5099529a3debe0b3bc00e92c97e3e3128ad1a07d7cbf94853fde7effe737c11300b5e37b9261cb3812c48b304d614e13dabd0c0a5ad25b6": 100,
    "041b3fe58b52d5e68a4c528f3cfae9d50f72be905cf4dbb7c158074bf41661acebbc136427637580abc4ace9f248b1adab8007d815813f452192d58089dfd79a8c": 50,
    "0495740f5527b439594739bba1f331c7c4b660b663dd8aa3e838c8b0cc9888ba35befc1933222ce07ee56ad7c637274189e49fd04e2d61db5321a85fbb00e939c0": 75,
};

app.get("/balance/:publicKey", (req, res) => {
    const { publicKey } = req.params;
    const balance = balances[publicKey] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    const { sender, messageHex, signTransactionHex, recipient, amount } =
        req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    const isSigned = secp.verify(signTransactionHex, messageHex, sender);

    if (isSigned) {
        if (balances[sender] < amount) {
            res.status(400).send({ message: "Not enough funds!" });
        } else {
            balances[sender] -= amount;
            balances[recipient] += amount;
            res.send({
                balance: balances[sender],
                message: "Transaction Completed!",
            });
        }
    } else {
        res.status(400).send({
            message: "Transaction is not signed by this sender public key.",
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
