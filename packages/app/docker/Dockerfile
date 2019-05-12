FROM nginx:latest

EXPOSE 80

RUN mkdir /opt/app
WORKDIR /opt/app
COPY build .
COPY docker/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-c", "/etc/nginx/nginx.conf"]
