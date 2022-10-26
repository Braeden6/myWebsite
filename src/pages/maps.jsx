import * as React from 'react';
import Map from 'react-map-gl';
import {useEffect, useState} from 'react'
import "../CSS/map.css"
import { Button, Container } from 'react-bootstrap';
import NavBar from '../components/navBar';

 

export default function SimpleMap() {
    // information can be found here: https://www.7timer.info/doc.php#astro
    const cloudCover = ["0%-6%","6%-19%","19%-31%","31%-44%","44%-56%","56%-69%","69%-81%","81%-94%", "94%-100%"]
    const windSpeed = [ "Below 0.3m/s (calm)", "0.3-3.4m/s (light)","3.4-8.0m/s (moderate)","8.0-10.8m/s (fresh)", 
                    "10.8-17.2m/s (strong)","17.2-24.5m/s (gale)","24.5-32.6m/s (storm)","Over 32.6m/s (hurricane)"]

    // the state of the map viewer
    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
      });

    // for the return data from the api
    const [data, setData] = useState({});

    // used to signal retrieval of data and to disable "Get Weather" Button when making a request
    const [signalGetInfo, setGetInfo] = useState(false);

    // request information from API
    useEffect(() => {
        if (signalGetInfo) {
            const parameters = {
                lon:viewState.longitude,
                lat:viewState.latitude,
                ac: 0,
                unit: "metric",
                output: "json",
                tzshift: 0
            };
            // TODO: meteo has more information that can be added snow depth, etc.
            // TODO: check out https://www.7timer.info/doc.php#meteo
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
            })
            .then(() => setGetInfo(false));
        }
    }, [signalGetInfo, viewState])

    return (
        <Container id="all-map">
            <NavBar variant="dark"/>
            <div id="map-wrapper">
                <div  id="side-bar">
                    <p> Longitude: {viewState.longitude.toFixed(2)} | Latitude: {viewState.latitude.toFixed(2)} | Zoom : {viewState.zoom.toFixed(1)} </p>
                    {data.weather? <p> Temperature: {data.weather.temp} | Cloud Cover: {cloudCover[data.weather.cloudCover]} | Wind Direction: {data.weather.windDirection} | Wind Speed: {windSpeed[data.weather.windSpeed]}</p> : <></>}
                    <Button onClick={() => {setGetInfo(true)}} disabled={signalGetInfo}>Get Weather</Button>
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