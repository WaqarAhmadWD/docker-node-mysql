# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker cache for dependencies)
COPY ../app/package*.json ./

# Install build tools needed for bcrypt and other dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*


# Install dependencies
RUN npm install

# Copy the rest of the application code (including controllers, models, routes, etc.)
COPY ../app/ .

# Expose the port the app will run on
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
