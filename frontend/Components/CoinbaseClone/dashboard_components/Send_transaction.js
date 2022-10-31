import React from 'react';
import {Alert} from 'react-native';
import abi_json from '../abi.json';

export const send_transaction = async (
  contract_add,
  receiver_add,
  owner_add,
  owner_private_key,
  amount,
  setIsModalVisible,
) => {
  var web3 = require('web3');

  const contractAddress = contract_add; //Yor token contract address
  const privateKey = owner_private_key;

  //The private key of your contract Owner
  const toAddress = receiver_add; //The address to transfer the tokens
  const value = (amount * 10 ** 18).toString();
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

  var data = contract.methods.transfer(toAddress, value).encodeABI(); //Create the data for token transaction.

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
    setIsModalVisible(false);
  } catch (error) {
    setIsModalVisible(false);

    Alert.alert(error);
  }
};
