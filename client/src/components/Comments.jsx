import React from 'react'
import { styled } from 'styled-components'
import Comment from './Comment'

const Container = styled.div`
`

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Input = styled.input`
    border: none;
    outline: none;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    background-color: transparent;
    padding: 5px;
    width: 100%;
`

const Comments = () => {
  return (
    <Container>
        <NewComment>
            <Avatar src="https://yt3.ggpht.com/ytc/AGIKgqNbXSjabMNTuGUb9upVn4fma_RVIGHVT2UNEk8e=s68-c-k-c0x00ffffff-no-rj" />
            <Input placeholder='Add a comment...' />
        </NewComment>

        <Comment />
        <Comment />
        <Comment />
        <Comment />
    </Container>
  )
}

export default Comments