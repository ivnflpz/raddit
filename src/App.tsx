import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUp,
  faArrowDown,
  faAward,
  faBookmark,
  faCommentAlt,
  faSearch,
  faShare
} from '@fortawesome/free-solid-svg-icons';
 
import logo from './raddit.png';
import './App.css';
import RedditManager from './components/RedditManager/RedditManager';


library.add(
  faArrowUp,
  faArrowDown,
  faAward,
  faBookmark,
  faCommentAlt,
  faSearch,
  faShare
)
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RedditManager></RedditManager>
      </header>
    </div>
  );
}

export default App;
