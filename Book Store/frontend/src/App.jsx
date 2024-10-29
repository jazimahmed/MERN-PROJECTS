import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/BookStore/CreateBook' element ={<CreateBook/>}/>
      <Route path='/BookStore/GetBook/:id' element ={<ShowBook/>}/>
      <Route path='/BookStore/UpdateBook/:id' element ={<EditBook/>}/>
      <Route path='/BookStore/DeleteBook/:id' element ={<DeleteBook/>}/>
    </Routes>
  )
}

export default App
