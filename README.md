# Noah's Weather App

![weather-app-gif](https://github.com/user-attachments/assets/52ad7f9c-3bad-4249-beb4-68e964fd04a0)

A responsive web application that allows users to search for weather forecasts by city. The app fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface. The app is built using React, Zustand for state management, and Tailwind CSS for styling.

Built to get a feel for modern web design!

## Features

- **Search for Weather Forecasts**: Users can search for weather forecasts by entering a city name.
- **Display Weather Information**: Shows detailed weather information including temperature, description, and icon.
- **Responsive Design**: The app is designed to be fully responsive, adapting to different screen sizes from mobile devices to large desktop screens.
- **Dynamic Layout**: The number of weather components displayed adjusts dynamically based on the screen size to ensure a clean and organized layout.
- **Remove Weather Forecasts**: Users can remove weather forecasts from the list by clicking on them.
- **Dark Mode Support**: The app supports dark mode, providing a better user experience in low-light environments.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable state management solution.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **OpenWeatherMap API**: An API to fetch weather data.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

This is my project to be deployed, but if you like it and want to mess around, change things, etc. Here is how to do it.

1. Clone the repo
2. Install npm packages "npm install"
3. Create or edit the .env file with your own API Key through OpenWeatherMap (it's free-ish)

REACT_APP_WEATHER_API_KEY=your-api-key-here

4. Run the app "npm start"

### Usage
1. Open your browser and navigate to `http://localhost:3000`
2. Enter a city name in the search bar and press Enter to fetch the weather forecast.
3. View the weather information displayed on the screen (up to 4 for large screens).
4. Click on a weather forecast to remove it from the list.

## Contributing

Any contributions you make are **greatly appreciated**.

Can likely help me making it even better on different devices :D

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Credits

@davidhu2000 React Spinners - https://github.com/davidhu2000/react-spinners
@anatoliygatt Dark Mode Toggle - https://github.com/anatoliygatt/dark-mode-toggle