FROM node:18

# Required by the mongodb binaries
RUN apt-get install libcurl4
