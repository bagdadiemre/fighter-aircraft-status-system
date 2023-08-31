# Fighter Aircraft Status System

![Project Demo](./fighter-aircraft-sample-output.gif)

The Fighter Aircraft Status System is a React.js-based front-end application designed to display the real-time status of a fighter aircraft using SVG animations, WebSocket technology, and Electron for desktop application deployment.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Sample Output](#sample-output)
- [Contributing](#contributing)

## Description
The goal of this project is to create a front-end interface for the Fighter Aircraft Status System using React.js. The application visualizes various aspects of the aircraft's status, such as angle, speed, and battery level, by utilizing SVG animations. It establishes a WebSocket connection with a backend server to receive real-time data updates.

## Features
- Real-time display of aircraft angle, speed, and battery level.
- SVG animations for aircraft rotation, speedometer arrow, and battery level indicator.
- WebSocket connection to receive real-time data updates.
- Start and stop buttons to control data broadcasting.
- Electron integration for desktop application deployment.

## Installation
1. Clone the repository: `git clone https://github.com/bagdadiemre/fighter-aircraft-status.git`
2. Navigate to the project directory: `cd fighter-aircraft-status`
3. Install dependencies: `npm install`

## Usage
1. Start the backend server:
   - Navigate to the `fighter-aircraft-server` directory.
   - Install backend dependencies: `npm install`
   - Run the backend server: `npm run start`
   - Open `http://localhost:5175/` in your browser to verify the server is running.

2. Start the front-end application:
   - Return to the main project directory.
   - Run the application: `npm start`
   - The application will be accessible at `http://localhost:3000/`.

3. To build and run the application as a desktop app using Electron:
   - Run: `npm run electron-build`
   - Navigate to the `dist` directory and execute the generated executable or binary.
     OR
   - Run: `npm run electron` and app will be shown as a window app.

## Technologies Used
- React.js
- WebSocket
- SVG animations
- Electron

## Sample Output
![Project Demo](./fighter-aircraft-sample-output.gif)

For a more detailed demonstration, check the [sample output video](./backend/sample-output/fighter-aircraft-sample-output.webm).

## Contributing
Contributions are welcome! If you find any issues or have suggestions, feel free to submit a pull request or open an issue.
