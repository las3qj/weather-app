import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './css/weather-icons.css';
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ICONS = ["wi wi-day-thunderstorm", "wi wi-day-showers", "wi wi-day-rain", "wi wi-day-snow", 
  "wi wi-day-sunny", "wi wi-day-cloudy", "wi wi-day-haze"];

const useStyles = makeStyles({
    root: {
      minWidth: 150,
      maxWidth: 150,
    },
    title: {
      fontSize: 16,
    },
    pos: {
      marginBottom: 12,
    },
  });

function WeatherCard(props) {
    const classes = useStyles();
    let exSec = props.weather.dt;
    var d = new Date(0);
    d.setUTCSeconds(exSec);
    let title;
    if(props.type === "day") {
      title = DAYS[d.getDay()];
    }
    else {
      const curH = d.getHours();
      title = curH > 12 ? (curH - 12).toString() + " PM" : (curH === 0 ? "12" : curH.toString()) + " AM"
    }
    return (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.weather.weather[0].main}
              <br/>
              <i class={getIcon(props.weather.weather[0].main)}></i>
            </Typography>
            <Typography variant="body2" component="p">
              {props.type==="day" ? props.weather.temp.max.toString()+"° / "+props.weather.temp.min.toString()+"°" 
              : props.weather.temp.toString()+"°"}
            </Typography>
          </CardContent>
      </Card>
      );
}

const getIcon = (weather) => {
  switch(weather) {
    case "Thunderstorm":
      return ICONS[0];
    case "Drizzle":
      return ICONS[1];
    case "Rain":
      return ICONS[2];
    case "Snow":
      return ICONS[3];
    case "Clear":
      return ICONS[4];
    case "Clouds":
      return ICONS[5];
  }
}

export default WeatherCard;

