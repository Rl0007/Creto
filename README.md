

# Creto

 A fully functional Crypto wallet


## Demo
## Landing Screen
![](https://github.com/Rl0007/Creto/blob/master/creto_images/creto_homepage.png)

Welcome screen of the app

## Sign in 

![](https://github.com/Rl0007/Creto/blob/master/creto_images/sign_in.jpg)

Enter the secret 12 word phrase to sign in 

## Sign up

![](https://github.com/Rl0007/Creto/blob/master/creto_images/sign_up.jpg)

Pick a username to create account , password is automatically generated 12 word phrase

## Dashboard

![](https://github.com/Rl0007/Creto/blob/master/creto_images/Dashboard.jpg)

Balance of coin and holdings of NFTs are shown 

## Send

![](https://github.com/Rl0007/Creto/blob/master/creto_images/send.jpg)

Enter the public address of the receiver or scan qr code manually

## Receive

![](https://github.com/Rl0007/Creto/blob/master/creto_images/receive.jpg)

Show the qr code to any wallet user to receive tokens

## Run locally

Note :- Use node version 16 Lts version and react-native 0.63 donot try to upgrade it will 
        more no. of times than you can count. :sob:

To run locally copy the github repo and 

1. use command 
```
> yarn install
```


2. Set up vitual device or use physical android device refer [this](https://reactnative.dev/docs/0.63/environment-setup)


3. Go to [moralis.io](https://moralis.io/) and create an account 

4. Create a new app/server on matic chain and insert appid , serverid in .env file

5. Create custom backend by copying code from index.js in cloud-folder to custom code on website or direclty link the folder to your app

6. Start react-native using

```
> npx react-native run android
```

7. You can use thirdweb to make custom tokens for your app 

## Tech Stack

**Client:** React-native, web3js, ether.js

**Server:** Moralis, Thirdweb


## Support

For support, email 12agrawalrahul@gmail.com



