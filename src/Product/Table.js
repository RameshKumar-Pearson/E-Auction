import React, { Component } from 'react';  

class Table extends Component {  
  constructor(props) {  
    super(props);  
    }  
      
  render() {  
    return (  
        <tr>  
          <td>  
            {this.props.obj.name}  
          </td>  
          <td>  
            {this.props.obj.bidAmount}  
          </td>  
          <td>  
            {this.props.obj.email}  
          </td>  
          <td>  
            {this.props.obj.mobileNumber}  
          </td>
        </tr>  
    );  
  }  
}  
  
export default Table;  