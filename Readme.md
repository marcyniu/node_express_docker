
# How to build:
$ docker build -t node/node-web-app .

# Run container (production):
$ docker run --rm -p 80:80 node/node-web-app

# For development with nodemon:
# Create a Dockerfile.dev with the following content:
# FROM node:25-bullseye-slim
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 80
# CMD ["npm", "run", "dev"]
#
# Then build and run:
# $ docker build -f Dockerfile.dev -t node/node-web-app:dev .
# $ docker run --rm -p 80:80 -v $(pwd):/usr/src/app node/node-web-app:dev

# Create network if not exists
$ docker network create --driver=bridge \
    --ip-range 172.18.0.0/16 \
    --subnet 172.18.0.0/16 dev-net

# As sudo, add local domain to /etc/hosts file:
$ sudo echo "172.18.0.40 node_server.test" >> /etc/hosts

# Run container:
$ docker run --rm  --tty --interactive \
--name node_server \
--volume /home/developer/code/node/node_express_docker:/usr/src/app \
--net dev-net \
--ip 172.18.0.40 \
node/node-web-app:latest

