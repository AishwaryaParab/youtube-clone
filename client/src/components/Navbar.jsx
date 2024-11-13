import React from 'react'
import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
    background-color: ${({theme}) => theme.bgLighter};
    height: 56px;
    position: sticky;
    top: 0;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1.25rem;
    justify-content: flex-end;
    position: relative;
`

const Search = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 40%;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`

const Input = styled.input`
    border: none;
    outline: none;
    flex: 5;
    background-color: transparent;
    color: ${({theme}) => theme.text};
`

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    border: 1px solid #3ea6ff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
`

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    background-color: #999;
    border-radius: 50%;
`

const Navbar = () => {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder="Search" />
                <SearchOutlined style={{flex: "1"}} />
            </Search>

            {currentUser ? <User>
                <VideoCallOutlined />
                <Avatar src={currentUser.img} />
                {currentUser.name}
            </User> :
            <Link to="/signin" style={{textDecoration: "none"}}>
                <Button><AccountCircleOutlinedIcon /> SIGN IN</Button>
            </Link>}
        </Wrapper>
    </Container>
  )
}

export default Navbar