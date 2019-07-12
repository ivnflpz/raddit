import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUp,
  faArrowDown,
  faAward,
  faBolt,
  faBookmark,
  faChartLine,
  faCertificate,
  faCommentAlt,
  faFire,
  faPoll,
  faSearch,
  faShare
} from '@fortawesome/free-solid-svg-icons';

import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
 
import './App.css';
import RedditManager from './components/RedditManager/RedditManager';

library.add(
  faArrowUp,
  faArrowDown,
  faAward,
  faBolt,
  faBookmark,
  farBookmark,
  faChartLine,
  faCertificate,
  faCommentAlt,
  faFire,
  faPoll,
  faSearch,
  faShare
)
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <RedditManager></RedditManager>
      </header>
    </div>
  );
}

export default App;
