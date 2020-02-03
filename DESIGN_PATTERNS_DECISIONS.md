### Design Pattern Considerations

My design is focused around an MVP for a content audit system utilizing Blockchain, the below photograph details the architecture. A hack of the system to simulate false messages can be done by using a curl command to post in the terminal.

```javascript
//Example post
curl --request POST -d document[content]=PegaSys%20Working -d document[hashedmessage]=0xb9cca56a720f2beee61f2e744ab3d20a95772a4315d18c5eee251a465f078012 -d document[user_id]=2 "http://172.16.1.100:3000/api/v1/documents"
```

![Design Architecture](https://i.imgur.com/B17YlKU.png)

