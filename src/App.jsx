import { useEffect, useState } from 'react'
import { useRoutes, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import PostFeed from './pages/PostFeed';
import CreatePost from './pages/CreatePost';
import DetailPage from './pages/DetailPage';
import EditPost from './pages/EditPost';
import Header from './pages/Header';
import Footer from './pages/Footer';
import { supabase } from '../src/client';

function App() {
  const [travelPost, setTravelPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
      .from('TravelDiary')
      .select()
      .order("created_at", { ascending: true })

      if(data){
        console.log(data);
      }

      setTravelPost(data);
    }

    fetchPost();
  }, [])

  const element = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path:'/feed',
      element: <PostFeed data={travelPost}/>
    },
    {
      path:'/post/:id',
      element: <DetailPage data={travelPost}/>
    },
    {
      path:'/create',
      element: <CreatePost />
    },
    {
      path:'/edit/:id',
      element: <EditPost data={travelPost}/>
    },
    {
      path:'*',
      element: <h1>Not Found</h1>
    }
  ])
  
  return (
    <>
    <Header />
    <div className="App-content">
    {element}
    </div>
    <Footer />
    </>
  )
}

export default App
