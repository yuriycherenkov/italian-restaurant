import DishItem from '@/components/DishItem';
import useMenu from '@/hooks/useMenu';
import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Menu() {
  const { data: menu } = useMenu();

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      {menu?.map((category) => {
        if (!category.items.length) return null;

        return (
          <div key={category.id}>
            <Typography component="h2" variant="h4" mb={3}>
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <DishItem {...item} />
                </Grid>
              ))}
            </Grid>
          </div>
        );
      })}
    </Stack>
  );
}
