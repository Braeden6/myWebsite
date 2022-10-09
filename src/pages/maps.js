import * as React from 'react';
import Map, {FullscreenControl} from 'react-map-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useEffect, useRef, useState} from 'react'
import "./map.css"
import { Container } from 'react-bootstrap';
import NavBar from '../components/navBar/navBar';
 

export default function SimpleMap() {
    const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
      });


    return (
        <Container id="all-map">
            <NavBar variant="dark"/>
            <div id="map-wrapper">
                <p id="side-bar"> Longitude: {viewState.longitude} | Latitude: {viewState.latitude} | Zoom : {viewState.zoom} </p>
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v11">  
                </Map>
            </div>
        </Container>
    );
}