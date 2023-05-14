FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
CMD ["node", "app.js"]