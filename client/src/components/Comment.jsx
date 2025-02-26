import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme}) => theme.text};
`

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.soft};
    margin-left: 5px;
`

const Text = styled.span`
    font-size: 14px;
`

const Comment = () => {
  return (
    <Container>
        <Avatar src="https://yt3.ggpht.com/ytc/AGIKgqNbXSjabMNTuGUb9upVn4fma_RVIGHVT2UNEk8e=s68-c-k-c0x00ffffff-no-rj" />
        <Details>
            <Name>
                John Doe <Date>1 day ago</Date>
            </Name>

            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nesciunt? Dolore, quasi quod perspiciatis necessitatibus omnis dignissimos, voluptatibus consectetur voluptates esse officia nam quia maiores, eos hic iusto possimus cum.</Text>
        </Details>
    </Container>
  )
}

export default Comment