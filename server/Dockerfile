FROM node:18-alpine
RUN mkdir -p /opt/app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","run","server"]