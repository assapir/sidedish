FROM node:22-alpine AS base
WORKDIR /app
RUN npm i -g npm

FROM base as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

FROM base as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM base as runner

WORKDIR /app
ENV PORT=3000


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/dist dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules node_modules

USER nodejs

ENTRYPOINT ["node", "--env-file=.env", "dist/src/index.js"]
