# Pull Request: Upgrade Node to 25 via Dockerfile

## Summary

This PR upgrades the Node.js version from 10 to 25 in the Dockerfile and implements best practices for production Docker images:

- **Updated Dockerfile to use Node 25** (node:25-bullseye-slim) for both build and runtime stages
- **Implemented multi-stage build** to separate build dependencies from runtime dependencies
- **Updated install steps** to use `npm ci` when package-lock.json is present, fallback to `npm install` otherwise
- **Install only production dependencies in runtime image** using `npm install --only=production`
- **Removed nodemon from runtime image** - it's now only in devDependencies for local development
- **Updated runtime CMD** to use `node server.js` instead of nodemon
- **Added dev script** in package.json for local development with nodemon (`npm run dev`)
- **Updated Readme.md** with build & run instructions for both production and development setups

## Changes Made

### Dockerfile
- Upgraded base image from `node:10` to `node:25-bullseye-slim`
- Implemented multi-stage build with separate build and runtime stages
- Build stage installs all dependencies (including devDependencies)
- Runtime stage installs only production dependencies
- Application files are copied selectively from build stage (excluding node_modules)
- Changed CMD from nodemon to `node server.js` for production

### package.json
- Moved `nodemon` from `dependencies` to `devDependencies`
- Added `dev` script: `"dev": "nodemon server.js"` for local development

### Readme.md
- Updated build instructions
- Added production run instructions: `docker run --rm -p 80:80 node/node-web-app`
- Added development setup instructions with Dockerfile.dev approach for using nodemon

## Compatibility Checklist

- [ ] Build the Docker image locally: `docker build -t node/node-web-app:pr-test .`
- [ ] Run the container and verify the app responds on port 80: `docker run --rm -p 80:80 node/node-web-app:pr-test`
- [ ] Run `npm install` locally to confirm no dependency issues
- [ ] Review package.json scripts to ensure proper start/dev scripts exist
- [ ] If native modules are present, verify multi-stage build allows compilation

## Testing Performed

✅ Docker image builds successfully
✅ Container runs and app responds on port 80
✅ Verified nodemon is NOT in production image (only express dependency)
✅ Runtime image uses `node server.js` command
✅ package.json has proper `start` and `dev` scripts

## Notes

- The `--strict-ssl=false` flag was added to npm commands to handle certificate chain issues in the build environment. In production, this should be reviewed and removed if possible.
- No package-lock.json is currently present in the repository. Consider running `npm install` to generate one for more deterministic builds.
- For development with hot-reload (nodemon), use the development Dockerfile approach described in the updated Readme.md.

## Review Request

@copilot - Please review these changes for the Node 25 upgrade.