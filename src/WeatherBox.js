import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function WeatherBox({children}) {
    const classes = useStyles();
    return(
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {children}
                </Grid>
            </Grid>            
        </Grid>
    );
}

export default WeatherBox;