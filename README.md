# social_planner_app


## Project Setup Guide

This guide will walk you through setting up a Django backend and a React frontend for your application. The backend folder contains a `requirements.txt` file and a `manage.py` file for the Django project, while the frontend folder contains the React project.

### Prerequisites

Before you start, ensure you have the following installed on your machine:

- Python 3.x
- Node.js (includes npm)
- pip (Python package installer)
- virtualenv (Python virtual environment manager)

### Backend Setup (Django)

1. **Navigate to the backend folder**:
   ```sh
   cd backend
   ```

2. **Create a virtual environment**:
   ```sh
   virtualenv venv
   ```

3. **Activate the virtual environment**:
   - On macOS and Linux:
     ```sh
     source venv/bin/activate
     ```
   - On Windows:
     ```sh
     .\venv\Scripts\activate
     ```

4. **Install the required Python packages**:
   ```sh
   pip install -r requirements.txt
   ```

5. **Run database migrations**:
   ```sh
   python manage.py migrate
   ```

6. **Start the Django development server**:
   ```sh
   python manage.py runserver
   ```

   The backend server should now be running at `http://localhost:8000`.

### Frontend Setup (React)

1. **Navigate to the frontend folder**:
   ```sh
   cd frontend
   ```

2. **Install the required Node.js packages**:
   ```sh
   npm install
   ```

3. **Start the React development server**:
   ```sh
   npm start
   ```

   The frontend server should now be running at `http://localhost:3000`.

### Running the Full Application

With both the backend and frontend servers running, you can access the full application by opening your browser and navigating to `http://localhost:3000`.

### Additional Notes

- **Environment Variables**: If your application requires specific environment variables, ensure they are properly set up in your development environment. For Django, you can use a `.env` file or export them directly in your shell. For React, you can use a `.env` file in the root of the frontend folder.
- **Production Setup**: For a production environment, additional steps such as setting up a production database, configuring a web server (e.g., Nginx), and serving the static files might be necessary.

### Troubleshooting

- **Backend Issues**:
  - Ensure your virtual environment is activated.
  - Check the database configuration in your Django settings.
  - Look at the Django server logs for any error messages.

- **Frontend Issues**:
  - Ensure all dependencies are installed correctly.
  - Check the console for any error messages.
  - Ensure the backend API endpoints are correctly configured in your frontend code.

If you encounter any issues, please refer to the respective documentation for Django and React:

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://reactjs.org/docs/)


Happy coding!