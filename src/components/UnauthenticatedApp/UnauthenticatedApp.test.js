import React from 'react';
import { renderWithRouter } from 'testUtils';
import '@testing-library/jest-dom/extend-expect';

import UnauthenticatedApp from './UnauthenticatedApp';

describe('Unauthenticated App', () => {
  it('renders the Sign in Page', () => {
    const { getByTestId } = renderWithRouter(<UnauthenticatedApp />, {
      history: ['/sign-in'],
    });
    expect(getByTestId('signin-form')).toBeInTheDocument();
  });

  it('renders the Sign up Page', () => {
    const { getByTestId } = renderWithRouter(<UnauthenticatedApp />, {
      history: ['/sign-up'],
    });
    expect(getByTestId('signup-form')).toBeInTheDocument();
  });

  it('renders the Forgot Password Page', () => {
    const { getByTestId } = renderWithRouter(<UnauthenticatedApp />, {
      history: ['/forgot-password'],
    });
    expect(getByTestId('forgot-password-email-form')).toBeInTheDocument();
  });

  it('redirects to the Sign in Page when an unknown route is used', () => {
    const { getByTestId } = renderWithRouter(<UnauthenticatedApp />, {
      history: ['/no-match'],
    });
    expect(getByTestId('signin-form')).toBeInTheDocument();
  });
});
