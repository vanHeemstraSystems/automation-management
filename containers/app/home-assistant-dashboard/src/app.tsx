import React from 'react';
import { createRoot } from 'react-dom/client';

import { Authenticate } from '@authenticate';
import { AreaOne } from '@areas';

const App = () => {
    return <>
        <Authenticate>
          <AreaOne />
        </Authenticate>
    </>;
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);
