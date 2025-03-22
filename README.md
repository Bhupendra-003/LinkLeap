# Shortly - URL Shortening Application

## Project Description

Shortly is a modern web application built with React and Vite that allows users to shorten URLs quickly and easily. It leverages Supabase for the backend, providing user authentication, data storage, and link click tracking. The application offers a user-friendly interface built with Radix UI components and styled with Tailwind CSS, ensuring a responsive and consistent experience across devices.

## Key Features

- **URL Shortening:**  Easily shorten long URLs into shorter, more manageable links.
- **Custom Short Links:** (If implemented, otherwise remove) Option to customize the short link URLs.
- **User Authentication:** Secure user accounts with signup and login functionality.
- **Dashboard:**  A personal dashboard to manage and track all shortened links.
- **Link Click Tracking:**  Monitor the number of clicks on each shortened link.
- **FAQ Section:**  Provides answers to frequently asked questions about the service.
- **Responsive Design:**  Fully responsive layout ensuring optimal viewing experience on various devices.

## Technologies Used

- **Frontend:**
    - React:  JavaScript library for building user interfaces.
    - Vite:  Fast build tool and development server for modern web projects.
    - Radix UI:  Accessible and unstyled UI component library.
    - Tailwind CSS:  Utility-first CSS framework for styling.
    - React Router DOM:  For client-side routing and navigation.
- **Backend:**
    - Supabase:  Open-source Firebase alternative for backend services (database, authentication).

## Setup Instructions

To run Shortly locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd shortly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project on [Supabase](https://supabase.com/).
   - Obtain your Supabase API URL and API key from your project settings.
   - Create a `.env` file in the project root and add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=YOUR_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   This will start the development server at `http://localhost:5173`.

## Usage Instructions

1. **Landing Page:** Open the application in your browser. You will be greeted with the landing page where you can immediately shorten URLs.
2. **Sign Up/Login:** To manage your shortened links and access the dashboard, sign up for a new account or log in with your existing credentials.
3. **Shorten URLs:**  Enter the long URL in the input field on the landing page or dashboard and click "Shorten".
4. **Dashboard:**  Once logged in, navigate to the dashboard to view, manage, and track your shortened links.

## Project Structure

```
shortly/
├── public/             # Public assets (images, etc.)
├── src/                # Source code
│   ├── assets/         # Project assets (icons, logos)
│   ├── components/     # React components
│   │   ├── ui/         # Radix UI components
│   ├── context/        # React context providers
│   ├── db/             # Database interaction logic (Supabase)
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Application layouts
│   ├── lib/            # Utility functions
│   ├── pages/          # Application pages/routes
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   ├── main.jsx        # Entry point of the application
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── index.html          # HTML entry file
├── jsconfig.json       # JSConfig for VSCode
├── package-lock.json   #lock file for npm
├── package.json        # Project dependencies and scripts
├── README.md           # Project README file (this file)
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests to improve the project. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) (Assuming MIT License, replace with actual license if different)
