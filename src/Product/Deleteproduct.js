import React from 'react';
import './Addproduct.css';
import { Container, Col, Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
let Isvalid;

export const Productlist = (props) => (
    <div className="form-group">
        <strong>{props.username}</strong>
        <select
            className="form-control"
            name="{props.name}"
            onChange={props.onChange} style={{ float: 'left', paddingRight: '5px', width: '30%' }} >
            <option defaultValue>Select Product </option>
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
            name: ''
        }
    }

    componentDidMount() {
        fetch('https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/products')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))
    }

    DeleteProduct = () => {

        if (this.state.product === '') {
            alert("Please choose product");
            Isvalid = false;
        }
        else {
            Isvalid = true;
        }

        if (Isvalid) {

            axios.delete(`https://e-auction-api-gate-way.azurewebsites.net/apigateway/e-auction/api/v1/seller/delete/${this.state.product}`)
                .then(json => {
                    if (json.status = 200) {
                        alert("Product Delete Successfully");
                        window.location.href = 'https://e-auction-web-app.azurewebsites.net/';
                    }
                }).catch(err => {
                    alert(err.response.data);
                })
        }
    }

    onChange = (event) => {
        this.state.product ='';
        this.state.product = event.target.value;
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
                                <button type="button" className="btn" onClick={this.DeleteProduct} style={{ backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-between' }} >Delete</button>
                            </div>
                        </Col>
                    </FormGroup>
                </Col>
            </Container>
        )
    }

}