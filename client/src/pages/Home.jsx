import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Card from '../components/Card';
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${type}`);
      setVideos(res.data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [type])

  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video} />
      })}
       {console.log(videos)}
    </Container>
  )
}

export default Home