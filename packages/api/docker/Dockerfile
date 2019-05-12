FROM node:latest

EXPOSE 4000

ENV NODE_ENV=production

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .

RUN npm i

ENTRYPOINT ["npm"]
CMD ["start"]
