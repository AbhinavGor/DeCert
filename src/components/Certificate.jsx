import { Suspense, useContext } from "react";
import QRCode from "react-qr-code"
import ComponentLoader from "./ComponentLoader";
import PageLoader from "./PageLoader";

import Verified from "../assets/verified.svg";
import Revoked from "../assets/revoked.svg";
import Expired from "../assets/expired.svg";
import "../styles/certificate.scss";
import { retrieve } from "../utils/crypt";

const axios = require('axios');

const Certificate = async (ipfsHash) => {
	try{
		console.log({tyy: typeof(ipfsHash.ipfsHash)})

		const res = await axios.get(`https://cloudflare-ipfs.com/ipfs/${ipfsHash.ipfsHash}`)
	}catch(err){
		console.log({
			message: 'error with hash',
			ipfsHash
		});

		return (
			<h1>Certificate Details</h1>
		);
	}
};

export default Certificate;