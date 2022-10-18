
FROM node
WORKDIR /
ARG PORT=3001
ENV PORT=$PORT
EXPOSE $PORT
COPY ./ .
RUN npm install && npm install firebase
ENTRYPOINT npm start