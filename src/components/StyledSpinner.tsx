import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

interface SpinnerProps {
  color?: string;
}

const StyledSpinner = styled(Spinner)<SpinnerProps>`
  color: ${(props) => props.color};
`;

export default StyledSpinner;
