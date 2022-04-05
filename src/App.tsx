import React from 'react';
import Header from './components/Header';
import { UseForm } from './components/useForm';


function App() {
  return (
    <div style={{textAlign: "center" }}>
      <UseForm onSubmit={({ username, password }) => {
          console.log(username, password);
        }}
        />
    </div>
  );
}

export default App;
