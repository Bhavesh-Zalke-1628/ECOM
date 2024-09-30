import React from 'react'
import Products from './Component/Products';
import { Route, Routes } from 'react-router';

function App() {

  return (

    <Routes>
      <Route path='/' element={<Products />}></Route>
    </Routes>
  )
}

export default App
