import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import { Link } from 'react-router';
import { query } from '../queries/fetcgSongList';
import gql from 'graphql-tag'

class SongList extends Component {

    handleOnDelete(id ){
      this.props.mutate({ variables: {id: id} })
      .then(() => this.props.data.refetch());
    }

    renderSong(){
      console.log(this.props)
        return this.props.data.songs.map(song => {
            return (
                <li className='collection-item'>
                  <Link to= {`songs/${song.id}`}>
                     {song.title}
                  </Link>
                  <i className='material-icons' onClick={ () => this.handleOnDelete(song.id)}>delete</i>
                </li>
            )
        })
    }

  render() {

    if (this.props.data.loading) {
        return <div>loading...</div>;
      }

    return (
        <div>
            <ul className='collection'>
                {this.renderSong()}
            </ul>
            <Link to='song/create' className='btn-floating btn-large red right'>
                <i className='material-icons'>add</i>
            </Link> 
        </div>
    )
  }
}

const mutation = gql `
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
