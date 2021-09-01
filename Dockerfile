FROM nginx:1.20-alpine
COPY .build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
