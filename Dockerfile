
FROM node:20
RUN apt update
RUN apt install nginx -y
RUN apt install nano -y

WORKDIR /app

COPY . /app

RUN yarn

COPY nginx/default /etc/nginx/sites-available/default

EXPOSE 80

CMD yarn build;nginx -g "daemon off;";