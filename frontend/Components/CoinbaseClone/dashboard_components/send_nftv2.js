import React from 'react';
import abi_json from './nft_abi.json';
import {Alert} from 'react-native';

export const send_nft = (
  contract_add,
  receiver_add,
  owner_add,
  owner_private_key,
  tokenId,
) => {
  var web3 = require('web3');

  const contractAddress = contract_add; //Yor token contract address
  const privateKey = owner_private_key;

  //The private key of your contract Owner
  const toAddress = receiver_add; //The address to transfer the tokens
  const value = tokenId;
  const ownerAddress = owner_add;
  //Creating Web3 Objct
  const web3js = new web3(
    new web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'),
  );

  var contractABI = abi_json; //Contract Token ABI

  //creating Contract Object
  var contract = new web3js.eth.Contract(contractABI, contractAddress, {
    from: ownerAddress,
  });

  var data = contract.methods
    .safeTransferFrom(ownerAddress, toAddress, value)
    .encodeABI(); //Create the data for token transaction.

  var rawTransaction = {to: contractAddress, gas: 100000, data: data};

  try {
    web3js.eth.accounts
      .signTransaction(rawTransaction, privateKey)
      .then(signedTx =>
        web3js.eth.sendSignedTransaction(signedTx.rawTransaction),
      )
      //.then(function(receipt){ console.log("Transaction receipt: ", receipt); getETHBalanceOf();  })
      .then(result => {
        /* The trx was done. Write your acctions here. For example getBalance */
        Alert.alert(result);
      });
  } catch (error) {
    Alert.alert(error);
  }
};
