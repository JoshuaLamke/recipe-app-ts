import styled from 'styled-components';
import { Form } from 'react-bootstrap';

interface FormLabelProps {
  color?: string;
}

const StyledFormLabel = styled(Form.Label)<FormLabelProps>`
  color: ${(props) => props.color};
`;

export default StyledFormLabel;
