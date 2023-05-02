import React from 'react';
import { useEntity, useHass } from '@hooks';

export function AreaOne() {
    const { entities, callLight, callSwitch } = useHass();
    // WE ARE HERE: Video Part 2 at 23:14, see https://youtu.be/mpAOknmd2rI?t=1394
    const downlights = useEntity('switch.office_downlights');
    console.log('downlights', downlights);
    console.log('entities', entities);
    return <div>Hello from AreaOne:<br/><button onClick={() => {
        callLight('light.all_office_downlights', 'turn_on', {
            color_temp: 395
        })
        callSwitch('switch.office_downlights');
    }}>TOGGLE DOWNLIGHTS</button> Downlight state: {downlights.state}</div>
}
