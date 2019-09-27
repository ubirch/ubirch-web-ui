FROM ubuntu:16.04
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
          python-software-properties \
          software-properties-common \
          curl \
          expect \
          zip \
          libsass-dev \
          git \
          sudo

# Copy files
RUN mkdir /usr/share/service
COPY ${PROJECT_FILES} /usr/share/service
RUN cd /usr/share/service && pwd && ls


# -----------------------------------------------------------------------------
# Install Java
# -----------------------------------------------------------------------------
# RUN add-apt-repository ppa:openjdk-r/ppa -y && \
#   apt-get update && \
#   apt-get install -y openjdk-8-jdk

# -----------------------------------------------------------------------------
# Install npm, node, cordova & ionic
# -----------------------------------------------------------------------------
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
RUN apt-get install -qqy nodejs
RUN npm install -g cordova && \
  npm install -g ionic

# Install node modules
RUN \
  cd /usr/share/service/ && \
  npm install

# make sure that the script can be executed
RUN chmod +x /usr/share/service/run-local-docker.sh


CMD cd /usr/share/service && bash startup-prod.sh
