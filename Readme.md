
# How to build:
$ docker build -t node/node-web-app .

# Run container:
$ docker run --rm  --tty --interactive \
--name node_server \
--volume /home/developer/code/node/first:/usr/src/app \
--net dev-net \
--ip 172.18.0.40 \
node/node-web-app:latest
