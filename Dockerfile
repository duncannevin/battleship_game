FROM node:14-alpine AS base

WORKDIR /

COPY package.json .
COPY package-lock.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Build ----
FROM dependencies AS build
COPY . .

RUN export NODE_ENV=production

CMD ["node", "bin/www"]