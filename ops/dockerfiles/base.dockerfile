FROM ubuntu:18.04
WORKDIR /opt/app/
RUN apt-get update && apt-get install -y curl make gcc libc-dev git npm

RUN curl https://install.meteor.com/ | sh

ADD js_config.tar .

RUN meteor npm install --allow-superuser

ADD meteor_code.tar .

RUN ops/scripts/main.sh symlink_imports && \
    meteor update --allow-superuser 

ENTRYPOINT []
