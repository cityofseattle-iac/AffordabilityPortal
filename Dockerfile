# Using node.js v12.x running on Alpine Linux
from node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN ["npm", "install"]

# Bundle app source
COPY . .

# Expose ports outside of container
EXPOSE 8080 8443

# Build code
RUN ["npm", "run", "build"]

# Start app
CMD ["npm", "start"]

