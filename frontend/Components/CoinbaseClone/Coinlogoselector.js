import React from 'react';
import doge from './doge.png';
import {Image} from 'react-native';
import BTC from './btc.png';
import eth from './eth.png';
import Luna from './luna.png';
import matic from './matic.png';
import sol from './sol.png';

const Coinlogoselector = ({name, style}) => {
  var coin = {
    Doge: doge,
    BTC: BTC,
    eth: eth,
    Luna: Luna,
    matic: matic,
    sol: sol,
  };

  return <Image source={coin[name]} style={style} />;
};

export default Coinlogoselector;
