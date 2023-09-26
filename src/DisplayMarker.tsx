import React from 'react';
import { Marker } from 'react-map-gl';
import dayjs from 'dayjs';
import MOON from './moon.svg';
import STAR from './star.svg';
import SUN from './sun.svg';

const today = dayjs(new Date());

function DisplayMarker({
    setLocation,
    setSelectedLocation,
}: {
    setLocation: any;
    setSelectedLocation: any;
}) {
    return (
        <>
            {setLocation.features.map((eachSet: any, index: number) => (
                <DisplaySky
                    key={index}
                    eachSet={eachSet}
                    setSelectedLocation={setSelectedLocation}
                />
            ))}
        </>
    );
}
export default DisplayMarker;

function DisplaySky({
    eachSet,
    setSelectedLocation,
}: {
    eachSet: any;
    setSelectedLocation: any;
}) {
    if (dayjs(eachSet.properties.pk).isSame(today, 'day')) {
        return (
            <DisplaySTAR
                eachSet={eachSet}
                setSelectedLocation={setSelectedLocation}
            />
        );
    }
    if (dayjs(eachSet.properties.pk).isBefore(today)) {
        return (
            <DisplayMOON
                eachSet={eachSet}
                setSelectedLocation={setSelectedLocation}
            />
        );
    }
    // if (dayjs(eachSet.properties.pk).isAfter(today)) {
    return (
        <DisplaySUN
            eachSet={eachSet}
            setSelectedLocation={setSelectedLocation}
        />
    );
    // }
}

function DisplaySTAR({
    eachSet,
    setSelectedLocation,
}: {
    eachSet: any;
    setSelectedLocation: any;
}) {
    return (
        <Marker
            anchor="top"
            style={{ zIndex: 10 }}
            key={eachSet.properties.sk}
            latitude={eachSet.geometry.coordinates[1]}
            longitude={eachSet.geometry.coordinates[0]}
        >
            <img
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedLocation(eachSet);
                }}
                src={STAR}
                alt="STAR"
            />
        </Marker>
    );
}

function DisplaySUN({
    eachSet,
    setSelectedLocation,
}: {
    eachSet: any;
    setSelectedLocation: any;
}) {
    return (
        <Marker
            anchor="top"
            style={{ zIndex: 5 }}
            key={eachSet.properties.sk}
            latitude={eachSet.geometry.coordinates[1]}
            longitude={eachSet.geometry.coordinates[0]}
        >
            <img
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedLocation(eachSet);
                }}
                src={SUN}
                alt="SUN"
            />
        </Marker>
    );
}

function DisplayMOON({
    eachSet,
    setSelectedLocation,
}: {
    eachSet: any;
    setSelectedLocation: any;
}) {
    return (
        <Marker
            anchor="top"
            style={{ zIndex: 1 }}
            key={eachSet.properties.sk}
            latitude={eachSet.geometry.coordinates[1]}
            longitude={eachSet.geometry.coordinates[0]}
        >
            <img
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedLocation(eachSet);
                }}
                src={MOON}
                alt="MOON"
            />
        </Marker>
    );
}
