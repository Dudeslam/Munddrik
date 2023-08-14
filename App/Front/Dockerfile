# Base image
FROM node
# copy files to container
COPY . /usr/src/app


# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app
# Copy package json and install dependencies
RUN npm ci

# Expose port to access server
EXPOSE 8081
# RUN npm run build
# Command to run our app
CMD [ "npm", "run", "build"]