import React from 'react';
import './Addproduct.css';
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Table from './Table';

export const Productlist = (props) => (
  <div className="form-group">
    <strong>{props.username}</strong>
    <select
      className="form-control"
      name="{props.name}"
      onChange={props.onChange} style={{ float: 'left', paddingRight: '5px', width: '30%' }} >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
)


export default class FetchProductDetails extends React.Component {

  constructor() {
    super()
    this.state = {
      product: '',
      collection: [],
      value: '',
      name: '',
      BidEndDate: '',
      Category: '',
      DetailedDescription: '',
      ProductName: '',
      ShortDescription: '',
      StartingPrice: '',
      Bids: []
    }
  }

  tabRow() {
    return this.state.Bids.map(function (object, i) {
      return <Table obj={object} key={i} />;
    });
  }

  getProductDetails = () => {
    fetch(`https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/show-bids/${this.state.product}`)
      .then((response) => response.json())
      .then((res) => this.setState({
        ProductName: res.name,
        ShortDescription: res.shortDescription,
        DetailedDescription: res.detailedDescription,
        Category: res.category,
        StartingPrice: res.startingPrice,
        BidEndDate: res.bidEndData,
        Bids: res.bids
      }))
  }

  componentDidMount() {
    fetch('https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/products')
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }))
  }

  onChange = (event) => {
    this.state.product = event.target.value;
    console.info(this.state.product);
  }

  render() {
    return (
      <Container className="App">
        <Form className="form"> </Form>
        <Col>
          <FormGroup row>
            <Label for="Product" sm={2}>Product</Label>
            <Col sm={10}>
              <Productlist
                name={this.state.name}
                options={this.state.collection}
                onChange={this.onChange} />
              <div className="form-group" style={{ paddingRight: '527px' }}>
                <button type="button" className="btn" onClick={this.getProductDetails} style={{ backgroundColor: 'grey', flexDirection: 'row', justifyContent: 'space-between' }} >Fetch Details</button>
              </div>
            </Col>
          </FormGroup>
          <div id='details'>
            <FormGroup row>
              <Label for="ProductName" sm={2}>Name</Label>
              <Col sm={4}>
                <Input type="text" name="Name" value={this.state.ProductName} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ShortDescription" sm={2}>ShortDescription</Label>
              <Col sm={4}>
                <Input type="text" name="ShortDescription" value={this.state.ShortDescription} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="DetailedDescription" sm={2}>DetailedDescription</Label>
              <Col sm={4}>
                <Input type="text" name="ShortDescription" value={this.state.DetailedDescription} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Category" sm={2}>Category</Label>
              <Col sm={4}>
                <Input type="text" name="Category" value={this.state.Category} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="StartingPrice" sm={2}>StartingPrice</Label>
              <Col sm={4}>
                <Input type="text" name="StartingPrice" value={this.state.StartingPrice} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="BidEndDate" sm={2}>BidEndDate</Label>
              <Col sm={4}>
                <Input type="text" name="BidEndDate" value={this.state.BidEndDate} />
              </Col>
            </FormGroup>
          </div>
          <div id='bidDetails'>
            <h4 align="center">Bids</h4>
            <table className="table table-striped" style={{ marginTop: 5 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>BidAmount</th>
                  <th>Email</th>
                  <th>MobileNumber</th>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
          </div>
        </Col>
      </Container>
    )

  }
}