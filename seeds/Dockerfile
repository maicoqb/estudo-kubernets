FROM node:20-alpine

WORKDIR /app

RUN npm install tsx typeorm pg reflect-metadata dotenv

COPY products.seed.ts ./seed.ts
COPY tsconfig.json ./tsconfig.json

CMD ["npx", "tsx", "--tsconfig", "tsconfig.json", "seed.ts"]
