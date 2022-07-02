import styled from 'styled-components';
import { Button } from 'react-bootstrap';

interface ButtonProps {
  color?: string;
  background?: string;
}

const StyledButton = styled(Button)<ButtonProps>`
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border-color: ${(props) => props.color};
  &:hover {
    background: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;

export default StyledButton;
