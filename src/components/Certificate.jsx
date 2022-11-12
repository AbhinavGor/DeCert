import { useEffect, useState, Suspense } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import "../styles/certificate.scss";

const axios = require('axios');

const Certificate = (ipfsHash) => {
	const [name, setName] = useState("");
	const [issuingAuth, setIssuingAuth] = useState("");
	const [expDate, setExpDate] = useState("");
	const [certDesc, setCertDesc] = useState("");

	try{
		useEffect(() => {
			axios.get(`https://cloudflare-ipfs.com/ipfs/${ipfsHash.ipfsHash}`).then(res => {
			let certData = JSON.stringify(res.data);
			certData = certData.slice(1,);
			certData = certData.slice(0, -4);
			// certData = "'" + certData + "'"
			console.log({certData});
			const certJSON = JSON.parse(JSON.parse(certData));
			console.log(typeof(certJSON));
			// console.log(JSON.parse(certJSON).BeneficiaryName)
			console.log(Object.keys(certJSON))
			
			setName(certJSON.BeneficiaryName);
			setIssuingAuth(certJSON.InstituteAuthorityName);
			setExpDate(certJSON.ExpirationDate);
			setCertDesc(certJSON.CertificateDescription);
			})
		}, [])
		// setCert(res);
		// console.log({"Res": res});
	}catch(err){
		console.log({
			message: 'error with hash',
			ipfsHash
		});
	}
		// 	

		return (
			
			<Suspense fallback={<ClipLoader color="#000" />}>
				<div>
					<h1>Certificate Details</h1>
					<h2>Name: {name}</h2>
					<h2>Issuing Authority: {issuingAuth}</h2>
					<h2>Expiration Date: {expDate}</h2>
					<h2>Certificate Description: {certDesc}</h2>

				</div>
			</Suspense>
		);
	
};

export default Certificate;