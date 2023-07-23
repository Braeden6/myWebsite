/*
 
  Braeden's Personal Website
  Author: Braeden Norman
  Date: 2022-11-12

  Helpful Information


 */

import * as React from 'react';
import {useState, useEffect} from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import './countrySearch.css';
//import { variables } from '../../configFiles/variables';


export default function CountrySearch(props) {
    const setViewState = props.setViewState;

    const [locations, setLocations] = useState(null);
    const [locationSearch, setLocationSearch] = useState("");

    useEffect( () => {
        console.log("Fetching Countries");
        fetch(process.env.NEXT_PUBLIC_API_URL + "/countries",{
            method: 'GET'
        })
        .then((res) => { 
            if (res.status == 200) {
                return res.json()
            }
            return [];
        })
        .then((data) => setLocations(data))
    }, []);



    const changeView = (country) => {
        console.log(country);

        

        fetch(process.env.NEXT_PUBLIC_API_URL + `/country/${country}`,{
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => console.log(data))


        // setViewState((prevState) => {
        //     return ({...prevState, 
        //         longitude: Number(coordinates[0]),
        //         latitude: Number(coordinates[1]),
        //         zoom: 3.5})
        // }
        // )

    }


    return (
        <Dropdown id="country-search">  
            <Dropdown.Toggle>
                <Form.Control type="search" placeholder="Search for Country" onChange={(e)=>{setLocationSearch(e.target.value)}}></Form.Control>
            </Dropdown.Toggle>
            { locations &&
            <Dropdown.Menu>
                {locations.map((e) => {
                    if (e.toLowerCase().includes(locationSearch.toLowerCase())) {
                        return (
                            <Dropdown.Item key={e} onClick={() => {changeView(e)}}>{e}</Dropdown.Item>
                        )
                    }
                    return null;
                })}
            </Dropdown.Menu>}
        </Dropdown>
    );
}