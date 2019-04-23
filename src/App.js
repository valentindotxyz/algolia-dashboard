import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import MoviesGrid from './MoviesGrid';

import './app.scss';

const searchClient = algoliasearch(
    'testingFT56IW8U26',
    '3b5cea9faa89afa36723f152dfcb9f01'
);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InstantSearch indexName="movies" searchClient={searchClient}>
                <Configure hitsPerPage={24} />
                <div className="app container">
                    <Router>
                        <Route exact path="/" component={MoviesGrid} />
                    </Router>
                </div>
            </InstantSearch>
        )
    }
}

export default App;
