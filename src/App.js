import React from 'react';

import Header from './components/Headers';
import Mainpages from './components/Mainpages';
import { DataProvider } from "./context/GlobalState";



const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Header />
        <Mainpages />
      </div>
    </DataProvider>
  );
}

export default App;
