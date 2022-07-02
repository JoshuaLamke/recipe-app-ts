import { create, test, enforce } from 'vest';

export type LoginFormFields = {
  email: string;
  password: string;
};

export type SignupFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const loginValidationSuite = create((data = {}) => {
  test('email', 'Email is required', () => {
    enforce(data.email).isNotEmpty();
  });

  test('email', 'Valid email is required', () => {
    enforce(data.email).matches(/\S+@\S+\.\S+/);
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });
});

export const signupValidationSuite = create((data = {}) => {
  test('email', 'Email is required', () => {
    enforce(data.email).isNotEmpty();
  });

  test('email', 'Valid email is required', () => {
    enforce(data.email).matches(/\S+@\S+\.\S+/);
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotEmpty();
  });

  test('password', 'Password must be at least 8 characters', () => {
    enforce(data.password.length).greaterThanOrEquals(8);
  });

  test('confirmPassword', 'Please re-enter password', () => {
    enforce(data.confirmPassword).isNotEmpty();
  });

  test('confirmPassword', 'Passwords must match', () => {
    enforce(data.password).equals(data.confirmPassword);
  });
});
