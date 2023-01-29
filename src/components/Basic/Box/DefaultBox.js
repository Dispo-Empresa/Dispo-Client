import styled from 'styled-components';

//mudar nome da box abaixo

export const DefaultBox = styled.div`
background-color: #FFFFFF;
border-radius: 10px;
width: ${props => props.width};
height: ${props => props.height};
align-items: center;
justify-content: center;
border: solid 1px;
border: #2A2C35 0px solid;
box-shadow: 0 0 5px #2A2C35;
display: ${props => props.display};
margin-left: ${props => props.marginLeft ?? "5%"};
margin-top: ${props => props.marginTop ?? "5%"};
transition: 0.3s;
`;

export const ContentBox = styled.div`
background-color: #FFFFFF;
width: ${props => props.width};
height: ${props => props.height};
align-items: center;
justify-content: center;
border: 1px solid #e7ecf1!important;
display: ${props => props.display};
margin-left: ${props => props.marginLeft ?? "5%"};
margin-top: ${props => props.marginTop ?? "1%"};
transition: 0.3s;
`;