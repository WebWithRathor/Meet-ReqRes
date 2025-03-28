# Meet ReqRes Users!

## Overview
The **Meet ReqRes** is a React-based web application that provides user authentication, CRUD operations on users, and a seamless navigation experience. It integrates the [Reqres API](https://reqres.in/) for handling authentication and user data management.

## Features
- **Authentication**: Users can register, log in, and log out securely.
- **User Management**:
  - View a paginated list of users displayed as cards.
  - Search for users by name.
  - Edit existing user details.
  - Delete users from the system.
- **State Management**: Handled using **Redux Toolkit**.
- **Routing**: Implemented using **React Router DOM**.
- **Styling**: Designed with **Tailwind CSS** for a modern and responsive UI.

## Tech Stack
- **Frontend**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API**: Reqres API (for user authentication and data)

## Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/WebWithRathor/Meet-ReqRes.git
   cd Meet-ReqRes
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Access the app**
   Open your browser and go to `http://localhost:5173/` 

## Usage
### Authentication
- Users can **register** with their email and password.
- After registering, users can **log in** using their credentials.
- The authentication state is managed using **session storage**.
- Users can **log out** anytime.

### User Management
- The **Home page** displays a list of users with pagination.
- Users can **search** for specific users.
- Clicking on a user **opens an edit form** to update their details.
- Users can be **deleted**.

## Project Structure
```
📂 src
├── 📂 components    # Reusable UI components
├── 📂 pages         # Application pages (Login, Home, etc.)
├── 📂 store         # Redux Toolkit setup
├── 📂 services      # API requests (Reqres API integration)
├── Index.css       # Tailwind CSS configurations
└── App.js          # Main application file
```

## API Integration
The app interacts with the **Reqres API** for fetching and managing user data.
- **Login**: `POST https://reqres.in/api/login`
- **Register**: `POST https://reqres.in/api/register`
- **Get Users**: `GET https://reqres.in/api/users?page=1`
- **Update User**: `PUT https://reqres.in/api/users/{id}`
- **Delete User**: `DELETE https://reqres.in/api/users/{id}`

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

