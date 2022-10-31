import React from "react";
import { useMoralisWeb3Api } from "react-moralis";

function Gettotalbalance() {
  const Web3Api = useMoralisWeb3Api();

  const fetchTokenBalances = async () => {
    const balances = await Web3Api.account.getTokenBalances();
    console.log(balances);
  };
  // fetchTokenBalances();
  return { fetchTokenBalances };
}

export default Gettotalbalance;
