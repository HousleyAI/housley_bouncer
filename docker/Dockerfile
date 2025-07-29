FROM node:20-slim

# Set the working directory, this is where the application code will be copied and run
WORKDIR /projects

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the node packages listed in the package.json file
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Specify the command to run on container start
# This will run the node application
CMD [ "npm", "start" ]