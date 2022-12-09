import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Container,
  } from "reactstrap";
  import Logo from "./images/titlelogo.png";
import "../App.css";

const SuccessFailure = () => {
    return (
        <>
        <Container className="headcont">
    
    <Row md={12} style={{ background: "#0F1016"}}>
    <Col md={12} xs={12} sm={12} style={{ marginTop: "20px", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{ display: "flex", flexDirection: "column", alignContent: "center",  marginTop: "10px", marginLeft: "10px" }}
        >
          <img src={Logo} alt="" height="40px" />
        </div>
      </Col>
    </Row>
    <Row>
        <Col md={3} xs={1} sm={3}></Col>
        <Col style={{ border: "2px solid #6969ae", marginTop: "20px", background: "#25252f",padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }} md={6} xs={10} sm={6}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='flex flex-col items-center p-[30px] bg-[#25252f] b-rad rounded-[20px] my-5 w-[400px] border-solid border-[2px]'>
            <h3 className='text-white font-bold text-[16px] mb-5 text-center'>Email Verification Successfully</h3>
            <img className='h-28' style={{ height: "112px" }} src='/success.png' />
        </div>
        </Col>
    </Row>
    </Container>
        
        </>
    );
}

export default SuccessFailure;