
import { Source, Layer } from 'react-map-gl';
import {useEffect, useState, useRef} from 'react';

export default function DisplaySource(props) {
    const colour = props.layerColour;
    const dataURL = props.dataURL;
    const cluster = props.cluster;
    const dataName = props.dataName;
    const setInteractiveLayerIdsList = props.setInteractiveLayerIdsList;
    let enabledDisplay = props.enabledDisplay;

    // states for display data option 
    const [displayData, setDisplayData] = useState(null);

    let displayDataInitialized = useRef(false);

    useEffect(() => {
        if (enabledDisplay && displayData !== null) {
            setInteractiveLayerIdsList((interactiveLayerIdsList) => [...interactiveLayerIdsList, dataName]);
        } else {
            setInteractiveLayerIdsList((interactiveLayerIdsList) => interactiveLayerIdsList.filter((layer) => layer !== dataName));
        }
    },[displayData, enabledDisplay]);


    // get display data if not already obtained
    useEffect(() => {
        if (enabledDisplay && !displayDataInitialized.current ) {
            try {
                displayDataInitialized.current = true;
                fetch(dataURL ,{
                        method: 'GET'
                    })
                .then((res) => res.json())
                .then((data) => {
                    if (data[dataName] === undefined) throw new Error(`API not returning data ${dataName} as a field`);
                    if (data["reply"] !== "data found") throw new Error(`API did not find data for ${dataName}`);
                    setDisplayData({
                        "type" : "FeatureCollection",
                        "features": data[dataName]
                    })
                })
            } catch (error) {
                displayDataInitialized.current = false;
                setDisplayData(null);
                console.log(error);
            }  
        }
    }, [enabledDisplay, dataURL, dataName]);

    const layerStyle = props.layerStyle;

    const clusterCountLayer = {
        id: 'cluster-count',
        type: 'symbol',
        source: dataName,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      };

    const clusterStyle = {
        id: 'cluster',
        type: 'circle',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
    }



    return (
        <>
        {enabledDisplay && displayData !== null &&
        <Source 
            id={dataName} 
            type="geojson" 
            data={displayData}
            cluster={cluster}
        >
            <Layer {...clusterStyle}/>
            <Layer {...clusterCountLayer} />
            <Layer {...layerStyle} />
        </Source>
        }
        </>
    );

}