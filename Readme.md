
# Build a production image (default behavior):
```bash
docker build -t node/node-web-app .
```

# Build a development image (if you want dev deps inside the image):
```bash
docker build --build-arg NODE_ENV=development -t node/node-web-app:dev .
```

# Create network (if it does not exist)
```bash
docker network create --driver bridge \
        --ip-range 172.18.0.0/16 \
        --subnet 172.18.0.0/16 dev-net
```

# Add local domain to /etc/hosts (requires sudo)

Run this with a root shell or use tee to append as root:
```bash
echo "172.18.0.45 node_server.test" | sudo tee -a /etc/hosts
```

# Run the container

Run the image without bind-mounting the host (image's node_modules are used):
```bash
docker run --rm -it \
  --name node_server \
  --net dev-net \
  --ip 172.18.0.45 \
  node/node-web-app:dev
```
If you want to mount your host code for development and still use image-installed node_modules:
- Use a named volume for node_modules:
```bash
docker run --rm -it \
  --name node_server_dev \
  --net dev-net \
  --ip 172.18.0.45 \
  -v "$(pwd)":/usr/src/app \
  -v node_modules:/usr/src/app/node_modules \
  --workdir /usr/src/app \
  node/node-web-app:dev \
  npm run dev
```