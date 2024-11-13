import React from 'react'
import { styled } from 'styled-components'
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux';

const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    height: 100vh;
    font-size: 14px;
    // to make the menu sticky
    position: sticky;
    top: 0;
`

const Wrapper = styled.div`
    padding: 1.125rem 1.625rem;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`

const Img = styled.img`
    height: 25px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0.46875rem 0.5rem;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background-color: ${({theme}) => theme.soft};
    }
`

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`

const Login = styled.div`
`

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    border: 1px solid #3ea6ff;
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
`

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500,
    color: #aaaaaa;
    margin-bottom: 20px;
`

const Menu = ({ darkMode, setDarkMode }) => {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <Container>
        <Wrapper>
            <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                <Logo>
                    <Img src={logo} />
                    YouTube
                </Logo>
            </Link>

            <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                <Item>
                    <HomeIcon />
                    Home
                </Item>
            </Link>

            <Link to="/trends" style={{textDecoration: "none", color: "inherit"}}>
                <Item>
                        <ExploreOutlinedIcon />
                        Explore
                </Item>
            </Link>

            <Link to="/subscriptions" style={{textDecoration: "none", color: "inherit"}}>
                <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                </Item>
            </Link>

            <Hr />

            <Item>
                <VideoLibraryOutlinedIcon />
                Library
            </Item>

            <Item>
                <HistoryOutlinedIcon />
                History
            </Item>

            <Hr />

            {!currentUser && <><Login>
                Sign in to like videos, comment and subscribe.
                <Link to="/signin" style={{textDecoration: "none"}}>
                    <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
                </Link>
            </Login>

            <Hr /></>}

            <Title>
                BEST OF YOUTUBE
            </Title>

            <Item>
                <LibraryMusicOutlinedIcon />
                Music
            </Item>

            <Item>
                <SportsBasketballOutlinedIcon />
                Sports
            </Item>

            <Item>
                <SportsEsportsOutlinedIcon />
                Gaming
            </Item>

            <Item>
                <MovieCreationOutlinedIcon />
                Movies
            </Item>

            <Item>
                <ArticleOutlinedIcon />
                News
            </Item>
            
            <Item>
                <LiveTvOutlinedIcon />
                Live
            </Item>

            <Hr />

            <Item>
                <SettingsOutlinedIcon />
                Settings
            </Item>

            <Item>
                <FlagOutlinedIcon />
                Report
            </Item>

            <Item>
                <HelpOutlineOutlinedIcon />
                Help
            </Item>

            <Item onClick={() => {setDarkMode(!darkMode)}}>
                <SettingsBrightnessOutlinedIcon />
                {darkMode ? "Light" : "Dark"} Mode
            </Item>
        </Wrapper>
    </Container>
  )
}

export default Menu