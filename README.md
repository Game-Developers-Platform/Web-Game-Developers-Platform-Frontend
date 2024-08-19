# Web Game Developers Platform Frontend

Welcome to the Web Game Developers Platform Frontend repository! This React-based web application is part of a comprehensive game development platform designed to streamline game management and interaction for developers.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Project Overview

The Web Game Developers Platform Frontend provides a dynamic and user-friendly interface for game developers to manage and showcase their games. Built using React and Material-UI, the application offers a responsive design and rich feature set for an optimal user experience.

## Features

- **Dynamic Home Page:** Displays featured games with search and filter functionality.
- **Game Details Page:** Shows detailed information about individual games, including images, descriptions, and developer links.
- **Profile Management:** Allows users to manage their profiles, view their games, and edit profile information.
- **Authentication:** Secure sign-in and sign-up functionality using JWT for token-based authentication.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Game-Developers-Platform/Web-Game-Developers-Platform-Frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Web-Game-Developers-Platform-Frontend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

## Usage

- **Home Page:** Browse featured games, search by title or filter by category.
- **Game Details Page:** View detailed information about each game and interact with platform links.
- **Profile Page:** Update your profile information, view your games, and manage settings.
- **Sign-In/Sign-Up:** Use the authentication system to securely access and manage your account.
   
## Configuration

- **Environment Variables:** Create a `.env` file in the root directory and configure the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```
Adjust the `REACT_APP_API_URL` to match your backend server.

## License

This project is licensed under the MIT License.
