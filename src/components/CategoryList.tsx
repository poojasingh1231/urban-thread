import React from 'react';
import { Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item key={category}>
          <Chip
            label={category}
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer' }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
