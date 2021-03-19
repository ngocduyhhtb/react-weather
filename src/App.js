import './App.css';
import Weather from "./components/Weather";
import {WEATHER_APT_KEY, WEATHER_BASE_URL} from "./apis/config";
import {Component} from "react";
import SearchForm from './components/SearchForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            temp: undefined,
            temp_max: null,
            temp_min: null,
            feels_like: null,
            description: "",
            error: false,
            show: false,
        }
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-cloudy",
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {city, country, icon, temp, temp_max, temp_min, feels_like, description, error} = this.state;
        if (this.state !== nextState) {
            return (
                <Weather city={city} country={country} icon={icon} temp={temp} temp_max={temp_max} temp_min={temp_min}
                         feels_like={feels_like}
                         description={description}/>
            )
        }
    }

    handleData = (data) => {
        console.log(data);
        if (data.cod === 200) {
            this.setState({
                city: data.name,
                country: data.sys.country,
                temp: this.calCelsius(data.main.temp),
                temp_max: this.calCelsius(data.main.temp_max),
                temp_min: this.calCelsius(data.main.temp_min),
                feels_like: this.calCelsius(data.main.feels_like),
                icon: this.weatherIcon.Thunderstorm,
                description: data.weather[0].description,
                error: false,
                show: true,
            })
        } else {
            this.setState({error: true})
        }
        this.getWeatherIcon(this.weatherIcon, data.weather[0].id);
    }
    getWeather = async (city, country) => {
        await fetch(`${WEATHER_BASE_URL}?q=${city},${country}&appid=${WEATHER_APT_KEY}`)
            .then((response) => response.json())
            .then((data) => this.handleData(data))
            .catch((error) => console.error(error));
    }

    calCelsius = (temp) => {
        return Math.round((temp - 273.15) * 100) / 100;
    }

    getWeatherIcon = (icons, rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232: {
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            }
            case rangeId >= 300 && rangeId <= 321: {
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            }
            case rangeId >= 500 && rangeId <= 531: {
                this.setState({icon: this.weatherIcon.Rain});
                break;
            }
            case rangeId >= 600 && rangeId <= 622: {
                this.setState({icon: this.weatherIcon.Snow});
                break;
            }
            case rangeId >= 701 && rangeId <= 781: {
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            }
            case rangeId === 800: {
                this.setState({icon: this.weatherIcon.Clear});
                break;
            }
            case rangeId >= 801 && rangeId <= 804: {
                this.setState({icon: this.weatherIcon.Clouds});
                break;
            }
            default:
                break;
        }
    }
    onCloseForm = () => {
        this.setState({
            show: false,
        })
    }

    render() {
        const {city, country, icon, temp, temp_max, temp_min, feels_like, description, error} = this.state;
        return (
            <div className="App"
                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assests/image/background.jpg)`}}>
                <SearchForm getWeather={this.getWeather} error={error}/>
                {this.state.show ? <Weather city={city} country={country} icon={icon} temp={temp} temp_max={temp_max}
                                            temp_min={temp_min}
                                            feels_like={feels_like}
                                            description={description} onCloseForm={this.onCloseForm}/> : ""}
            </div>
        );
    }

}

export default App;
