# Step 1
FROM node:10-alpine

EXPOSE 3000

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENTRYPOINT ["npm"]

CMD ["start"]