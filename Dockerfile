FROM node:14-alpine

WORKDIR /

COPY package.json .
COPY package-lock.json .

#
# ---- Dependencies ----
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Build ----
COPY . .

RUN export NODE_ENV=production

CMD ["node", "bin/www"]