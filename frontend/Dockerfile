FROM node:14.15 as react-build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine as react-production-stage
RUN mkdir -p /var/www
COPY --from=react-build-stage /app/dist /var/www
COPY --from=react-build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
