import styled from 'styled-components';
import { Form } from 'react-bootstrap';

interface FormControlProps {
  color?: string;
  background?: string;
}

const StyledFormControl = styled(Form.Control)<FormControlProps>`
  border-color: ${(props) => props.color};
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  &:focus {
    border-color: ${(props) => props.color};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    background: ${(props) => props.background};
    color: ${(props) => props.color};
  }
  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${(props) => props.color};
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: ${(props) => props.color};
    opacity: 1;
  }
`;

export default StyledFormControl;
