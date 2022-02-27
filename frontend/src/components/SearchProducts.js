import React from 'react'
import { Link } from "react-router-dom";
import './Product.css'
import './searchProducts.css'
import { connect } from "react-redux";
import { productsSearch } from '../services/SearchService'
import { addToCart } from '../services/MyCartService'
import { productRedirect } from '../actions/searchAction'

class SearchProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.match.params.keyword ? this.props.match.params.keyword : '',
            category: this.props.match.params.category ? this.props.match.params.category : '',
            loaded: false
        };
    }
    componentDidMount() {
        this.props.productRedirect(false);
        this.props.search(this.state.keyword, this.state.category)
        this.setState(
            { loaded: true }
        );
    }

    componentDidUpdate(prevProps) {
        this.props.productRedirect(false);
        if (prevProps.match.params.keyword != this.props.match.params.keyword ||
            prevProps.match.params.category != this.props.match.params.category) {
            let keyword = this.props.match.params.keyword;
            let category = this.props.match.params.category ? this.props.match.params.category : '';
            this.setState({
                keyword: keyword,
                category: category,
            });
            this.props.search(keyword, category);
        }
    }

    render() {
        const products = this.props.products;
        if (products.length > 0)
            return (
                <div className='searchProducts-container'>
                    <h1>{this.state.keyword ? `Wyniki wyszukiwania dla "${this.state.keyword}":` : this.state.category.toUpperCase()}</h1>
                    {products.map((product) => (
                        <Link to={`/product:${product.id}`} className='searchProducts-product-container'>
                            <div class='searchProducts-product-left'>
                                <img src={`./products/${product.title_img}`} className='searchProducts-product-img' />
                                <h2>{product.title}</h2>
                            </div>
                            <div class='searchProducts-product-right'>
                                <h1>{`${product.price}zł`}</h1>
                                <Link to='#'>
                                    <button className="searchProducts-button" onClick={() => { this.props.addToCart(product.id, 1) }}>Dodaj do koszyka</button>
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>
            );

        if (this.state.loaded === false || this.props.inProgress)
            return <div>Ładowanie...</div>

        if (products.length < 1)
            return <div>Brak wyników</div>

    }

}

const mapStateToProps = (state) => {
    return {
        products: state.searchProductsReducer.products,
        inProgress: state.searchProductsReducer.inprogress,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        search: (keyword, category) => {
            dispatch(productsSearch(keyword, category));
        },
        productRedirect: (state) => {
            dispatch(productRedirect(state));
        },
        addToCart: (productId, amount) => {
            dispatch(addToCart(productId, amount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);