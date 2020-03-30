FROM node:alpine
EXPOSE 1337
COPY . .
RUN npm install
CMD [ "npm", "start" ]