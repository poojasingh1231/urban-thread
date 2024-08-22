import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface HeaderProps {
  showCartIcon?: boolean; // This prop controls the visibility of the cart icon
}

const Header: React.FC<HeaderProps> = ({ showCartIcon = true }) => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const username = useSelector((state: RootState) => state.auth.username);
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" sx={{ width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          My Store
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showCartIcon && (  // Check if the cart icon should be shown
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <AccountCircle />
            {username && (
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {username}
              </Typography>
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
