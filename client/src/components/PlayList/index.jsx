import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PLAYLIST, GET_SINGLE_PLAYLIST } from '../../utils/query';
import { useState, useEffect } from 'react';

import './PlayList.css';
const PlayList = () => {
  const songs = [
    'Good Song',
    'Better Song',
    'Best Song',
    'Worst Song',
    'Bad Song',
  ];

  const { id: playlistId } = useParams();
  const { data } = useQuery(GET_SINGLE_PLAYLIST, { variables: { playlistId } });
  console.log(playlistId);
  console.log(data);
  // const songs2 = data.getSinglePlaylist;
  // console.log(songs2);
  return (
    <>
      <Navbar />
      {/* <container className="playlist-card"> */}
      <div className="playlist">
        <h1>Playlist Name</h1>
        <img
          className="playlist-img"
          src="https://via.placeholder.com/150"
          alt="playlist"
        />
        {songs.map((song, index) => (
          <div key={index} className="details">
            <Link to={`playlist-page`}> </Link>
            {/* <img src={song.artworkUrl} alt={song.name} /> */}
            <img
              className="song-art"
              src="https://via.placeholder.com/150"
              alt="song-art"
            />
            <div className="song-info">
              <h4 className="song">{song}</h4>
              <p className="artist">song.artist</p>
              <h5 className="duration">song.duration</h5>
            </div>
          </div>
        ))}
      </div>
      {/* </container> */}
    </>
  );
};

export default PlayList;
