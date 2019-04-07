FROM nginx
COPY site.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
