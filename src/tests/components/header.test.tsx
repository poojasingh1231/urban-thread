import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
  const setup = (showCartIcon = true) => render(
    <Provider store={store}>
      <Router>
        <Header showCartIcon={showCartIcon} />
      </Router>
    </Provider>
  );

  test('renders company name', () => {
    setup();
    const companyName = screen.getByText('My Store');
    expect(companyName).toBeInTheDocument();
  });

  test('renders cart icon when showCartIcon is true', () => {
    setup(true);
    const cartIcon = screen.getByTestId('ShoppingCartIcon');
    expect(cartIcon).toBeInTheDocument();
});

test('does not render cart icon when showCartIcon is false', () => {
    setup(false);
    const cartIcon = screen.queryByTestId('ShoppingCartIcon');
    expect(cartIcon).not.toBeInTheDocument();
  });

  test('renders username if present', () => {
    // Mock the state to include a username
    const mockStore = {
      ...store.getState(),
      auth: { ...store.getState().auth, username: 'TestUser' },
    };
    const mockStoreWithUsername = {
      ...store,
      getState: () => mockStore,
    };

    render(
      <Provider store={mockStoreWithUsername}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const username = screen.getByText('TestUser');
    expect(username).toBeInTheDocument();
  });

  test('navigates to the home page when company name is clicked', () => {
    setup();
    const companyName = screen.getByText('My Store');
    fireEvent.click(companyName);
    expect(window.location.pathname).toBe('/');
  });
});
