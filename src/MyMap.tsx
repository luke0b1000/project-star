import React, { useState } from 'react';
import Map, {
    Marker,
    Popup,
    GeolocateControl,
    FullscreenControl,
    NavigationControl,
    ScaleControl,
} from 'react-map-gl';
import DisplayMarker from './DisplayMarker';
import mapboxgl from 'mapbox-gl';
import ControlPanel from './ControlPanel';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const token =
    'pk.eyJ1IjoibHVrZTBiMTAwMCIsImEiOiJja3phZ2xjdGQyNDl1Mm9tejNzdXBuemNpIn0.LGj4QEw4IxwsEErnbE8LmA';

function MyMap({
    setLocation,
    selectedLocation,
    setSelectedLocation,
    viewState,
    setViewState,
    gotoLocation,
    mapRef,
}: {
    setLocation: any;
    selectedLocation: any;
    setSelectedLocation: any;
    viewState: any;
    setViewState: any;
    gotoLocation: any;
    mapRef: any;
}) {
    return (
        <>
            <div className="mapHolder" style={{ height: '50vh' }}>
                <div id="mapRef" ref={mapRef} />
                <Map
                    reuseMaps
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    mapboxAccessToken={token}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                    <GeolocateControl
                        position="top-left"
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showUserHeading={true}
                    />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl position="top-left" />

                    <DisplayMarker
                        setLocation={setLocation}
                        setSelectedLocation={setSelectedLocation}
                    />
                    {selectedLocation && (
                        <Popup
                            style={{ zIndex: 20 }}
                            anchor="bottom"
                            latitude={selectedLocation.geometry.coordinates[1]}
                            longitude={selectedLocation.geometry.coordinates[0]}
                            closeButton={true}
                            closeOnMove={false}
                            closeOnClick={false}
                            onClose={() => setSelectedLocation(null)}
                        >
                            <SetInfo selectedLocation={selectedLocation} />
                        </Popup>
                    )}
                </Map>
                <ControlPanel />
            </div>
            <button
                onClick={() =>
                    gotoLocation({
                        latitude: 40.760226414415065,
                        longitude: -73.98656921960257,
                        zoom: 11,
                    })
                }
            >
                NYC
            </button>
            <button
                onClick={() => {
                    gotoLocation({
                        latitude: 34.05401376766889,
                        longitude: -118.24270087275806,
                        zoom: 11,
                    });
                }}
            >
                Los Angeles
            </button>
            <button
                onClick={() => {
                    gotoLocation({
                        latitude: 49.2712636264999,
                        longitude: -123.10629448875463,
                        zoom: 11,
                    });
                }}
            >
                Vancouver
            </button>
            <button
                onClick={() => {
                    gotoLocation({
                        latitude: 41.882836124543616,
                        longitude: -87.62368893467911,
                        zoom: 11,
                    });
                }}
            >
                Chicago
            </button>
        </>
    );
}

export default MyMap;

function SetInfo({ selectedLocation }: { selectedLocation: any }) {
    return (
        <div>
            <h2>{selectedLocation.properties.project}</h2>
            <div>
                <a
                    target="_blank"
                    href={selectedLocation.properties.website}
                    rel="noreferrer"
                >
                    imdb
                </a>
            </div>
            {selectedLocation.properties.credit}
            <div />
            {selectedLocation.properties.pk}
        </div>
    );
}
