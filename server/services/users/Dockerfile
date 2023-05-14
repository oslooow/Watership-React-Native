FROM node:18-alpine
WORKDIR /users
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
CMD ["node", "app.js"]