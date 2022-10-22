import axios from 'axios';
import React from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './Addproduct.css';

var phoneNumberValidation = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
var emailValidation = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
var intValidation = new RegExp(/^[0-9\b]+$/);

let Isvalid;

class Addproduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      FirstName: '',
      LastName: '',
      Address: '',
      City: '',
      State: '',
      Pin: '',
      Phone: '',
      Email: '',
      ProductName: '',
      ShortDescription: '',
      DetailedDescription: '',
      Category: '',
      StartingPrice: '',
      BidEndDate: '',
      categoryOptions: [
        { key: '0', value: 'Select Category' },
        { key: '1', value: 'Painting' },
        { key: '2', value: 'Sculptor' },
        { key: '3', value: 'Ornament' }
      ]
    }
  }

  Addproduct = () => {

    if (this.state.FirstName === "" || this.state.LastName === "" || this.state.Address === "" || this.state.City === "" || this.state.State === "" || this.state.Phone === "" || this.state.name === "" ||
      this.state.ShortDescription === "" || this.state.DetailedDescription === "" || this.state.StartingPrice === "" || this.state.BidEndDate === "") {
      alert("Please enter all the details");
      Isvalid = false;
    }

    else if (this.state.Category === 'Select Category') {
      alert("Incorrect Category");
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

    else if (this.state.Phone.length > 10) {
      alert("Incorrect phone number");
      Isvalid = false;
    }

    else if (!phoneNumberValidation.test(this.state.Phone)) {
      alert("Incorrect phone number");
      Isvalid = false;
    }

    else if (!intValidation.test(this.state.Pin)) {
      alert("Incorrect pin");
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
      axios.post('https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/add-product',
        {
          firstName: this.state.FirstName,
          lastName: this.state.LastName,
          address: this.state.Address,
          city: this.state.City,
          state: this.state.Status,
          pin: parseInt(this.state.Pin),
          phone: this.state.Phone,
          email: this.state.Email,
          name: this.state.ProductName,
          shortDescription: this.state.ShortDescription,
          detailedDescription: this.state.DetailedDescription,
          category: this.state.Category,
          startingPrice: parseInt(this.state.StartingPrice),
          bidEndDate: this.state.BidEndDate
        })
        .then(json => {
          if (json.status = 200) {
            alert("Product Save Successfully");
            window.location.replace('https://e-auction-web-app.azurewebsites.net/');
          }
          else {
            alert('Data not Saved');
          }
        }).catch(err => {
          alert(err.response.data);
        })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  categoryChange = (e) => {
    var value = this.state.categoryOptions.filter(function (item) {
      return item.key == e.target.value
    })
    this.state.Category = value[0].value;
    console.info(this.state.Category);
  }

  render() {
    return (
      <Container className="App">
        <h4 className="PageHeading">Enter Seller Information</h4>
        <Form className="form">
          <Col>
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
          </Col>
          <h4 className="PageHeading">Enter Product Information</h4>
          <Col>
            <FormGroup row>
              <Label for="ProductName" sm={2}>Name</Label>
              <Col sm={10}>
                <Input type="text" name="ProductName" onChange={this.handleChange} value={this.state.ProductName} placeholder="Enter ProductName" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ShortDescription" sm={2}>ShortDescription</Label>
              <Col sm={10}>
                <Input type="text" name="ShortDescription" onChange={this.handleChange} value={this.state.ShortDescription} placeholder="ShortDescription" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="DetailedDescription" sm={2}>DetailedDescription</Label>
              <Col sm={10}>
                <Input type="text" name="DetailedDescription" onChange={this.handleChange} value={this.state.DetailedDescription} placeholder="DetailedDescription" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="" sm={2}>Category</Label>
              <Col sm={10}>
                <select className="form-control" onChange={this.categoryChange}>
                  {this.state.optionsdata.map(function (data, key) {
                    return (
                      <option key={key} value={data.key}>{data.value}</option>)
                  })}
                </select>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="StartingPrice" sm={2}>StartingPrice</Label>
              <Col sm={10}>
                <Input type="text" name="StartingPrice" onChange={this.handleChange} value={this.state.StartingPrice} placeholder="StartingPrice" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="BidEndDate" sm={2}>BidEndDate</Label>
              <Col sm={10}>
                <Input type="date" name="BidEndDate" onChange={this.handleChange} value={this.state.BidEndDate} placeholder="BidEndDate" />
              </Col>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup row>
              <Col sm={5}>
              </Col>
              <Col sm={1}>
                <button type="button" onClick={this.Addproduct} className="btn btn-success">Submit</button>
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

export default Addproduct;