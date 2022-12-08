import secp from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

const privateKey = secp.utils.randomPrivateKey();
console.log(`Private key: ${toHex(privateKey)}`);

const publicKey = secp.getPublicKey(privateKey);
console.log(`Public key: ${toHex(publicKey)}`);

const address = keccak256(publicKey.slice(1)).slice(-20);
console.log(`Address: ${toHex(address)}`);

/* 
Private key: 8be1ab302080adc50da5fa136f29b72ee5a253dd97e5dcdc282c384901434729
Public key: 041d204b70cb6ef137b5099529a3debe0b3bc00e92c97e3e3128ad1a07d7cbf94853fde7effe737c11300b5e37b9261cb3812c48b304d614e13dabd0c0a5ad25b6
Address: 911a1f485612daddfcd36c5e166f48faae9e9c30
*/

/* 
Private key: 770425dea4e36970a2fb2b6ea6916c3de686f79245b94d0dfde43dfd64020e29
Public key: 041b3fe58b52d5e68a4c528f3cfae9d50f72be905cf4dbb7c158074bf41661acebbc136427637580abc4ace9f248b1adab8007d815813f452192d58089dfd79a8c
Address: 9e66065d4e6faecd4524af80a353abbb9b7175cd
*/

/* 
Private key: 641aaac8972325d6a3848103356c5f50d59a22dc903cf430107c0d7ab0366cfd
Public key: 0495740f5527b439594739bba1f331c7c4b660b663dd8aa3e838c8b0cc9888ba35befc1933222ce07ee56ad7c637274189e49fd04e2d61db5321a85fbb00e939c0
Address: cdccbb22a8bab28fa24dd58a6bfae9c3e6204bcb
*/
