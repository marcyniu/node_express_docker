
# How to build:
$ docker build -t node/node-web-app .


# Create network if not exists
$ docker network create --driver=bridge \
    --ip-range 172.18.0.0/16 \
    --subnet 172.18.0.0/16 dev-net

# Add local domain to /etc/hosts file:
$ echo "172.18.0.40 node_server.test" >> /etc/hosts

# Run container:
$ docker run --rm  --tty --interactive \
--name node_server \
--volume /home/developer/code/node/first:/usr/src/app \
--net dev-net \
--ip 172.18.0.40 \
node/node-web-app:latest
