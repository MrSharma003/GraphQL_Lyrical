import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { query } from '../queries/fetcgSongList';

class SongCreate extends Component {

    constructor(props){
        super(props);
        this.state = {title: ""};
        // console.log(this.props.mutate);
    }

    handleOnSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables:{ title: this.state.title },
            refetchQueries: [{ query: query}]
        }).then(() => hashHistory.push('/')); 
    }

  render() {
    return (
      <div>
        <Link to='/' className='btn-floating'>
            <i className='material-icons'>arrow_back</i>
        </Link>
        <h3>Add new song title</h3>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
            <label>Song Title</label>
            <input 
            value={this.state.title}
            onChange={event => this.setState({title: event.target.value})}
             />
        </form>
      </div>
    )
  }
}

const mutation = gql `
mutation AddSong($title: String){
    addSong(title: $title){
      lyrics{
        content
      }
    }
  }
`;

export default graphql(mutation)(SongCreate);
