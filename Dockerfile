FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++ bash

# 1. package.json'ı kopyala
# YOL DÜZELTİLDİ: src/Blog.Ui klasörü içinden al.
COPY Blog.Ui/package*.json ./

RUN npm install
# 2. Kaynak kodu kopyala
# YOL DÜZELTİLDİ: Sadece Blog.Ui klasörünün içeriğini kopyala.
COPY Blog.Ui/. .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Runner aşaması için gerekli dosyaları kopyala
# YOL DÜZELTİLDİ
COPY Blog.Ui/package*.json ./

RUN npm install --production && npm install typescript

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Orijinal yapınızdaki USER komutları izin hatası verdiği için kaldırıldı.
CMD ["npm", "start"]