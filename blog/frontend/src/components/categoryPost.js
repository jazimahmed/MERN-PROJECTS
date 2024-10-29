
import {useState,useEffect} from 'react';
import axios from 'axios';
import Post from '../components/post';
import { useParams } from 'react-router-dom';


export default function CategoryPost(){

    const [posts, setPosts] = useState([]);
	const [Category, setCategory] = useState([]);
    const {id} = useParams();

    async function fetchPosts(){
        const response = await axios.get('http://localhost:5000/api/posts/category/'+id);
        setPosts(response.data);
        
    }
	async function fetchCategory(){
        const response = await axios.get('http://localhost:5000/api/categories/'+id);
        setCategory(response.data);
        
    }


    useEffect(()=>{
       fetchPosts();
	   fetchCategory();
    },[])

    if(!Category)return <p>Loading...</p>
    return <>
        
    
        <main>
        <div class="container mt-4">
            <div class="row">
                
                <div class="col-lg-8">
                    <h1 class="mb-4">{Category.name}</h1>

                   
                    {
                        
                        posts.length > 0 ? posts.map((post) => (<Post key={post._id} post={post} /> )) : <h3>no post available</h3>
                        
                    }

                 
                    

                </div>

               
            </div>
        </div>
    </main>
    

	
    </>
}