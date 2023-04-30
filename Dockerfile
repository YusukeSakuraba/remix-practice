FROM node:18.16.0
WORKDIR /remix-practice/remix-app

COPY ./remix-app/package.json .
COPY ./remix-app/package-lock.json .
RUN npm ci

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]