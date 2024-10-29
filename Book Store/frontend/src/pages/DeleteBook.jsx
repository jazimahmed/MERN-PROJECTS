import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  const handleDeleteBook = ()=>{
    setLoading(true);
    axios.delete('http://localhost:5555/BookStore/DeleteBook/'+ id )
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch(()=>{
      setLoading(false);
      alert('an error occured pleasecheck the console');
      console.log(error);
    })
  }


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>delete book</h1>
      {loading?(<Spinner/>):(
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h1 className='text-2xl'>are u sure u want to delete this book?</h1>

          <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}> yes, delete it</button>
        </div>
      )}
      
    </div>
  )
}

export default DeleteBook
