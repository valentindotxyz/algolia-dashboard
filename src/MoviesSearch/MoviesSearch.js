import React from 'react';

import { connectSearchBox } from 'react-instantsearch-dom';

class MoviesSearch extends React.Component {
    render() {
        const { currentRefinement, refine } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <input type="search" value={currentRefinement} onChange={e => refine(e.currentTarget.value)} className="app-search" placeholder="Search for a movie, actor, genre…" autoFocus />
                </div>
            </div>
        )
    }
}

export default connectSearchBox(MoviesSearch);