import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Item: React.FC<{ card: number }> = ({ card }) => {
  return (
    <Grid item key={card} xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          image="https://images.unsplash.com/photo-1674230226985-f7d78563c90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NTg2OTk1MQ&ixlib=rb-4.0.3&q=80&w=1080"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography>This is a media card. You can use this section to describe the content.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Item;
