import React from 'react'
import PostFeed from './PostFeed'

const Home = () => {
  return (
    <div> 
      <img src='https://i.ytimg.com/vi/GrALoOPk0lw/sddefault.jpg'  style={{width:'100%', height:'100vh', marginBottom:'10vh'}}/>
      <PostFeed />
    </div>
  )
}

export default Home