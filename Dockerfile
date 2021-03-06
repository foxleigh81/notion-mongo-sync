FROM node:14-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN yarn install
CMD [ "yarn", "start" ]