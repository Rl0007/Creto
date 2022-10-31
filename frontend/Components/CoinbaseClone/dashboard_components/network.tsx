import {Network} from '@ethersproject/networks';
export const matic: Network = {
  name: 'matic',
  chainId: 137,
  _defaultProvider: providers =>
    new providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com'),
};
