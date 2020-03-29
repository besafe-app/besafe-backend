FROM node:alpine
COPY . .
EXPOSE 1337
RUN npm install
CMD [ "npm", "start" ]