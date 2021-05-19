import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import WeatherBox from "./WeatherBox";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const API_KEY = process.env.REACT_APP_api_key;

function WeatherDash() {
    const [search, setSearch] = useState(22903);
    const [weather, setWeather] = useState(null);
    const [daily, setDaily] = useState(true);
    const handleChange = (event) => {
        setSearch(event.target.value);
        
    }
    useEffect(() => {
        const getAPI = async () => {
            console.log("here");
            let res = await getCoord().then(resp => getWeather(resp.coord)).then(res => setWeather(res)).catch(e => {return;});
        }
        const getCoord = async () => {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather");
            if(isNaN(search)) {
                url.searchParams.append("q", search);
            }
            else {
                url.searchParams.append("zip", search);
            }

            url.searchParams.append("appid", API_KEY);
            url.searchParams.append("units", "imperial");
            return fetch(url)
                .then((resp) => resp.json());
        }
        const getWeather = async (coord) => {
            const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
            url.searchParams.append("lat", coord.lat);
            url.searchParams.append("lon", coord.lon);
            url.searchParams.append("units", "imperial");
            url.searchParams.append("appid", API_KEY);
            return fetch(url)
                .then((resp) => resp.json()
            );
        }
        getAPI();

      }, [search]);


    let weathers = weather===null ? null : daily ? weather.daily : weather.hourly;
    return(
        <div>
            <TextField id="standard-basic" label="zip or city" value={search || ""} onChange={handleChange}/>
            <br/>
            <br/>
            <Button variant="contained" color={daily?"primary":"default"} onClick={()=>setDaily(true)}>Daily</Button>
            <Button variant="contained" color={!daily?"primary":"default"} onClick={()=>setDaily(false)}>Hourly</Button>
            <br/>
            <br/>
            <WeatherBox>
                {weather!==null && weathers.map((weather, index) => {
                    return(
                        <Grid key={index} item>
                            <WeatherCard weather={weather} type={daily?"day":"hour"}></WeatherCard>
                        </Grid>
                    );
                })}
            </WeatherBox>
        </div>
    );
    //<pre>{JSON.stringify(weather, undefined, 4)}</pre>
}

export default WeatherDash;