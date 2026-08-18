FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder
ARG APP_NAME
COPY nx.json tsconfig.base.json ./
COPY apps/${APP_NAME} ./apps/${APP_NAME}
RUN npx nx build ${APP_NAME}

FROM node:20-alpine
ARG APP_NAME
WORKDIR /app
COPY --from=builder /app/apps/${APP_NAME}/dist ./
COPY --from=deps /app/node_modules ./node_modules
CMD ["node", "main.js"]
