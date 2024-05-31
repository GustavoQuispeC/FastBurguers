import styled from 'styled-components';


export const FooterContainer = styled.footer`
 background-color: #333;
  color: #fff;
  padding: 1rem 0rem;
  margin-top: 1rem;
position: relative;
  width: 100%;
  box-shadow: 0px 0px 10px 10px rgba(0,0,0, 0.8);
`;

export const FooterContent = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const FooterText = styled.p`

margin: 1rem;
`;

export const FooterLink = styled.a`
color: #fff;
text-decoration: none;
&:hover {
  text-decoration: underline;
}
`;


