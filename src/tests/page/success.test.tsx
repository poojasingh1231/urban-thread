import { render, screen, fireEvent } from '@testing-library/react';
import SuccessPage from '../../pages/SuccessPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('SuccessPage Component', () => {
  const setup = () => render(
    <Provider store={store}>
      <Router>
        <SuccessPage />
      </Router>
    </Provider>
  );

  test('renders success message', () => {
    setup();
    const successMessage = screen.getByText('Purchase Successful!');
    expect(successMessage).toBeInTheDocument();
  });

  test('renders thank you message', () => {
    setup();
    const thankYouMessage = screen.getByText('Thank you for your purchase.');
    expect(thankYouMessage).toBeInTheDocument();
  });

  test('renders "Go to Home" button and navigates on click', () => {
    setup();
    const goHomeButton = screen.getByText('Go to Home');
    expect(goHomeButton).toBeInTheDocument();

    fireEvent.click(goHomeButton);
    expect(window.location.pathname).toBe('/');
  });
});
