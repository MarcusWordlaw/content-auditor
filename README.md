# provenance-react-app

# The purpose of this project is to demo the ability for cross organizational data to utlize Blockchain as an audit layer. The system shows how an administrator can be alerted to information that was modified.

# Requirements
### Vagrant, Nodejs, NPM, Virtualbox, metamask

 https://youtu.be/0d8BT1cVY2Q


0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63

Because there are issues with NPM’s shared folders in Vagrant first you must cd into the content auditor frontend and install all packages
And then cd into the client folder and install all packages, steps below:

(Later I will docker the client application so users can simply run vagrant up)

cd content-auditor-frontend
npm install --save truffle-hdwallet-provider@web3-one
Npm install —ignore-optional
truffle compile
truffle migrate --network quickstartWallet
Cd client
Nom install —ignore-optional

To run demo
Vagrant up hyplerledger
Vagrant up api
Vagrant up user_interface

To view the tests: vagrant ssh user_interface
Cd /vagrant/content-auditor/frontend 
Truffle test —network quickstartWallet


Tests: The tests ensure that data is correctly being hashed on the blockchain, and that the function returns the right true / false for all data types hashed on the blockchain.


Design pattern Decisions

Avoiding Common Attacks
The largest tool I used to avoid common attacks was to create contracts that did not handle ether, removing the desire for monetary gain defeats the need for intense security scrutiny and more focus can be paid on functionality and rigidiy. I also  avoided state changes after call functions. Marked visibility in my functions and avoided using deprecated solidity functions.