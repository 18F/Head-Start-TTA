FROM circleci/ruby:2.6.5-node

USER root
RUN curl -v -L -o cf-cli_amd64.deb 'https://cli.run.pivotal.io/stable?release=debian64&source=github' && \
    dpkg -i cf-cli_amd64.deb && \
    rm cf-cli_amd64.deb

USER circleci
