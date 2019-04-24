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
            form: {
                title: '',
                actors: [],
                genres: [],
                thumbnail: '',
                year: '',
                rating: ''
            },
            errors: { },
            submitting: false
        };

        this.updateField = this.updateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    updateField = (field, value) => {
        const oldState = this.state;
        const newState = { ...oldState, form: { ...oldState.form, [field]: value } };

        this.setState(newState);
    };

    validateForm = () => {
        const { form } = this.state;
        let errors = {};

        console.log(form.title, form.title.trim());

        if (!form.title.trim().length) {
            errors.title = "Title cannot be empty.";
        }

        if (!form.actors.length) {
            errors.actors = "At least one actor must be selected."
        }

        if (!form.genres.length) {
            errors.genres = "At least one genre must be selected."
        }

        if (!form.thumbnail.trim().length) {
            errors.thumbnail = "Thumbnail URL cannot be empty.";
        }

        if (!form.year.trim().length) {
            errors.year = "Year cannot be empty.";
        }

        if (!Number.isInteger(parseInt(form.rating))) {
            errors.rating = "Year must be a valid number.";
        }

        if (!form.rating.trim().length) {
            errors.rating = "Rating URL cannot be empty.";
        }

        if (!Number.isInteger(parseInt(form.rating))) {
            errors.rating = "Rating must be a valid number.";
        }

        this.setState({ errors }, () => {
            if (Object.keys(errors).length) {
                return;
            }

            this.addMovie();
        });
    };

    addMovie = () => {
      let requestBody = { ...this.state.form };
      requestBody.actors = requestBody.actors.map(actor => actor.name);
      requestBody.genres = requestBody.genres.map(genre => genre.name);

      this.setState({ submitting: true }, () => {
          axios.post('/api/1/movies', requestBody)
              .then(() => setTimeout(() => window.location.reload(false), 2000))
              .catch(err => alert('Could not add movie; please retry.'));
      });
    };

    displayError = field => {
        const { errors } = this.state;

        if (!errors[field])
            return false;

        return (
            <span className="add-movie-error">{errors[field]}</span>
        )
    };

    render() {
        const { toggleModal } = this.props;
        const { title, thumbnail, year, rating, submitting } = this.state;

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
                            {this.displayError('title')}
                        </p>
                        <InstantSearch indexName="actors" searchClient={searchClient}>
                            <label>Actors</label>
                            <TagsBox selectedTagComponent={SuggestedAndSelectedComponent}
                                     suggestedTagComponent={SuggestedAndSelectedComponent}
                                     onUpdate={newTags => this.updateField('actors', newTags)}
                                     translations={{ placeholder: "Search for an actor…", noResult: "No actor found." }}
                            />
                            {this.displayError('actors')}
                        </InstantSearch>
                        <InstantSearch indexName="genres" searchClient={searchClient}>
                            <label>Genres</label>
                            <TagsBox selectedTagComponent={SuggestedAndSelectedComponent}
                                     suggestedTagComponent={SuggestedAndSelectedComponent}
                                     onUpdate={newTags => this.updateField('genres', newTags)}
                                     translations={{ placeholder: "Search for a genre…", noResult: "No genre found." }}
                            />
                            {this.displayError('genres')}
                        </InstantSearch>
                        <p>
                            <label htmlFor="add-movie-thumbnail">Thumbnail URL</label>
                            <input value={thumbnail}
                                   onChange={e => this.updateField('thumbnail', e.currentTarget.value)}
                                   id="add-movie-thumbnail"
                                   type="text"
                                   placeholder="https://imdb.com/images/..."
                                   required />
                            {this.displayError('thumbnail')}
                        </p>
                        <p>
                            <label htmlFor="add-movie-year">Year</label>
                            <input value={year}
                                   onChange={e => this.updateField('year', e.currentTarget.value)}
                                   id="add-movie-year"
                                   type="text"
                                   placeholder="2010"
                                   required />
                            {this.displayError('year')}
                        </p>
                        <p>
                            <label htmlFor="add-movie-rating">Rating</label>
                            <input value={rating}
                                   onChange={e => this.updateField('rating', e.currentTarget.value)}
                                   id="add-movie-rating"
                                   type="text"
                                   placeholder="5"
                                   required />
                            {this.displayError('rating')}
                        </p>
                        <br />
                        <p>
                            <button type="button" onClick={this.validateForm} className="btn btn-danger" disabled={submitting}>
                                {submitting ? 'Adding movie…' : 'Add Movie'}
                            </button>
                        </p>
                    </form>
                    <span className="close-modal" onClick={() => toggleModal(false)}>✕</span>
                </div>
            </div>
        )
    }
}

export default MoviesAdd;