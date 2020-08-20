ARG PROJECT_ID 
FROM gcr.io/${PROJECT_ID}/cs_base:latest AS base

COPY ./meteor_settings.txt .
RUN METEOR_SETTINGS=$(cat ./meteor_settings.txt) meteor build /artifact --allow-superuser && \
    tar -xzf /artifact/app.tar.gz && \
    (cd /artifact/bundle/programs/server && npm install)


FROM node:12.18.3-alpine3.12

WORKDIR /opt/app/bundle

COPY --from=base /artifact/bundle /opt/app/

ENTRYPOINT []
