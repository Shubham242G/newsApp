import Nvbar from './Components/Nvbar';
import './App.css';
import News from './Components/News';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  const [progress,setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API //environment variable
  return (
    <BrowserRouter>
      <div className="App">
          <Nvbar/>
          <LoadingBar
          color='#f11946'
          progress={progress}
        />
          <Routes>
            <Route path='/' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="general" country="in" category="general"/>}/>
            <Route path='/entertainment' element={<News apiKey={apiKey}  setProgress = {setProgress} progress={progress} pageSize={7} key="entertainment" country="in" category="entertainment"/>}/>
            <Route path='/sports' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="sports" country="in" category="sports"/>}/>
            <Route path='/business' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="buisness" country="in" category="business"/>}/>
            <Route path='/health' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="health" country="in" category="health"/>}/>
            <Route path='/science' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="science" country="in" category="science"/>}/>
            <Route path='/technology' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} pageSize={7} key="technology" country="in" category="technology"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
