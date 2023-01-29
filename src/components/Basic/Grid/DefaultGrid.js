import styled from 'styled-components';

export const Grid = styled.div`
min-width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${props => props.backgroundColor};
`;