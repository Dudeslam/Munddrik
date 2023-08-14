# Base image
FROM node
# Make folder to put our files in
RUN mkdir -p /usr/src/app
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app
# Copy package json and install dependencies
COPY package*.json ./
RUN npm ci
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 8081
# RUN npm run build
# Command to run our app
CMD [ "npm", "run", "dev"]