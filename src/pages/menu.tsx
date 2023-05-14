import DishItem from '@/components/DishItem';
import useDishes from '@/hooks/useDishes/useDishes';
import Grid from '@mui/material/Grid';

export default function Menu() {
  const { data: dishes } = useDishes();

  return (
    <Grid container spacing={2} alignItems="center">
      {dishes?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <DishItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
