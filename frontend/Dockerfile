FROM node:20-alpine3.20 AS builder
LABEL authors="ramadhan.azka"

WORKDIR /app
ARG VITE_REACT_APP_API_URL
COPY package.json package-lock.json ./
ENV VITE_REACT_APP_API_URL=$VITE_REACT_APP_API_URL

RUN npm install husky -g
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine

EXPOSE 3003

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
