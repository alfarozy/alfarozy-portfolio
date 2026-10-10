
# =========================================================
# STAGE 1 — FRONTEND BUILD
# =========================================================
FROM node:22-alpine AS frontend-build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# =========================================================
# STAGE 2 — PRODUCTION RUNTIME
# =========================================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Install only the static server
RUN npm install --global serve

# Copy production assets only
COPY --from=frontend-build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
