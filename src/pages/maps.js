import * as React from 'react';
import Map from 'react-map-gl';
//import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {useEffect, useState} from 'react'
import "./map.css"
import { Button, Container } from 'react-bootstrap';
import NavBar from '../components/navBar/navBar';

 

export default function SimpleMap() {
    const cloudCover = ["0%-6%","6%-19%","19%-31%","31%-44%","44%-56%","56%-69%","69%-81%","81%-94%", "94%-100%"]
    const windSpeed = [ "Below 0.3m/s (calm)", "0.3-3.4m/s (light)","3.4-8.0m/s (moderate)","8.0-10.8m/s (fresh)", 
                    "10.8-17.2m/s (strong)","17.2-24.5m/s (gale)","24.5-32.6m/s (storm)","Over 32.6m/s (hurricane)"]

    // for the map viewer
    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
      });
    // for the return data from the api
    const [data, setData] = useState({
    })
    // enable/disable information button
    const [disableButton, setButtonState] = useState(false) 

    useEffect(() => {
        if (disableButton) {
            console.log("disabledButton")
            console.log(disableButton)
        const parameters = {
            lon:viewState.longitude,
            lat:viewState.latitude,
            ac: 0,
            unit: "metric",
            output: "json",
            tzshift: 0
        }
        // meteo has more information that can be added
        // snow depth, etc.
        fetch("https://www.7timer.info/bin/astro.php?" + new URLSearchParams(parameters).toString(), {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            let newWeather = {
                temp: data.dataseries[0].temp2m,
                cloudCover: data.dataseries[0].cloudcover,
                windDirection: data.dataseries[0].wind10m.direction,
                windSpeed: data.dataseries[0].wind10m.speed
            }
            setData((prevState) => {
                return ({...prevState, weather: newWeather })
              })
              setTimeout(() => {setButtonState(false)}, 500)
        })
        //.then(setButtonState(false)); 
        } else {
            console.log("enabled button")
        }
    }, [disableButton])

      async function getInformation() {
        setButtonState(true)
        return        
      }

    return (
        <Container id="all-map">
            <NavBar variant="dark"/>
            <div id="map-wrapper">
                <div  id="side-bar">
                    <p> Longitude: {viewState.longitude.toFixed(2)} | Latitude: {viewState.latitude.toFixed(2)} | Zoom : {viewState.zoom.toFixed(1)} </p>
                    {data.weather? <p> Temperature: {data.weather.temp} | Cloud Cover: {cloudCover[data.weather.cloudCover]} | Wind Direction: {data.weather.windDirection} | Wind Speed: {windSpeed[data.weather.windSpeed]}</p> : <></>}
                    <Button onClick={getInformation} disabled={disableButton}>Get Weather</Button>
                </div>
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v11">  
                </Map>
            </div>
        </Container>
    );
}