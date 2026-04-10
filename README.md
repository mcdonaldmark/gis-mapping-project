# Overview

This project was created to strengthen my skills as a software engineer in building interactive web applications and working with real-world data. My goal was to gain hands-on experience with mapping technologies, data parsing, and user interface design while creating something visually engaging and functional.

The software is an interactive map that displays locations of LDS temples around the world. It uses a CSV data file to dynamically load temple information, including name, description, category (such as Operating, Announced, or Renovation), and geographic coordinates. Each temple is represented as a marker on the map, and clicking a marker displays additional details in a popup.

Users can interact with the application by:

- Filtering temples based on their status using a dropdown menu
- Searching for temples by name using a search bar
- Viewing the total number of visible markers
- Resetting the map view or zooming to all markers
- Clicking on the map to view latitude and longitude coordinates in the console

The data used in this project comes from a manually created CSV file containing temple locations and statuses. This approach simulates working with external datasets and demonstrates how to parse and visualize structured data in a web application.

The purpose of this project was to practice integrating multiple technologies (JavaScript, mapping libraries, and data parsing tools) into a cohesive application while also improving my ability to debug, manage state, and create user-friendly interfaces.

[Software Demo Video]: https://www.youtube.com/watch?v=w6q7Qswxxuw

# Development Environment

To develop this software, I used a web-based development environment with tools including Visual Studio Code for editing code and a web browser (Google Chrome) for testing and debugging. The browser’s developer tools were especially helpful for inspecting elements, debugging JavaScript, and monitoring console output.

The application is built using:

- HTML for structure
- CSS for styling and layout
- JavaScript for functionality and interactivity

Libraries used:

- Leaflet.js: A lightweight and powerful library for creating interactive maps
- PapaParse: A JavaScript library used to parse CSV data into usable objects

# Useful Websites

- https://leafletjs.com/ (Leaflet documentation and examples)
- https://www.papaparse.com/ (PapaParse documentation)
- https://developer.mozilla.org/ (General JavaScript, HTML, and CSS reference)
- https://stackoverflow.com/ (Troubleshooting and problem-solving)

# Future Work

- Add different marker colors or icons based on temple status for better visualization
- Load data dynamically from an API instead of a static CSV file
