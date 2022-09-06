FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

EXPOSE 9101
EXPOSE 8081

# -----------------------------------------------------------------------------
# Install system basics
# -----------------------------------------------------------------------------
RUN \
  apt-get update -qqy && \
  apt-get install -qqy --allow-unauthenticated \
          apt-transport-https \
          software-properties-common \
          curl \
          expect \
          zip \
          libsass-dev \
          git \
          sudo

# -----------------------------------------------------------------------------
# Install npm, node, cordova & ionic
# -----------------------------------------------------------------------------
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
RUN apt-get install -qqy nodejs

RUN npm config set registry https://registry.npmjs.com

RUN npm install -g cordova ionic typescript

# Copy files
COPY ${PROJECT_FILES} /usr/share/service
WORKDIR /usr/share/service

# Install main project first
RUN pwd && ls
RUN npm install

CMD bash startup-prod.sh
