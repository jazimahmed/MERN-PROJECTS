import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const{id} = useParams();

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5555/BookStore/GetBook/'+ id)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishyear(response.data.publishYear);
        setLoading(false);
        
      })
      .catch((error) => {  
        setLoading(false);
        alert('An error occurred, please check the console');
        console.log(error);
      });
  },[]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.put('http://localhost:5555/BookStore/UpdateBook/' + id, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {  
        setLoading(false);
        alert('An error occurred, please check the console');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>  {/* Fixed h1 syntax */}
      {loading ? (<Spinner />) : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type="text" 
            value={publishYear} 
            onChange={(e) => setPublishyear(e.target.value)} 
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
      </div>
    </div>
  );
};

export default EditBook;
