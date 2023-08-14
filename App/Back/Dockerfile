# Base image
FROM node
# Make folder to put our files in
COPY . /usr/src/app

# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app
RUN npm ci
RUN npm install -g nodemon
# Copy package json and install dependencies
# COPY package*.json ./
# RUN npm ci
# Copy our app
# Expose port to access server
EXPOSE 8080

# Command to run our app
CMD [ "npm", "run", "dev"]