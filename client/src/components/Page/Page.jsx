import React from 'react';
import Details from '../Details/Details.jsx';
import Dropdown1 from '../Dropdown1/Dropdown1.jsx';
import Material from '../Material/Material.jsx';
import NameOfItem from '../NameOfItem/NameOfItem.jsx';
import Stars from '../Stars/Stars.jsx';
import Module from '../Module/Module.jsx';
import { Box, Wrapper, Title, SalesTitle } from './Page.style.jsx';
import $ from 'jquery';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      product: [],
      apiData: [],
      rating: 0,
    }),
      (this.getDataFromDB = this.getDataFromDB.bind(this));
    this.getDataFromApi = this.getDataFromApi.bind(this);
  }

  componentDidMount() {
    this.getDataFromDB(this.props.id);
    this.getDataFromApi(this.props.id);
  }

  getDataFromDB(productId) {
    const { product } = this.state;
    $.ajax({
      url: `/itemDetails/${productId}`,
      method: 'GET',
      contentType: 'application/json',
      success: (productData) => {
        console.log('Product data', productData);
        this.setState({
          product: productData,
        });
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      },
    });
  }

  getDataFromApi(productId) {
    const { apiData } = this.state;
    $.ajax({
      url: `/info/${productId}`,
      method: 'GET',
      contentType: 'application/json',
      success: (result) => {
        var arrayData = [];
        arrayData.push(result);
        this.setState({
          apiData: arrayData,
          rating: result.rating,
        });
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      },
    });
  }

  render() {
    const { product, apiData, rating } = this.state;
    // console.log('API data ', apiData);
    console.log('rating from page', rating);
    return (
      <Wrapper>
        <Title>{apiData.map((object) => object.seller_name)}</Title>
        <Box>
          <SalesTitle>
            {apiData.map((object) => object.total_store_sales)} sales{' '}
          </SalesTitle>
          <span> | </span>
          <Stars rating={rating} />
        </Box>
        <NameOfItem product={product} />
        <Module apiData={apiData} />
        <Dropdown1 apiData={apiData} product={product} />
        <Material product={product} />
        <Details product={product} />
      </Wrapper>
    );
  }
}