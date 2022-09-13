// const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';

let CryptoJS = require("crypto-js");
let AES = CryptoJS.AES;

const projectId = '2Eiti0yO7VhFarzYmKLxkIpy6fx';
const projectSecret = 'dd33985fca839d444ef5be451385024c';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

let ipfs: IPFSHTTPClient | undefined;

try {
	ipfs = create({
		    host:'ipfs.infura.io',
		    port: 5001,
		    protocol:'https',
		    headers: {
		        authorization: auth,
		    },
	});
} catch (error) {
	console.error("IPFS error ", error);
	ipfs = undefined;
}

// const ipfs = create({
//     host:'ipfs.infura.io',
//     port: 5001,
//     protocol:'https',
//     headers: {
//         authorization: auth,
//     },
// });

async function upload(data) {
	const json = JSON.stringify(data);
	const certkey = getRandomKey();
	const encrypted = encrypt(json, certkey);
	console.log(ipfs)
	// const ipfsHash = await ipfs.add(encrypted);
	return { ipfsHash: "ddd", certkey };
}

function encrypt(data, key) {
	return AES.encrypt(data, key).toString();
}

function getRandomKey() {
	return (Math.random() + 1).toString(36).substring(3).toUpperCase();
}

function decrypt(data, key) {
	const a = AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
	// console.log(a);
	return a;
}

async function retrieve(ipfshash, key) {
	const data = await ipfs.cat(ipfshash);
	return decrypt(data, key);
}
export { upload, retrieve };
