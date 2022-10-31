import React, {useState, createRef, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {useMoralisWeb3Api, useWeb3Transfer} from 'react-moralis';
// import web3 from "./web3";
import Coinlogoselector from './Coinlogoselector';

import MoralisMaharaja from '../../moralis-maharaja.png';
import MoralisMalevolent from '../../moralis-malevolent.png';
import MoralisMarauder from '../../moralis-marauder.png';
import MoralisMastermind from '../../moralis-mastermind.png';
import MoralisMechtician from '../../moralis-mechtician.png';
import MoralisMonastic from '../../moralis-monastic.png';
import MoralisMoralissimus from '../../moralis-moralissimus.png';
import MoralisMorpheus from '../../moralis-morpheus.png';
import abi_json from './abi.json';
import {useMoralis} from 'react-moralis';

import {UserContext} from '../../UserContext';
import {Modal} from 'react-native';
import {Button} from 'react-native';
import {send_transaction} from './dashboard_components/Send_transaction';
// import Qrcode from "../../Qrcode";
import {Receive_qrcode} from './dashboard_components/Receive_qrcode';
import Qrcodescanner from './dashboard_components/Qrcodescanner_v4.js';
import {send_nft} from './dashboard_components/send_nft';

const Dashboard = ({route, navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {Moralis} = useMoralis();
  const {value, setValue} = useContext(UserContext);
  const [uniswap, setUniswap] = useState();
  const [coinSelected, setCoinSelected] = useState(true);
  const [selectedtokenaddress, setSelectedtokenaddress] = useState('');
  const [Publicaddress_receiver, setPublicaddress_receiver] = useState('');
  const [Publicaddress_sender, setPublicaddress_sender] = useState('');
  const [Privateaddress_sender, setPrivateaddress_sender] = useState('');
  const [amount, setAmount] = useState(0);
  const [qrcodemodal, setQrcodemodal] = useState(false);
  const [scanqrcode, setScanqrcode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nativebalance, setNativebalance] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  const private_mnemonic = async () => {
    Moralis.User.currentAsync().then(function (user) {
      var wallet = user.get('recoveryPhrase');
      //  console.log("private key ", wallet);
      setMnemonic(wallet);
    });
  };

  const tokenValue = (value, decimals) =>
    decimals ? value / Math.pow(10, decimals) : value;

  const user = Moralis.User.current();

  const NFTs = [
    {
      id: 1,
      nft: MoralisMaharaja,
      name: 'Moralis Maharaja',
    },
    {
      id: 2,
      nft: MoralisMalevolent,
      name: 'Moralis Malevolent',
    },
    {
      id: 3,
      nft: MoralisMarauder,
      name: 'Moralis Marauder',
    },
    {
      id: 4,
      nft: MoralisMastermind,
      name: 'Moralis Mastermind',
    },
    {
      id: 5,
      nft: MoralisMechtician,
      name: 'Moralis Mechtician',
    },
    {
      id: 6,
      nft: MoralisMonastic,
      name: 'Moralis Monastic',
    },
    {
      id: 7,
      nft: MoralisMoralissimus,
      name: 'Moralis Moralissimus',
    },
    {
      id: 8,
      nft: MoralisMorpheus,
      name: 'Moralis Morpheus',
    },
  ];

  const getTokenPrice = async public_address => {
    await Promise.all([
      setUniswap(
        await Moralis.Web3API.account.getTokenBalances({
          chain: 'mumbai',
          address: public_address,
        }),
      ),
    ]);
  };

  useEffect(() => {
    const wrapping_function = async () => {
      await current_public_address_of_sender();
      await private_mnemonic();
      private_key_sender();
      getnativebalance();
    };
    wrapping_function();
    // current_public_address_of_sender();
    // private_key_sender();
    // getnativebalance();
  }, [Publicaddress_sender]);
  const Web3Api = useMoralisWeb3Api();

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    getTokenPrice(Publicaddress_sender);
    // callApiMethod();
    setIsRefreshing(false);

    // and set isRefreshing to false at the end of your callApiMethod()
  };

  // const fetchTokenBalances = async () => {
  //   const options = {
  //     chain: 'mumbai',
  //     address: '0x980eb394b1168D1A39162E156Ffd2b18a73e183C',
  //   };
  //   const balances = await Web3Api.account.getTokenBalances(options);
  //   // console.log(balances);
  // };

  // fetchTokenBalances();
  const getnativebalance = () => {
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'X-API-Key': 'test'},
    };

    fetch(
      `https://deep-index.moralis.io/api/v2/${Publicaddress_sender}/balance?chain=mumbai`,
      options,
    )
      .then(response => response.json())
      .then(response =>
        // console.log('response---->', response.balance)
        setNativebalance(response.balance),
      )
      .catch(err => console.error(err));
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={
        item.token_address != selectedtokenaddress
          ? styles.coinsContainer
          : styles.coinsContainerselected
      }
      key={item.name}
      onPress={e => {
        e.preventDefault();
        setSelectedtokenaddress(item.token_address);
        // console.log(selectedtokenaddress);
      }}>
      {/* <Image source={Coinlogoselector(item.symbol)} style={styles.coinsLogo} /> */}
      <Coinlogoselector name={item.symbol} style={styles.coinsLogo} />
      <View style={styles.coinsDetailContainer}>
        <Text style={styles.coinsNameText}>
          {item.name} :-{item.balance / 10 ** 18}
        </Text>
        <Text style={styles.coinsSymbol}>{item.symbol}</Text>
      </View>
    </TouchableOpacity>
  );
  const current_public_address_of_sender = async () => {
    Moralis.User.currentAsync().then(function (user) {
      var wallet = user.get('ethAddress');
      setPublicaddress_sender(wallet);
      getTokenPrice(wallet);
    });
  };
  const private_key_sender = async () => {
    Moralis.User.currentAsync().then(function (user) {
      var wallet = user.get('private_key');
      //  console.log("private key ", wallet);
      setPrivateaddress_sender(wallet);
    });
  };

  const renderNFT = ({item}) => (
    <TouchableOpacity key={item.id} style={styles.nftContainer}>
      <Image source={item.nft} style={styles.nftImage} />
      <Text style={styles.nftName}>{item.name}</Text>
      <Text style={styles.nftCreator}>@BoredMoralisMages</Text>
    </TouchableOpacity>
  );

  const send_v4 = async () => {
    var web3 = require('web3');

    const contractAddress = '0x721c50a8A2d6b07a354f17D955FAdfd234517EfB'; //Yor token contract address
    const privateKey =
      '0xd9eded56f5f134bf77cdf2f42299929dda0812e2b00cb547b004c51b18ed3348'; //The private key of your contract Owner
    const toAddress = '0x980eb394b1168D1A39162E156Ffd2b18a73e183C'; //The address to transfer the tokens
    const value = (5000000000000000000).toString();
    const ownerAddress = '0xc67624afd99fE9164483e451FaC3a0fDF5F817E4';
    //Creating Web3 Objct
    const web3js = new web3(
      new web3.providers.HttpProvider(
        'https://matic-mumbai.chainstacklabs.com',
      ),
    );

    var contractABI = abi_json; //Contract Token ABI

    //creating Contract Object
    var contract = new web3js.eth.Contract(contractABI, contractAddress, {
      from: ownerAddress,
    });

    var data = contract.methods.transfer(toAddress, value).encodeABI(); //Create the data for token transaction.

    var rawTransaction = {to: contractAddress, gas: 100000, data: data};

    web3js.eth.accounts
      .signTransaction(rawTransaction, privateKey)
      .then(signedTx =>
        web3js.eth.sendSignedTransaction(signedTx.rawTransaction),
      )
      //.then(function(receipt){ console.log("Transaction receipt: ", receipt); getETHBalanceOf();  })
      .then(req => {
        /* The trx was done. Write your acctions here. For example getBalance */
        getTOKENBalanceOf(toAddress).then(balance => {
          console.log(toAddress + ' Token Balance: ' + balance);
        });
        return true;
      });
  };

  // modal backend________>

  const KEYBOARD_VERTICAL_OFFSET = 60 + StatusBar.currentHeight;
  const username = 'rahul';
  const toggleqrmodal = () => {
    setQrcodemodal(!qrcodemodal);
  };
  const togglescanqrcode = () => {
    setScanqrcode(!scanqrcode);
  };
  const set_value_of_publicaddress_receiver = address => {
    setPublicaddress_receiver(address);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        togglescanqrcode();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.mainBody}>
      {/* <View>
        <TouchableOpacity>
          <Text
            style={{color: 'black', fontSize: 20}}
            onPress={() => {
              setQrcodemodal(true);
            }}>
            open
          </Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <Modal
          animationType="slide"
          style={styles.centeredView}
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            Alert.alert('Transaction canceled!!!');
            setIsModalVisible(!isModalVisible);
          }}>
          <Qrcodescanner
            scanqrcode={scanqrcode}
            togglescanqrcode={togglescanqrcode}
            set_value_of_publicaddress_receiver={
              set_value_of_publicaddress_receiver
            }
          />
          <View style={styles.modalView}>
            <View style={styles.formContainer}>
              <Text style={{marginBottom: 10}}>Public address</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Public address"
                  value={Publicaddress_receiver}
                  onChangeText={e => setPublicaddress_receiver(e)}
                />

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRightWidth: 10,
                    borderLefttWidth: 10,

                    // borderColor: 'blue',
                    zIndex: 9998,
                    top: 10,
                    right: 40,
                  }}
                  onPress={() => {
                    // navigation.push('Scanqrcode');
                    requestCameraPermission();
                  }}>
                  <Image
                    source={require('./camera_icon.png')}
                    style={{
                      width: 30,
                      height: 25,

                      // position: "absolute",

                      backgroundColor: 'black',

                      zIndex: 9999,
                      alignSelf: 'flex-end',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.formContainer}>
              <Text style={{marginBottom: 10}}>Amount</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Amount"
                onChangeText={e => setAmount(e)}
              />
            </View>
            <View style={styles.buttonview}>
              <TouchableOpacity
                style={styles.buttonsendmodal}
                onPress={() => {
                  if (!Publicaddress_receiver.trim() || !amount) {
                    Alert.alert('Please enter valid info !!');
                    return;
                  }
                  send_transaction(
                    selectedtokenaddress,
                    Publicaddress_receiver,
                    Publicaddress_sender,
                    Privateaddress_sender,
                    amount,
                    setIsModalVisible,
                  );
                }}>
                <Text style={styles.buttonText}>send</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonclosemodal}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={styles.buttonText}>close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Receive_qrcode
          modalVisible={qrcodemodal}
          toggleqrmodal={toggleqrmodal}
          Publicaddress_sender={Publicaddress_sender}
        />
      </View>
      <SafeAreaView style={{marginTop: 20}}>
        <Text style={styles.userName}>@{user.attributes.username}</Text>
        <Text style={styles.usdBalance}>
          {(parseFloat(nativebalance) / 10 ** 18).toFixed(4)} MATIC
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton}>
            <Text
              style={styles.buttonText}
              onPress={() =>
                // send_nft(
                //   '0x569F6aC93AEebd2dAC06983C06354999e6d04Cf2',
                //   0,

                //   '0x719084eCf8522E9c3CC05AdFc9C75868b49e440d',

                //   '0x0FDCF44AFC8D79FB749aFC69e76eBE06CB4e74bf',
                //   mnemonic,
                // )
                {
                  if (!selectedtokenaddress.trim()) {
                    Alert.alert('Please select a coin !!!');
                    return;
                  }
                  setIsModalVisible(!isModalVisible);
                }
              }>
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.receiveButton}>
            <Text
              style={styles.buttonText}
              onPress={() => {
                try {
                  console.log('inside return');
                  setQrcodemodal(true);
                } catch (error) {
                  console.log(error);
                }
              }}>
              Receive
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.portFolioContainer}>
        <View style={styles.portfolioButtons}>
          <TouchableOpacity
            style={[
              styles.coinsButton,
              {
                borderBottomColor: coinSelected ? '#1652F0' : 'gray',
                borderBottomWidth: coinSelected ? 3 : 0.2,
              },
            ]}
            onPress={() => setCoinSelected(true)}>
            <Text style={styles.portfolioButtonsText}>Coins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nftButton,
              {
                borderBottomColor: !coinSelected ? '#1652F0' : 'gray',
                borderBottomWidth: !coinSelected ? 3 : 0.2,
              },
            ]}
            onPress={() => setCoinSelected(false)}>
            <Text style={styles.portfolioButtonsText}>NFTs</Text>
          </TouchableOpacity>
        </View>

        <View style={{padding: 10, margin: 10}}>
          {coinSelected ? (
            <View>
              <Text style={styles.tokenLabelText}>Tokens</Text>
              <FlatList
                key={'coins'}
                data={uniswap}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{marginTop: 10}}
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View>
              <FlatList
                key={'tokens'}
                data={NFTs}
                renderItem={renderNFT}
                contentContainerStyle={{
                  alignSelf: 'flex-start',
                  paddingBottom: 50,
                }}
                numColumns={Math.ceil(NFTs.length / 4)}
                keyExtractor={nft => nft.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  // modal styles
  buttonview: {
    // flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: "flex-start",
  },
  buttonsendmodal: {
    alignSelf: 'center',
    backgroundColor: '#DBA224',
    width: '30%',
    height: 40,
    marginRight: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonclosemodal: {
    alignSelf: 'center',
    backgroundColor: 'red',
    width: '30%',
    height: 40,
    // marginRight: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    // marginBottom: 100,
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  keyboardAvoidingViewStyle: {
    position: 'absolute',
    bottom: 45,
    width: '100%',
  },
  formContainer: {
    // flexDirection: "row",
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    width: 88,
    height: 34,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9999,
    right: 10,
    top: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: 12,
    color: '#fff',
  },
  inputStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 20,
  },

  // mainbody styles
  mainBody: {
    flex: 1,
    height: '50%',
    backgroundColor: '#1652F0',
  },
  userName: {
    fontSize: 14,
    color: '#B5CBFF',
    textAlign: 'center',
  },
  usdBalance: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Helvetica Neue',
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#0A49EE',
    width: '75%',
    height: 47,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  sendButton: {
    width: '50%',
    justifyContent: 'center',
    borderRightColor: '#fff',
    borderRightWidth: 1,
  },
  receiveButton: {
    width: '50%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Helvetica Neue',
    color: '#fff',
    textAlign: 'center',
  },
  tradeButton: {
    width: '33.3%',
    justifyContent: 'center',
  },
  portFolioContainer: {
    backgroundColor: '#fff',
    width: '95%',
    flex: 1,
    alignSelf: 'center',
    marginTop: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  portfolioButtons: {
    flexDirection: 'row',
  },
  coinsButton: {
    width: '50%',
    justifyContent: 'center',
    height: 51,
    borderBottomWidth: 2,
  },
  portfolioButtonsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#757575',
    textAlign: 'center',
  },
  nftButton: {
    width: '50%',
    justifyContent: 'center',
    height: 51,
  },
  tokenLabelText: {
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Helvetica Neue',
  },
  coinsContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  coinsContainerselected: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    backgroundColor: 'rgba(52,52,52,0.5)',
    borderRadius: 10,
  },
  coinsLogo: {
    height: 70,
    width: 70,
  },
  coinsDetailContainer: {
    justifyContent: 'center',
    marginLeft: 13,
  },
  coinsNameText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    color: 'black',
  },
  coinsSymbol: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: 10,
    color: '#AAAAAA',
  },
  nftContainer: {
    width: 150,
    height: 156,
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  nftImage: {
    width: 150,
    height: 156,
  },
  nftName: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    marginTop: 8,
  },
  nftCreator: {
    color: '#AAAAAA',
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    marginTop: 3,
  },
});
