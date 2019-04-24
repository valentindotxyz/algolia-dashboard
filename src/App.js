import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import Home from './Home';
import MoviesAdd from './MoviesAdd/MoviesAdd';

import './app.scss';

export const searchClient = algoliasearch(
    'testing1Z3Y8G0N82',
    '66a721959acf04c37d017398f883c9a7'
);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalAddMovieDisplayed: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = toggle => {
        this.setState({ modalAddMovieDisplayed: toggle });
    };

    render() {
        const { modalAddMovieDisplayed } = this.state;

        return (
            <InstantSearch indexName="movies" searchClient={searchClient}>
                <Configure hitsPerPage={23} />
                <div className="app container">
                    <Router>
                        <Route exact path="/" component={() => <Home toggleModal={this.toggleModal} />} />
                    </Router>
                </div>

                {modalAddMovieDisplayed &&
                    <MoviesAdd toggleModal={this.toggleModal} />
                }
            </InstantSearch>
        )
    }
}

export default App;
