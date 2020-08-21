ARG PROJECT_ID 
FROM gcr.io/${PROJECT_ID}/cs-base:latest AS base

COPY ./meteor_settings.txt .
RUN meteor build /artifact --allow-superuser && \
    tar -xf /artifact/app.tar.gz -C /artifact && \
    (cd /artifact/bundle/programs/server && npm install) && \
    cp ./meteor_settings.txt /artifact/bundle


FROM node:12.18.3-alpine3.12

WORKDIR /opt/app

COPY --from=base /artifact/bundle /opt/app/

ENTRYPOINT []
