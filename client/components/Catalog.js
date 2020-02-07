import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3333/api/posts").then(product => {
      this.setState({
        product: product.data
      });
    });
  }

  render() {
    return (
      <div className="m-8">
        <ul className="index">
          {this.state.product.map(product => (
            <li key={product.productName}>
              <h2>
                <Link to={`/product/${product._id}`}>{product.productName}</Link>
              </h2>
              <h6>
              {product.description}
              </h6>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Catalog;
