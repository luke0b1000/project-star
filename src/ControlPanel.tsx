import React from 'react';
import MOON from './moon.svg';
import STAR from './star.svg';
import SUN from './sun.svg';

function ControlPanel() {
    return (
        <div className="control-panel">
            <h5>TV & movie film locations</h5>
            <h3>Legend</h3>
            <p>
                <img src={MOON} alt="MOON" /> Past
            </p>
            <p>
                <img src={STAR} alt="STAR" /> Present
            </p>
            <p>
                <img src={SUN} alt="SUN" /> Future
            </p>
        </div>
    );
}

export default ControlPanel;
