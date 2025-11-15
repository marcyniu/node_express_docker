FROM node:25

# Create app directory
WORKDIR /usr/src/app

# Copy dependency manifests
# A wildcard ensures both package.json AND package-lock.json are copied when present
COPY package*.json ./

# Build-time argument to control installation mode (default: production)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies reproducibly. For production builds we prefer `npm ci` when a lockfile exists.
# For production builds (docker build --build-arg NODE_ENV=production) this will omit dev deps.
# For development builds (docker build --build-arg NODE_ENV=development) it falls back to `npm install`.
RUN if [ "$NODE_ENV" = "production" ]; then \
        if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
            npm ci --omit=dev; \
        else \
            npm install --omit=dev; \
        fi; \
    else \
        npm install; \
    fi

# Bundle app source
COPY . .

EXPOSE 80

# Production should run the app with `node`. Nodemon is a dev-time tool and not appropriate
# for production images because typical workflows bind-mount the host folder and hide
# image-installed node_modules (causing MODULE_NOT_FOUND for ./node_modules/.bin/nodemon).
CMD [ "node", "server.js" ]

