import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/styles/globals.scss';
import {MessangerApp} from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <MessangerApp />,
);

