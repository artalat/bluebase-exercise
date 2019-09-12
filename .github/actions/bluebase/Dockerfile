FROM node:10-slim

LABEL version="1.0.0"
# LABEL repository="http://github.com/actions/zeit-now"
# LABEL homepage="http://github.com/actions/zeit-now"
# LABEL maintainer="GitHub Actions <support+actions@github.com>"

LABEL "com.github.actions.name"="GitHub Action for BlueBase"
LABEL "com.github.actions.description"="Wraps the BlueBase CLI to enable common BlueBase commands."
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="blue"
# COPY LICENSE README.md THIRD_PARTY_NOTICE.md /

RUN apt-get install -y bzip2
RUN yarn global add @bluebase/cli

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]
