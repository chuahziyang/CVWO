# CVWO Final Submission

# Introducing Campus Connect

Campus Connect is a user-friendly forum app designed to facilitate discussions, interactions, and the sharing of information between NUS students. It provides a platform where users can create topics, post comments, engage in conversations, and share knowledge on various subjects. The app is intuitive, responsive, and focuses on fostering a sense of community among its users.

# Features and Possibilities

### User Registration and Authentication

- **Account Authentication:** Users can signup and login using their username and password.
- **JWT:** Secure user authentication using JWT Token. Stored as a cookie in the browser.
- **Bcrypt:** Passwords are stored as a salted hash for security.
- **Rerouting:** Unauthenticated Users are automatically redirected to the login page.

### **Creating and Managing Posts**

- **Creating Posts:** Users can create new posts using the new post modal.
- **Archiving/Delete Posts:** Only the post author will be able to archive/delete posts. Archived posts can no longer be commented on.
- **Categories:** Posts can be filtered by their respective categories, so users only see the content they’re interested in.
- **Creating Comments:** Users can leave comments on posts to interact with the author.
- **Deleting Comments:** Users can delete the their own comments.

### Application UI/UX

- **Activity Feed:** Users can see the most recent activity on the platform via the activity feed on the right.
- **Sidebar:** Users can view their posts via the Sidebar on the left.
- **Responsive Design:** Campus Connect is designed for mobile as well! Users will have a great experience whether it be on desktop or mobile.

# **Technical Stack**

NUS Forum is built using modern web technologies to ensure reliability, scalability, and a seamless user experience.

## Frontend

- **React:** Main Javascript library for building the user interface
- **Vite**: Next generation fast and opinionated build tool with great DX.
- **Bun:** Minimalistic tool for compiling and bundling JavaScript.
- **Typescript:** Enhanced JavaScript with static typing for better code quality.

### Routing

- **React Router:** Handles navigation and routing within the application
- **Generouted:** Automatic file based routing using react-router

### UI

- **TailwindCSS:** is a utility-first CSS framework
- **TailwindUI:** Pre-designed components for rapid Tailwind CSS-based interface development.
- **HeadlessUI:** Unstyled, accessible UI components for customizable interface building.
- **Heroicons:** Free, versatile SVG icons for web projects.

### State

- **TanStack-Query:** Streamlined state management for server data in React.
- **React-Cookie:** State Management for JWT Token

## Backend

- **Ruby on Rails:** Streamlined backend framework for building APIs with Ruby.
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT) for secure user authentication
- **RESTful API Design:** For communication between frontend and backend

## Deployment

- [**Railway.app**](http://Railway.app): Hosting Frontend, Backend and Database
- **Database: PostgreSQL hosted on Railway**
- **Continuous Integration/Continuous Deployment (CI/CD):** Handled by Railway

# **Project Setup**

The project is hosted at [**CVWO**](https://cvwo-production.up.railway.app/).

Alternatively, you can run the project locally by following the steps below:
Using WSL2 Ubuntu 20.04 LTS
install bun into WSL
run bun i
run cd backend && bundle install
run cd frontend && bun i
run bun run dev
