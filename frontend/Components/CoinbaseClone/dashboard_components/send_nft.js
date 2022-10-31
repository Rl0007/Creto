// The ABI tells ethers.js or web3.js how to interact with a type of contract - the following is a generic EIP-721 ABI I found
import React, {useState} from 'react';
import nft_abi from './nft_abi.json';

export const send_nft = async (
  contractAddress_token,
  tokenId,
  Publicaddress_sender,
  Publicaddress_receiver,
  mnemonic,
) => {
  // const {ethers} = require('hardhat');
  const {ethers} = require('ethers');
  // Your NFT contract's address
  let contractAddress = contractAddress_token;

  // Information for the transfer
  let rpcProvider = 'https://matic-mumbai.chainstacklabs.com';

  let myAccount = Publicaddress_sender;
  let myAccountMnemonic =
    'Enter Stay Remain Answer Was Smell Sound Jump Taste Were Look Seem';
  let targetAccount = Publicaddress_receiver;

  // The following setup is taken from https://docs.ethers.io/v5/getting-started/#getting-started--connecting

  // const provider = new ethers.providers.JsonRpcProvider('rpc.maticvigil.com');
  const provider = new ethers.providers.StaticJsonRpcProvider(rpcProvider, {
    chainId: 80001,
    name: 'mumbai',
  });

  // let provider = new ethers.providers.InfuraProvider('mumbai');

  console.log(provider);

  // const signer = ethers.Wallet.fromMnemonic(myAccountMnemonic);
  const signer = new ethers.Wallet(
    '0x3bf37253269231367c52f251e4f362900bc8fe645807f7cd2a1e44020e0d6958',
    provider,
  );

  const nftContractReadonly = new ethers.Contract(
    contractAddress,
    nft_abi,
    provider,
  );
  const nftContract = nftContractReadonly.connect(signer);

  // Transfer
  // await contract['safeTransferFrom(address,address,uint256)'](
  //   accountUser,
  //   newOwner,
  //   idNFT,
  // );
  await nftContract['safeTransferFrom(address,address,uint256)'](
    targetAccount,
    myAccount,
    tokenId,
  )

    .then(result => console.log('nftresult---------->', result))
    .catch(error => console.log('nft error--------->', error));
};
