FROM node:20

# Install SQLite and apk package manager
RUN apt-get update && apt-get install -y sqlite3

# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/packages

# Copy root package.json and lockfile
COPY . .
# COPY package*.json ./

RUN pnpm install

RUN pnpm build

EXPOSE 4236
