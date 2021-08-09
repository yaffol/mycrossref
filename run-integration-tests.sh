#!/bin/bash
rm -rf /dist/*
npm ci
echo "Pipeline ID is: ${CI_PIPELINE_ID}"
[[ -z ${CI_PIPELINE_ID+x} ]] && npm run build:lib:standalone
cp -av dist src/integrations/cs_admin/public
cp -av src/integrations/cs_admin/public/* /dist
node mocks/json-server/server.js
