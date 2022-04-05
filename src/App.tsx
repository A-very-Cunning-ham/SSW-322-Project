import {Routes, BrowserRouter, Route} from 'react-router-dom';
import {Register} from './components/register';
import {Login} from './components/login';
import {Profile} from './components/profile';

function App() {
  <BrowserRouter>
    <Routes>
      <Route element={Register} exact path="/register"/>
      <Route element={Login} exact path="/login"/>
      <Route element={Profile} exact path="/profile"/>
    </Routes>
  </BrowserRouter>
}



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
