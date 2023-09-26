import React, { useState, useEffect } from 'react';
import MyMap from './MyMap';
import TableShowLocation from './TableShowLocation';

function App() {
    const mapRef: any = React.useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [setLocation, setSetLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [viewState, setViewState] = useState<any>({
        latitude: 40.760226414415065,
        longitude: -73.98622589686376,
        zoom: 11,
    });
    useEffect(() => {
        async function runMe() {
            fetch('https://olv-geojson.lukeguan.com/latlong_geojson.json')
                .then((resp) => {
                    return resp.json();
                })
                .then((json) => {
                    setSetLocation(json);
                    setIsLoading(false);
                });
        }
        runMe();
    }, []);

    const defaultZoom = 10;
    const gotoLocation = ({
        latitude,
        longitude,
        zoom,
    }: {
        latitude: number;
        longitude: number;
        zoom?: number;
    }) => {
        setViewState({
            ...viewState,
            latitude,
            longitude,
            zoom: zoom || defaultZoom,
        });
    };

    if (isLoading) return <>Loading...</>;
    return (
        <>
            <h1>Project Star</h1>
            <MyMap
                setLocation={setLocation}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                viewState={viewState}
                setViewState={setViewState}
                gotoLocation={gotoLocation}
                mapRef={mapRef}
            />
            <TableShowLocation
                setLocation={setLocation}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                viewState={viewState}
                setViewState={setViewState}
                gotoLocation={gotoLocation}
                mapRef={mapRef}
            />
        </>
    );
}

export default App;
