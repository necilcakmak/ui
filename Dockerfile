FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++ bash

COPY package*.json ./
RUN npm install
COPY . .

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL


RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production && npm install typescript

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
