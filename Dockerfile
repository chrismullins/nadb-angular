FROM node:latest

# set working dir
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# add environment variables
ARG REACT_APP_USERS_SERVICE_URL
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV REACT_APP_USERS_SERVICE_URL $REACT_APP_USERS_SERVICE_URL

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm cache clean --force
RUN npm install
#RUN npm install -g pushstate-server

# add app
ADD . /usr/src/app

# build app
#RUN ng build
RUN npm run build

# start app
#CMD ["pushstate-server", "build"]
CMD ["npm", "run", "start"]

