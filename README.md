# Content Auditor Blockchain App

## Objective
**This project demo's the ability for cross organizational data to utilize Blockchain as an audit layer. The system displays how an organization's administrator can be alerted to the inclusion of modified or malicious data.**

---
### Project Requirements
- VirtualBox
- Vagrant
- Chrome / Firefox browser
- Metamask


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

### Design & System Architecture

The design is focused around an MVP for a content audit system utilizing Blockchain, the below photograph details the architecture. A hack of the system to simulate false messages can be done by using a curl command to post in the terminal.

```javascript
//Example http post request
curl --request POST -d document[content]=PegaSys%20Working -d document[hashedmessage]=0xb9cca56a720f2beee61f2e744ab3d20a95772a4315d18c5eee251a465f078012 -d document[user_id]=2 "http://172.16.1.100:3000/api/v1/documents"
```

![Design Architecture](https://i.imgur.com/B17YlKU.png)
