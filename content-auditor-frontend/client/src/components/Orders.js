import React, { Component } from "react";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

class Orders extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userDocuments: null,
          userOrganization: null,
          userName: null,
          document: " ",
          messageChecked: null,
          hashedMessage: null,
          userSession: null,
          user: this.props.user,
          allDocuments: null,
          docBoolArray: []
          };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.loadLoggedInUserData();
        this.loadAdminData();
    }

    loadAdminData(){
        axios.get('http://172.16.1.100:3000/api/v1/documents', {withCredentials: true})
        .then( response => {
            this.setState({
                allDocuments: response.data
            })
        })
    }

    loadLoggedInUserData(){
        axios.get('http://172.16.1.100:3000/api/v1/logged_in', {withCredentials: true})
        .then(response => {
            this.setState({
                userDocuments: response.data.documents,
                userOrganization: response.data.organization.name,
                userName: response.data.user.name
            })
        })
    }
    handleChange(event) {
      this.setState({document: event.target.value});
    }
  
    //This method posts a new document and hashes it onto the blockchain
    //This method should also store the hashed message in a state variable to be stored in DB later
    handleSubmit(event){
        event.preventDefault();
        this.postHashedDocumentABI();
    }
  
    postHashedDocumentABI = async () => {
      const { accounts, contract } = this.props;
      const { document } = this.state;
      //Invoking set method in content tracking contract to post document to blockchain
      await contract.methods.storeDocument(document).send({ from: accounts[0] });
  
      //Method to set hashed document as a state variable
      const hashResponse = await contract.methods.returnHashedDocument(document).call();
      this.setState( { hashedMessage: hashResponse } );
  
      //Method to post document and hashed document to API as well as user ID
      this.postHashedDocumentAPI()
    }
  
    postHashedDocumentAPI(){
        const { document, hashedMessage, userDocuments } = this.state
        const newDocuments = userDocuments
        const newData = {
            content: document,
            hashedmessage: hashedMessage,
            user_id: this.props.user.id
          }
          newDocuments.push(newData)
          this.setState({ userDocuments: newDocuments })
           
          axios.post("http://172.16.1.100:3000/api/v1/documents", newData,
          { withCredentials: true } )
          .then(response => { 
              console.log("In Post",response.data.status);
          })
          .catch(error => {
              console.log("post error", error);
          })
    }
  
    //This method takes in a new document to check if it already exists on the blockchain
    //Should return True/False
    checkNewDocument = async (event) => {
      event.preventDefault();
      const { contract } = this.props;
      const { document } = this.state;
      //Invoking check method in content tracking contract
      const response = await contract.methods.newDocument(document).call();
      alert(response);
      //Update state with the result.
      this.setState( { messageChecked: response } );
    }

    checkBlockchainData = async (event) => {
        event.preventDefault();
        const { allDocuments } = this.state;
        const { contract } = this.props;
        let contentInstance;
        let response;
        let docCheck = [];
        for(let i = 0; i < allDocuments.length; i++){
            contentInstance = allDocuments[i].content
            response = await contract.methods.newDocument(contentInstance).call();
            docCheck.push(response)
        }
        this.setState( {
            docBoolArray: docCheck
        })
    }
    render() {
        let docList = <tr><td>Add</td><td>Doc</td></tr>;
        let organizationName;
        let adminPanel;
        if(this.state.userOrganization){
            organizationName = this.state.userOrganization
        }
        if(this.state.user)
        if(this.state.user.admin === true){
            if(this.state.allDocuments !== null){
                if(this.state.docBoolArray !== null)
                adminPanel = this.state.allDocuments.map( (x, i) =>
                <TableRow key={x.id} value={x.id}>
                    <TableCell>{x.user_id}</TableCell>
                    <TableCell>{x.content}</TableCell>
                    <TableCell>{x.hashedmessage}</TableCell>
                    <TableCell>{String(this.state.docBoolArray[i])}</TableCell>
                </TableRow>
                )
            }
            return(
                <React.Fragment>
                    <Title>Organization: {organizationName}</Title>
                    <Title>User: {this.props.user.name}</Title>
                        <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Users ID</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Hashed Message</TableCell>
                            <TableCell>Authentic?</TableCell>
                            {/* <TableCell align="right">Sale Amount</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminPanel}
                        </TableBody>
                    </Table>
                    <div>
                    <p/>
                    <form onSubmit={this.checkBlockchainData}>
                    <label> Check content authenticity </label>
                    <input type="submit" value="Check" />
                    </form>
                </div>
                </React.Fragment>
            )
        }
        if(this.state.userDocuments){
            docList = this.state.userDocuments.map( (x) => 
            <TableRow key={x.id} value={x.id}>
                <TableCell>{x.content}</TableCell>
                <TableCell>{x.hashedmessage}</TableCell>
            </TableRow>
            )
          }

      return (
        <React.Fragment>
            <Title>Organization: {organizationName}</Title>
            <Title>User: {this.props.user.name}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Content</TableCell>
                        <TableCell>Hashed Message</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {docList}
                    </TableBody>
            </Table>
            <div>
            <p/>
            <form onSubmit={this.handleSubmit}>
                <label>
                Post a Document to Blockchain: 
                <input type="text" placeholder="Post Document" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        </React.Fragment>
      );
    }
  }
  export default Orders;
