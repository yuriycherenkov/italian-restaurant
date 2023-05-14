import DishItem from '@/components/DishItem';
import useMenu from '@/hooks/useMenu';
import Grid from '@mui/material/Grid';

export default function Menu() {
  const { data: menu } = useMenu();

  return (
    <Grid container spacing={2}>
      {menu?.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <DishItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
}
