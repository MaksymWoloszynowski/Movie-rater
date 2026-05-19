FROM node:24-alpine AS deps

WORKDIR /opt/app
COPY package*.json .
RUN npm install -omit=dev

FROM node:24-alpine AS build

WORKDIR /opt/app
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine AS prod

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chown -R appuser:appgroup /var/cache/nginx \
    && chown -R appuser:appgroup /var/run \
    && chown -R appuser:appgroup /etc/nginx

RUN touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /opt/app/dist /usr/share/nginx/html

EXPOSE 8080

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080 || exit 1

CMD ["nginx", "-g", "daemon off;"]