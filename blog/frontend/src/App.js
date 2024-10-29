import './App.css';
//import router from '../backend/routes/posts';
import PostDetails from './components/PostDetails';
import PostList from './pages/PostList';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryPost from './components/categoryPost';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Header/>
          <Routes>
            <Route path='/' element={<PostList/>} />
            <Route path='/posts/:id' element={<PostDetails/>} />
            <Route path='/posts/category/:id' element={<CategoryPost/>} />
          </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
