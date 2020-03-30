FROM node:alpine
EXPOSE 1337
COPY . .
CMD [ "npm", "start" ]