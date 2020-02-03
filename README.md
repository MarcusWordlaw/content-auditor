# Content Auditor Blockchain App

## Objective
**The purpose of this project is to demo the ability for cross organizational data to utilize Blockchain as an audit layer. The system shows how an administrator can be alerted to information that was modified.**

---
### Project Requirements
- Vagrant
- Nodejs
- NPM
- Metamask

---
### Project Setup
Because there are issues with NPM’s shared folders in Vagrant first you must cd into the content auditor frontend and install all packages And then cd into the client folder and install all packages, steps below:

*(Later I will docker the client application so users can simply run vagrant up)*
``` javascript
cd content-auditor-frontend
npm install

cd client
npm install
// If npm install doesn’t work, remove package-lock.json file and rerun npm install 
```

**New terminal**

``` javascript
vagrant up hyperledger
```

**Setup Metamask**

- Custom RPC: http://172.16.1.102:8545

- Import account with private key: 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63

**New terminal**
``` javascript
vagrant up api
```

**New terminal**
``` javascript
vagrant up user_interface
```


**Check endpoints** 
- Hyperledger: http://172.16.1.102:32768/
- Rails api: http://172.16.1.100:3000/
- React UI: http://172.16.1.101:3000/login

## Tests
**To view the tests:**
``` javascript
//While vagrant user_interface is running
 vagrant ssh user_interface
 cd /vagrant/content-auditor/frontend
 truffle test —network quickstartWallet
```

**Tests:** The tests were written to ensure that data is correctly being hashed on the blockchain, and that the function returns the right true / false for all data types hashed on the blockchain.
