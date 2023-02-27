FROM node:16

# Required by the mongodb binaries
RUN apt-get install libcurl4
