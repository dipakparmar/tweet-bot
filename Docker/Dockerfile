FROM node:16-alpine

WORKDIR /app

# Copy and download dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
RUN npm i -g

# Copy the source files into the image
COPY . .
CMD [ "node","src/index.js", "start" ]