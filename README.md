# Housley Bouncer Screensaver

This is a Node.js application is a classic bouncing ball screensaver


## Starting the Application ##
### Using OpenShift ###
- Go to Developer view in OpenShift
- Click on the **Add** button
- Change project if required
- Click **Import from Git**
- Enter the Git repository URL
- Click **Edit Import Strategy**
  - Click **Devfile**
  - Set Devfile Path to **devfile.yml**
- Click **Create**




### Using Docker compose ###
- This will build the Docker image and start the application using Docker Compose.
```
docker compose up
```

## Purpose of Included Files ##
- **docker/Dockerfile**: Contains instructions for building the container image for the Node.js application. It sets up the Node.js environment and installs dependencies.
- **src/server.js**: The main Node.js Express server that serves the static files and handles routing.
- **src/public/index.html**: The main HTML file containing the bouncing screensaver application with Material UI styling and JavaScript animation logic.
- **.dockerignore**: Lists files and directories to exclude from the Docker build context, optimizing build performance.
- **.gitignore**: Specifies files and directories to ignore in the Git repository, such as `node_modules`, build artifacts, and environment files.
- **docker-compose.yml**: Defines the Docker Compose configuration for building and running the application in a containerized environment.
- **package.json**: Defines the Node.js project dependencies, scripts, and metadata.
