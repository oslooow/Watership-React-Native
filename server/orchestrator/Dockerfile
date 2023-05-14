FROM node:18-alpine
WORKDIR /orchestrator
ENV NODE_ENV=production
ENV PORT=80
ENV BASE_URL_USERS=http://user-services:4001/user
ENV BASE_URL_PRODUCT=http://app-services:4002/courses
COPY ["package.json","package-lock.json*","./"]
RUN npm install

COPY . .

CMD ["node", "app.js"]