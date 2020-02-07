import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form } from 'react-bootstrap';
import axios from "axios";
import Login from "./login";
import Button from 'react-bootstrap/Button';
import logo from './media/logo.jpg';
import "./header.css";

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      CurUser:''
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3333/api/curuser").then(
      CurUser => {
      this.setState({
        CurUser: CurUser.data
      }
      );
    });
    
  }
  logout(){
    console.log(localStorage.getItem('jwtToken'))
    localStorage.removeItem('jwtToken');
    axios.post("http://localhost:3333/api/curuser");
    window.location.reload();
  }
  
  
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark" className="Nav">
    <Navbar.Brand as={Link} to="/"><img src={logo} width="70" height="70" /></Navbar.Brand>
    <Navbar.Toggle />
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Catalog">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/Conditions">Условия аренды</Nav.Link>
            <Nav.Link as={Link} to="/About">О компании</Nav.Link>
            
            
            </Nav>
        
        <Form inline >
        <Nav className="mr-auto">
            <New token={localStorage.getItem('jwtToken')} User={this.state.CurUser} />
            <Pro token={localStorage.getItem('jwtToken')} />
            <Nav.Link>{this.state.CurUser}</Nav.Link>
            </Nav>
        </Form>
          
      <LoginHed User={this.state.CurUser} logout={this.logout} token={localStorage.getItem('jwtToken')}/>      

      </Navbar>
    )
  };
}

function LoginHed(props) {
  console.log(props.User)
    if (props.token==null){
          return(
        <Form inline>
        <Link to="/login" variant="warning" type="button">Войти</Link>
        </Form>)
    }
    else{
      return(
      <Form inline >
      <Button onClick={props.logout} onSuvariant="warning" type="button">Выйти</Button>
      </Form>)
    }
}
function Pro(props) {
  console.log(props.User)
    if (props.token!=null){
          return (
      <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
      )
    }
    else return null
}
function New(props) {
  console.log(props.User)
    if (props.token!=null&&props.User=="Admin@mail.ru"){
          return (
      <Nav.Link as={Link} to="/new">Новый продукт</Nav.Link>
      )
    }
    else return null
}

export default Header;
