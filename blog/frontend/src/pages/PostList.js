
import {useState,useEffect} from 'react';
import axios from 'axios';
import Post from '../components/post';
import { Link } from 'react-router-dom';


export default function PostList(){

    const [posts, setPosts] = useState([]);
	const [Categories, setCategories] = useState([]);

    async function fetchPosts(){
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        
    }
	async function fetchCategories(){
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        
    }


    useEffect(()=>{
       fetchPosts();
	   fetchCategories();
    },[])
    return <>
        
    
	<main>
		<div class="container mt-4">
        
			<div class="row">
				
				<div class="col-lg-8">
					<h1 class="mb-4">Latest Posts</h1>
                    
                    {
                        
                        posts.length > 0 ? posts.map((post) => (<Post key={post._id} post={post} /> )) : <h3>no post available</h3>
                        
                    }
					

				</div>
				
				<div class="col-lg-4">
					<div class="card mb-4">
						<div class="card-body">
							<h5 class="card-title">About Me</h5>
							<p class="card-text">Im jazim ahmed and this is my MERN stack blog web application</p>
						</div>
					</div>

					<div class="card mb-4">
						<div class="card-body">
							<h5 class="card-title">Categories</h5>
							<ul class="list-group">
								{Categories.map((category)=>{
									return <li class="list-group-item"><Link to={"/posts/category/"+category._id} class="text-black">{category.name}</Link></li>
								})
									
									
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
        </div>    
	</main>
    

	
    </>
}