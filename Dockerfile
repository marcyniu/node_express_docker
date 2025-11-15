# Build stage
FROM node:25-bullseye-slim AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies (use npm ci if package-lock.json exists, otherwise npm install)
RUN if [ -f package-lock.json ]; then npm ci --strict-ssl=false; else npm install --strict-ssl=false; fi

# Bundle app source
COPY . .

# Runtime stage
FROM node:25-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN if [ -f package-lock.json ]; then npm ci --only=production --strict-ssl=false; else npm install --only=production --strict-ssl=false; fi

# Copy application files from build stage (excluding node_modules)
COPY --from=build /usr/src/app/server.js .
COPY --from=build /usr/src/app/routes.js .
COPY --from=build /usr/src/app/public ./public

EXPOSE 80

CMD [ "node", "server.js" ]

