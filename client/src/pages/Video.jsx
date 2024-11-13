import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownOffAltOutlined, ThumbUp, ThumbUpAltOutlined, ThumbUpOffAltOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Comments from '../components/Comments'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { fetchFailure, fetchStart, fetchSuccess } from '../redux/videoSlice'
import { format } from 'timeago.js'

const Container = styled.div`
    display: flex;
    gap: 24px;
`

const Content = styled.div`
    flex: 5;
`

const Recommendations = styled.div`
    flex: 2;
`

const VideoWrapper = styled.div`
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme}) => theme.text}
`

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Info = styled.span`
    color: ${({theme}) => theme.textSoft}
`

const Buttons = styled.div`
    display: flex;
    gap: 20px;
`

const Button = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({theme}) => theme.text}
`

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
` 

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.text};
`

const ChannelName = styled.span`
    font-weight: 500;
`

const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
`

const Description = styled.p`
    font-size: 14px;
`

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft}
`

const Video = () => {
  const {currentUser} = useSelector((state) => state.user);
  const {currentVideo} = useSelector((state) => state.video);
  const dispatch = useDispatch();
    
  const path = useLocation().pathname.split('/')[2];
  console.log(path);

  const [channel, setChannel] = useState({});

  const fetchData = async () => {
    try {
        dispatch(fetchStart());
        const videoResponse = await axios.get(`http://localhost:5000/api/videos/find/${path}`);
        const channelResponse = await axios.get(`http://localhost:5000/api/users/${videoResponse.data.userId}`);

        setChannel(channelResponse.data);
        dispatch(fetchSuccess(videoResponse.data))
    } catch(err) {
        dispatch(fetchFailure())
    }
  }

  // added dispatch in the dependency array as well. But why?
  useEffect(() => {
    fetchData()
  }, [path, dispatch])

  const handleLike = async () => {
    await axios.put(`http://localhost:5000/api/users/like/${currentVideo?._id}`)
  }

  const handleDislike = async () => {
    await axios.put(`http://localhost:5000/api/users/dislike/${currentVideo?._id}`)
  }

  return (
    <Container>
        <Content>
            <VideoWrapper>
                <iframe
                    width="100%"
                    height="720"
                    src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </VideoWrapper>
            <Title>{currentVideo?.title}</Title>
            <Details>
                <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
                <Buttons>
                    <Button onClick={handleLike}>
                        {currentVideo?.likes?.includes(currentUser._id) ? <ThumbUp /> : <ThumbUpAltOutlined />}
                        {currentVideo?.likes?.length}
                    </Button>
                    <Button onClick={handleDislike}>
                        {currentVideo?.dislikes?.includes(currentUser._id) ? <ThumbDown /> : <ThumbDownOffAltOutlined />}
                        Dislike
                    </Button>
                    <Button><ReplyOutlined /> Share</Button>
                    <Button><AddTaskOutlined /> Save</Button>
                </Buttons>
            </Details>

            <Hr />

            <Channel>
                <ChannelInfo>
                    <Image src={channel.img} />
                    <ChannelDetail>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                        {/* <Description>{currentVideo.description}</Description> */}
                    </ChannelDetail>
                </ChannelInfo>
                <Subscribe>SUBSCRIBE</Subscribe>
            </Channel>

            <Hr />

            <Comments />
        </Content>

        {/* <Recommendations>
             <Card type="sm" />
            <Card type="sm" />
            <Card type="sm" />
            <Card type="sm" />
            <Card type="sm" /> 
        </Recommendations> */}
    </Container>
  )
}

export default Video