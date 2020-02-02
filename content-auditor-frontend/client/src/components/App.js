import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Registration from "./auth/Registration";
import ContentTrackingContract from "../contracts/ContentTracking.json";
import getWeb3 from "../getWeb3";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      //Web3 & Smart Contract state variables
      web3: null,
      accounts: null,
      contract: null,
      
      //Login and user variables
      session: null,
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      organizationData: null, 
      userOrganization: {},
      userDocuments: {}
    }
    this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    this.loadWeb3();
    this.checkLoginStatus();
    this.getOrganizations();
  }
  //Checks to see if a user is logged in
  checkLoginStatus(){
    axios.get('http://172.16.1.100:3000/api/v1/logged_in', {withCredentials: true})
    .then(response => {
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      }
      else if( !response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error =>{
      console.log("check login error", error)
    } )
  }

  // Instantiates Web3 library and smart contracts
  loadWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ContentTrackingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ContentTrackingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState({ web3, accounts, contract: instance } );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  getOrganizations(){
    fetch('http://172.16.1.100:3000/api/v1/organizations', {withCredentials: true})
    .then(results => { return results.json(); })
    .then(data => this.setState({organizationData: data}))
  }

  handleLogout(history){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      userOrganization: {},
      userDocuments: {}
    })
    history.push("/login");
  }

  handleSuccesfulAuth(data, history){
    this.handleLogin(data);
    history.push("/dashboard");
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogoutClick(history){
    axios.delete('http://172.16.1.100:3000/api/v1/logout', {withCredentials: true})
    .then(response => {
        this.handleLogout(history); 
    })
    .catch(error => {
        console.log("logout error", error);
    }) 
  }
  render() {
    //Refactor these statements later
    if (this.state.organizationData === null) {
      return <div>Loading organization data ...</div>;
    }
    else if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else if (!this.state.user) {
      return <div>Loading user data...</div>;
    }
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
            exact 
            path={"/dashboard"}
            render={props => (
              <Dashboard { ...props} 
              handleLogoutClick={this.handleLogoutClick}
              loggedInStatus={this.state.loggedInStatus}
              web3={this.state.web3}
              accounts={this.state.accounts}
              contract={this.state.contract}
              user={this.state.user}/>
            )} />
            <Route 
            exact 
            path={"/registration"}
            render={props => (
              <Registration { ...props} 
                handleSuccesfulAuth={this.handleSuccesfulAuth}
                organizationData={this.state.organizationData}/>
            )} />
            <Route 
            exact 
            path={"/login"}
            render={props => (
              <Login { ...props} 
                handleSuccesfulAuth={this.handleSuccesfulAuth}/>
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
