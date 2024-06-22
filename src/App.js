import Nvbar from './Components/Nvbar';
import './App.css';
import News from './Components/News';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import Error from './Components/Error';

function App() {
  const [progress,setProgress] = useState(0)
  
  const apiKey = process.env.REACT_APP_NEWS_API //environment variable

  return (
    <BrowserRouter>
      <div className="App">
          <Nvbar />
          <LoadingBar
          color='#f11946'
          progress={progress} 
        />
          <Routes>
            <Route path='/' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'general'}  key="general" lang={'en'} />}/>
            <Route path='/world' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'world'}  key="world" lang={'en'} />}/>
            <Route path='/nation' element={<News apiKey={apiKey}  setProgress = {setProgress} progress={progress} category={'nation'} key="nation" lang={'en'} />} />
            <Route path='/business' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'business'} key="business" lang={'en'}/>} />
            <Route path='/technology' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'technology'} key="technology" lang={'en'}/>}/>
            <Route path='/entertainment' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'entertainment'}  key="entertainment" lang={'en'}/>} />
            <Route path='/sports' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'sports'} key="sports" lang={'en'} />} />
            <Route path='/science' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'science'} key="science" lang={'en'}/>}/>
            <Route path='/health' element={<News apiKey={apiKey} setProgress = {setProgress} progress={progress} category={'health'} key="health" lang={'en'}/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
