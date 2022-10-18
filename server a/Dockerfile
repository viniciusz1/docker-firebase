
FROM node
WORKDIR /
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
COPY ./ .
RUN npm install && npm install firebase
ENTRYPOINT npm start