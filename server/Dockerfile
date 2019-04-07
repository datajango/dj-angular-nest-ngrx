#FROM node:8-slim
FROM node
RUN mkdir /SERVER
WORKDIR /server
COPY . .
RUN rm -rf dist
RUN npm install
RUN npm run build
CMD [ "npm", "run", "debug:nodemon" ]
