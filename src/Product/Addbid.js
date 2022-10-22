import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './Addproduct.css';
var phoneNumberValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
var emailValidation = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
var intValidation = new RegExp(/^[0-9\b]+$/);

let Isvalid;

export const Productlist = (props) => (
    <div className="form-group">
        <select
            className="form-control"
            name="{props.name}"
            onChange={props.onChange} style={{ float: 'left', paddingRight: '5px', width: '30%' }} >
            <option defaultValue>Select Product</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    </div>
)

class Addbid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            collection: [],
            value: '',
            name: '',
            FirstName: '',
            LastName: '',
            Address: '',
            City: '',
            State: '',
            Pin: '',
            Phone: '',
            Email: '',
            ProductId: '',
            ProductName: '',
            BidAmount: ''
        }
    }

    componentDidMount() {
        fetch('https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/products')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))
    }

    onChange = (event) => {
        this.state.ProductId = event.target.value;
        this.state.ProductName = event.target.name;
    }

    Addbid = () => {
    
        if (this.state.FirstName === "" || this.state.LastName === "" || this.state.Address === "" || this.state.City === "" || this.state.Pin === "" || this.state.Phone === "" || this.state.Email === "" || this.state.ProductId === "" || this.state.BidAmount === "") {
            alert("Please enter all the details");
            Isvalid = false;
        }

        else if (this.state.FirstName.length < 5 || this.state.FirstName.length > 30) {
            alert("FirstName should be minimum 5 and maximum 30 length");
            Isvalid = false;
        }

        else if (this.state.LastName.length < 3 || this.state.LastName.length > 25) {
            alert("LastName should be  minimum 3 and 25 length");
            Isvalid = false;
        }

        else if (!intValidation.test(this.state.BidAmount)) {
            alert("Incorrect bid amount");
            Isvalid = false;
        }

        else if (!intValidation.test(this.state.Pin)) {
            alert("Incorrect pin");
            Isvalid = false;
        }

        else if (this.state.Phone.length > 10) {
            alert("Incorrect phone number");
            Isvalid = false;
        }

        else if (!phoneNumberValidation.test(this.state.Phone)) {
            alert("Incorrect phone number");
            Isvalid = false;
        }

        else if (!emailValidation.test(this.state.Email)) {
            alert("Incorrect email");
            Isvalid = false;
        }

        else if (this.state.ProductName.length < 5 || this.state.ProductName.length > 30) {
            alert("Product Name Should Have Minimum Length 5 and Maximum Length 30");
            Isvalid = false;
        }    
        else {
            Isvalid = true;
        }

        if (Isvalid) {
            axios.post('https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/buyer/place-bid',
                {
                    firstName: this.state.FirstName,
                    lastName: this.state.LastName,
                    address: this.state.Address,
                    city: this.state.City,
                    state: this.state.Status,
                    pin: parseInt(this.state.Pin),
                    phone: this.state.Phone,
                    email: this.state.Email,
                    productId: this.state.ProductId,
                    bidAmount: parseInt(this.state.BidAmount)
                })
                .then(json => {
                    if (json.status = 200) {
                        alert("Adding bid to the product completed");
                        window.location.href = 'https://e-auction-web-app.azurewebsites.net/';
                    }
                    else {
                        alert('Error occurred while adding the bid to the product');
                    }
                }).catch(err => {
                    alert(err.response.data);
                })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Enter Bid Information</h4>
                <Form className="form">
                    <Col>
                        <FormGroup row>
                            <Label for="Product" sm={2}>Product</Label>
                            <Col sm={10}>
                                <Productlist
                                    name={this.state.name}
                                    options={this.state.collection}
                                    onChange={this.onChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="FirstName" sm={2}>FirstName</Label>
                            <Col sm={10}>
                                <Input type="text" name="FirstName" onChange={this.handleChange} value={this.state.FirstName} placeholder="Enter FirstName" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="LastName" sm={2}>LastName</Label>
                            <Col sm={10}>
                                <Input type="text" name="LastName" onChange={this.handleChange} value={this.state.LastName} placeholder="Enter LastName" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Address" sm={2}>Address</Label>
                            <Col sm={10}>
                                <Input type="text" name="Address" onChange={this.handleChange} value={this.state.Address} placeholder="Enter Address" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="City" sm={2}>City</Label>
                            <Col sm={10}>
                                <Input type="text" name="City" onChange={this.handleChange} value={this.state.City} placeholder="Enter City" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="State" sm={2}>State</Label>
                            <Col sm={10}>
                                <Input type="text" name="State" onChange={this.handleChange} value={this.state.State} placeholder="Enter State" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Pin" sm={2}>Pin</Label>
                            <Col sm={10}>
                                <Input type="text" name="Pin" onChange={this.handleChange} value={this.state.Pin} placeholder="Enter Pin" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Phone" sm={2}>Phone</Label>
                            <Col sm={10}>
                                <Input type="text" name="Phone" onChange={this.handleChange} value={this.state.Phone} min="1" max="10" placeholder="Enter Phone" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="text" name="Email" onChange={this.handleChange} value={this.state.Email} placeholder="Enter Email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="BidAmount" sm={2}>BidAmount</Label>
                            <Col sm={10}>
                                <Input type="text" name="BidAmount" onChange={this.handleChange} value={this.state.BidAmount} placeholder="Enter Bidamount" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup row>
                            <Col sm={5}>
                            </Col>
                            <Col sm={1}>
                                <button type="button" onClick={this.Addbid} className="btn btn-success">Submit</button>
                            </Col>
                            <Col sm={1}>
                                <Button color="danger">Cancel</Button>{' '}
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>
                </Form>
            </Container>
        );
    }
}

export default Addbid;