# Feed with Authentication

A react project for dummy feed with authentication, which has two pages,
1. Home: contains feed ("/")
2. Auth: contains authentication ("/auth")

------------

#### Authentication
Authentication is handled on client side through **LocalStorage** of browser
- **users**: key stores array of users who have registered/signed up on app
  *(if users key is not present, there are no registered users)*
- **profile**: key stores currently logged in user on app
  *(if profile  key is not present, no user is logged in on app)*

**Note**: In order to log in, the user must be registered or signed up on the app.

------------

#### Component Structure
1.  **common**
- **AuthCard** renders login/sign-up form and handles authentication
- **PostCard** renders ui of post
- **Modal** renders modal

2.  **pages**
- **Home** component renders main feed
- **Auth** component renders authentication components

3. **hooks**
- **useProfile** to get current logged in user details

4. **popups**
- **AuthPopup** handles auth using Modal

------------

#### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

