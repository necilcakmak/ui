FROM node:20-alpine AS builder

WORKDIR /app

# Derleme için gerekli araçlar
RUN apk add --no-cache python3 make g++ bash

# 1. Bağımlılıkları kopyala (Kök dizinden alıyor)
COPY package*.json ./
RUN npm install

# 2. Kaynak kodu kopyala (Kök dizindeki her şeyi /app içine atar)
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Runner aşaması
COPY package*.json ./
RUN npm install --production && npm install typescript

# Builder aşamasından dosyaları çek
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]
