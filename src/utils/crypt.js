const pinataSDK = require("@pinata/sdk")
const axios = require("axios")
const CryptoJS = require('crypto-js')
const fs = require("fs")
const FormData = require("form-data")
const basePathConverter = require('base-path-converter')
// const { response } = require("express")
const { AES } = require("crypto-js")

const PbKey = 'ebadb8f071b09d4857c0';
const SKey = 'd236be0dc89a05ccb64679685829aa3376d430861e4b20e825f3d8b4b1772c65';
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjg5ZWY3OC0yMWQ2LTRlZjgtYjU3NC02MWJiOTllYTE3ZTAiLCJlbWFpbCI6ImFiaGluYXYyMDAxNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWJhZGI4ZjA3MWIwOWQ0ODU3YzAiLCJzY29wZWRLZXlTZWNyZXQiOiJkMjM2YmUwZGM4OWEwNWNjYjY0Njc5Njg1ODI5YWEzMzc2ZDQzMDg2MWU0YjIwZTgyNWYzZDhiNGIxNzcyYzY1IiwiaWF0IjoxNjYzMDk1MDQ3fQ.0B0vAZEX3kko2DmqmgPLLZQwVwYAlgvr7isBRbQcmLY';

const pinata = pinataSDK(PbKey, SKey);

pinata.testAuthentication().then((result) => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

function encrypt(data, key) {
    return AES.encrypt(data, key).toString();
}

function getRandomKey(){
    return (Math.random() + 1).toString(36).substring(3).toUpperCase();
}

function decrypt(data, key) {
    return AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}
async function upload(cert, pinataApiKey = PbKey, pinataSecretApiKey = SKey){
    const json = JSON.stringify(cert);
    const certKey = getRandomKey();
    // const encrypted = encrypt(json, certKey);
    const encrypted = json;

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios.post(url, encrypted, {
        headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    }).then(function (response) {

        console.log({response, certKey})
        return {ipfsHash: response.data.IpfsHash, certKey}
        console.log("====>FILE UPLOADED<====");
    }).catch(function (error) {
        console.error(error);
    });
}

async function retrieve(hash) {
    const uri = `https://gateway.pinata.cloud/ipfs/${hash}`;
    const res = await axios.get(uri);
    const data = res.data;
    
    return decrypt(data);
}

module.exports = {upload, retrieve}

const defCert = {
    "AdditionalNotes": "",
    "BeneficiaryName": "Kylo Ren",
    "CertificateDescription": "this is bkt4006 quali",
    "ExpirationDate": "2024-12-30",
    "InstituteAuthorityName": "VIT University"
  }

  upload(defCert)