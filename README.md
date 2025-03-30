# eshop-admin
An Admin Dashboard built with React and Material UI for managing users and products. It features secure login, user management (view, delete, update roles), and product management (add, update, delete). Routes are protected with JWT for secure access. Hosted on Netlify.

# Admin Dashboard

A responsive admin dashboard built with React, Material UI, Axios, JWT authentication, and more. This project allows admins to manage users, products, and roles.

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This is an admin panel built for managing users and products. It provides various features like login, register, adding and updating products, managing user roles, and viewing or deleting users and products.

The project is hosted on [Netlify](https://mybackoffice.netlify.app/).

## Features

- **Login & Registration**: Admins can log in and register.
- **Product Management**: Add, update, and delete products.
- **User Management**: View, delete users and edit their roles.
- **Protected Routes**: Certain routes are protected using JWT tokens to ensure secure access.
- **Responsive UI**: Built with Material UI for a modern, responsive design.

## Technologies Used

- **React**: Front-end framework.
- **Material UI**: UI library for responsive components.
- **React Router**: For routing and navigation.
- **Axios**: For API calls and data fetching.
- **JWT**: For authentication and session management.
- **React Context/State Management**: Used to store authentication state.

## Setup Instructions

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (v6 or higher)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 4. Set up environment variables
Create a .env file at the root of the project and add your backend API URL (if needed).
```bash
REACT_APP_API_URL=https://your-api-url.com
```

### 4. Run the development server
Start the local development server:
```bash
npm start
```

Your app should now be running at http://localhost:3000.

### 5. Build for production
To create a production build, run:
```bash
npm run build
```

This will generate an optimized production build in the build/ directory.

## Folder Structure

```bash
/admin-dashboard
|-- /public
|   |-- index.html
|
|-- /src
|   |-- /components
|   |   |-- Dashboard.js
|   |   |-- Login.js
|   |   |-- Register.js
|   |   |-- Products.js
|   |   |-- Users.js
|   |-- /contexts
|   |   |-- AuthContext.js
|   |-- /utils
|   |   |-- axios.js
|   |-- App.js
|   |-- index.js
|
|-- package.json
|-- .env
|-- README.md
```
* /components: Contains all the React components like Dashboard, Login, Register, etc.
* /contexts: Contains context for managing user authentication state.
* /utils: Utility functions and configurations (e.g., Axios instance).
* App.js: The main component where routes and logic are set up.
* index.js: The entry point for React.

## Contributing
We welcome contributions! If you’d like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit (git commit -am 'Add new feature').
4. Push to your branch (git push origin feature-branch).
5. Open a pull request with a description of the changes you made.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


### Explanation:
- **Project Description**: A brief overview of the admin dashboard and its features.
- **Technologies Used**: Lists the tech stack (React, Material UI, etc.).
- **Setup Instructions**: Step-by-step guide to clone the repo, install dependencies, and start the app.
- **Folder Structure**: Shows the organization of files and directories in your project.
- **Contributing**: Instructions for contributing to the project.
- **License**: If you're using an open-source license (like MIT), it would go here.

This README file should give anyone who looks at the project a good understanding of how to get started, contribute, and understand the project’s structure.

