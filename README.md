# Content Auditor Blockchain App

## Objective
**The purpose of this project is to demo the ability for cross organizational data to utilize Blockchain as an audit layer. The system shows how an administrator can be alerted to information that was modified.**

---
### Project Requirements
- Vagrant
- Metamask
- Chrome / Firefox browser

---
### Project Setup


**New terminal**

``` javascript
// Create a Hyperledger VM instance
vagrant up hyperledger
```

**Setup Metamask**
- Add metamask extension at https://metamask.io/
- create wallet
- create a password
- In the upper right corner drop down the "Main Ethereum Network" tab and select "Custom RPC"
- Create a network name
- In New RPC URL Add: http://172.16.1.102:8545
- In the upper right corner click your avatar and select import account
- Import account with private key: 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63

**New terminal**
``` javascript
// Create a Rails API w/postgresql VM instance
vagrant up api
```

**New terminal**
``` javascript
// Create a UI VM instance
vagrant up user_interface
```


**Check endpoints** 
- Hyperledger Block Explorer: http://172.16.1.102:32768/
- Rails api: http://172.16.1.100:3000/
- React UI: http://172.16.1.101:3000/login

## Tests
**To view the tests:**
``` javascript
//While vagrant user_interface is running
 vagrant ssh user_interface
 cd /vagrant/content-auditor-frontend
 truffle test —network quickstartWallet
```

**Tests:** The tests were written to ensure that data is correctly being hashed on the blockchain, and that the function returns the right true / false for all data types hashed on the blockchain.
