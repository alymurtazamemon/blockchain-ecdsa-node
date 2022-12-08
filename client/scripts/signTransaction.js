import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import secp from "ethereum-cryptography/secp256k1.js";

const PRIVATE_KEY =
    "8be1ab302080adc50da5fa136f29b72ee5a253dd97e5dcdc282c384901434729";

const messageHash = keccak256(utf8ToBytes(""));
console.log(`Message Hash: ${toHex(messageHash)}`);

const [signTransaction, recoveryBit] = await secp.sign(
    messageHash,
    PRIVATE_KEY,
    {
        recovered: true,
    }
);
console.log(`Sign Transaction: ${toHex(signTransaction)}`);

const publicKey = secp.recoverPublicKey(
    messageHash,
    signTransaction,
    recoveryBit
);
// console.log(`Public key: ${toHex(publicKey)}`);

const isSigned = secp.verify(signTransaction, messageHash, publicKey);
console.log(`Is Signed: ${isSigned}`);
