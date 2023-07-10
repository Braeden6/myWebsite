//import { variables } from '../../configFiles/variables';

export const listOfSources = [

    // Earthquakes
    {              
        defaultDisplay : false,
        enableClustering: true, 
        layerColour : "blue",
        dataURL : process.env.NEXT_PUBLIC_API_URL+ "/earthquakes",
        dataName : "earthquakes",
        layerStyle :{
            id: "earthquakes",
            type: 'circle',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-radius': 10,
              'circle-color': "blue"
            }
        }
    },
    // Country Borders
    {  
        // https://docs.mapbox.com/mapbox-gl-js/example/multiple-geometries/
        defaultDisplay : false,
        enableClustering: false,            
        layerColour : "blue",
        dataURL : process.env.NEXT_PUBLIC_API_URL + "/map/getCountryBorder",
        dataName : "borders",
        layerStyle : {
            'id': 'borders',
            'type': 'fill',
            'source': 'national-park',
            'paint': {
            'fill-color': 'blue',
            'fill-opacity': 0.0
            },
            'filter': ['==', '$type', 'Polygon']
        }
    }
]