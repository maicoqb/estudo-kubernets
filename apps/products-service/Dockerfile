FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder
COPY nx.json tsconfig.base.json tsconfig.json ./
COPY apps/products-service ./apps/products-service
RUN npx nx build products-service

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/products-service/dist ./
COPY --from=deps /app/node_modules ./node_modules
CMD ["node", "main.js"]
