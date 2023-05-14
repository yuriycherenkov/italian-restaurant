import DishItem from '@/components/DishItem';
import useMenu from '@/hooks/useMenu';
import Grid from '@mui/material/Grid';

export default function Menu() {
  const { data: menu } = useMenu();

  return (
    <Grid container spacing={2}>
      {menu?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <DishItem
            price={item.price}
            title={item.dish.title}
            shortDescription={item.dish.description}
            image={item.dish.image}
          />
        </Grid>
      ))}
    </Grid>
  );
}
