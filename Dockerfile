# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --force
RUN npx prisma generate

# Bundle app source
COPY . .

EXPOSE 4500
# Creates a "dist" folder with the production build
# RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start" ]