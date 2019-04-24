import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import TagsBox from 'instantsearch-tagsbox-react';
import axios from 'axios';

import { searchClient } from "../App";
import './movies-add.scss';

const SuggestedAndSelectedComponent = ({ hit }) => (
    <React.Fragment>
        {hit.name}
    </React.Fragment>
);

class MoviesAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            actors: [],
            genres: [],
            thumbnail: '',
            year: '',
            rating: ''
        };

        this.updateField = this.updateField.bind(this);
    }

    updateField = (field, value) => {
        this.setState({ [field]: value });
    };

    addMovie = () => {
      let requestBody = { ...this.state };
      requestBody.actors = requestBody.actors.map(actor => actor.name);
      requestBody.genres = requestBody.genres.map(genre => genre.name);

      axios.post('/api/1/movies', requestBody)
          .then(res => console.log(res))
          .catch(err => console.log(err));
    };

    render() {
        const { toggleModal } = this.props;
        const { title, thumbnail, year, rating } = this.state;

        return (
            <div className="add-movie-modal">
                <div className="add-movie-modal-inner">
                    <form>
                        <h1>Add a Movie</h1><br/>
                        <p>
                            <label htmlFor="add-movie-title">Title</label>
                            <input value={title}
                                   onChange={e => this.updateField('title', e.currentTarget.value)}
                                   id="add-movie-title"
                                   type="text"
                                   placeholder="Harry Potter and the Philosopher' Stone"
                                   required />
                        </p>
                        <InstantSearch indexName="actors" searchClient={searchClient}>
                            <label>Actors</label>
                            <TagsBox selectedTagComponent={SuggestedAndSelectedComponent}
                                     suggestedTagComponent={SuggestedAndSelectedComponent}
                                     onUpdate={newTags => this.updateField('actors', newTags)}
                                     translations={{ placeholder: "Search for an actor…", noResult: "No actor found." }}
                            />
                        </InstantSearch>
                        <InstantSearch indexName="genres" searchClient={searchClient}>
                            <label>Genres</label>
                            <TagsBox selectedTagComponent={SuggestedAndSelectedComponent}
                                     suggestedTagComponent={SuggestedAndSelectedComponent}
                                     onUpdate={newTags => this.updateField('genres', newTags)}
                                     translations={{ placeholder: "Search for a genre…", noResult: "No genre found." }}
                            />
                        </InstantSearch>
                        <p>
                            <label htmlFor="add-movie-thumbnail">Thumbnail URL</label>
                            <input value={thumbnail}
                                   onChange={e => this.updateField('thumbnail', e.currentTarget.value)}
                                   id="add-movie-thumbnail"
                                   type="text"
                                   placeholder="https://imdb.com/images/..."
                                   required />
                        </p>
                        <p>
                            <label htmlFor="add-movie-year">Year</label>
                            <input value={year}
                                   onChange={e => this.updateField('year', e.currentTarget.value)}
                                   id="add-movie-year"
                                   type="text"
                                   placeholder="2010"
                                   required />
                        </p>
                        <p>
                            <label htmlFor="add-movie-rating">Rating</label>
                            <input value={rating}
                                   onChange={e => this.updateField('rating', e.currentTarget.value)}
                                   id="add-movie-rating"
                                   type="text"
                                   placeholder="5"
                                   required />
                        </p>
                        <br />
                        <p>
                            <button type="button" onClick={this.addMovie} className="btn btn-danger">Add Movie</button>
                        </p>
                    </form>
                    <span className="close-modal" onClick={() => toggleModal(false)}>✕</span>
                </div>
            </div>
        )
    }

}

export default MoviesAdd;