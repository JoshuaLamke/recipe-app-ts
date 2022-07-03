import React, { useState, useContext } from 'react';
import { Col, Container, Form, InputGroup } from 'react-bootstrap';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { loginValidationSuite, LoginFormFields } from '../../utils/formValidation';
import StyledSpinner from '../StyledSpinner';
import { ThemeContext } from '../../utils/ThemeProvider';
import StyledFormLabel from './StylesFormLabel';
import StyledButton from '../StyledButton';
import StyledFormControl from './StyledFormControl';
import { useNavigate } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: vestResolver(loginValidationSuite),
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mockAPICall = () => {
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  const onSubmit = (e: FieldValues) => {
    setLoading(true);
    mockAPICall();
  };

  return (
    <Container fluid className={'d-flex flex-grow-1 align-items-center justify-content-center'}>
      <Col xs={'10'} sm={'8'} md={'6'} lg={'4'}>
        <h1 style={{ color: themeContext?.theme.primary }} className={'text-center mb-3'}>
          Recipe App
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-5'>
            <StyledFormLabel color={themeContext?.theme.primary}>
              Email <span style={{ color: themeContext?.theme.secondary }}>*</span>
            </StyledFormLabel>
            <Controller
              name='email'
              control={control}
              render={({ field: { name, onChange, value, ref, onBlur } }) => {
                return (
                  <StyledFormControl
                    placeholder='Enter Email'
                    name={name}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    onBlur={onBlur}
                    color={themeContext?.theme.primary}
                    background={themeContext?.theme.bgDark1}
                  />
                );
              }}
            />
            <p style={{ color: themeContext?.theme.secondary }}>{errors.email?.message}</p>
          </Form.Group>
          <Form.Group className='mb-5 w-100'>
            <StyledFormLabel color={themeContext?.theme.primary}>
              Password <span style={{ color: themeContext?.theme.secondary }}>*</span>
            </StyledFormLabel>
            <InputGroup>
              <Controller
                name='password'
                control={control}
                render={({ field: { name, onChange, value, ref, onBlur } }) => {
                  return (
                    <StyledFormControl
                      placeholder='Enter Password'
                      name={name}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      onBlur={onBlur}
                      color={themeContext?.theme.primary}
                      background={themeContext?.theme.bgDark1}
                      type={hidden ? 'password' : 'text'}
                    />
                  );
                }}
              />
              <InputGroup.Text
                style={{
                  background: themeContext?.theme.bgDark1,
                  borderColor: themeContext?.theme.secondary,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setHidden(!hidden);
                }}
                data-testid='toggle-show-password'
              >
                {hidden ? (
                  <BsFillEyeSlashFill fill={themeContext?.theme.secondary} />
                ) : (
                  <BsFillEyeFill fill={themeContext?.theme.secondary} />
                )}
              </InputGroup.Text>
            </InputGroup>
            <p style={{ color: themeContext?.theme.secondary }}>{errors.password?.message}</p>
          </Form.Group>

          <div className='d-flex justify-content-center'>
            {!loading ? (
              <>
                <StyledButton
                  variant='outline-primary'
                  color={themeContext?.theme.primaryBtnColor}
                  background={themeContext?.theme.primaryBtnBackground}
                  type='submit'
                >
                  Log In
                </StyledButton>
                <StyledButton
                  className={'ms-2'}
                  variant='outline-primary'
                  color={themeContext?.theme.secondaryBtnColor}
                  background={themeContext?.theme.primaryBtnBackground}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </StyledButton>
              </>
            ) : (
              <StyledSpinner
                animation='border'
                color={themeContext?.theme.primary}
                data-testid='login-loading-spinner'
              />
            )}
          </div>
        </Form>
      </Col>
    </Container>
  );
};
export default LoginForm;
