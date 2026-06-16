FROM node:20-alpine AS deps

WORKDIR /opt/app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS build

WORKDIR /opt/app
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .

ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT

ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM
ENV VITE_KEYCLOAK_CLIENT=$VITE_KEYCLOAK_CLIENT

RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY nginx/nginx-k8s.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]