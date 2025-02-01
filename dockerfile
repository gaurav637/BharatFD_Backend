FROM node:18-alpine

# Create app directory
WORKDIR /app
# Install yarn
# RUN npm install -g yarn
# Copy package.json and package-lock.json
COPY package*.json ./
# Install app dependencies
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","start"]