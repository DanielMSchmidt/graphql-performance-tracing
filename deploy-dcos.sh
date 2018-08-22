#!/bin/bash

set -ex


if [ -z "$1" ]; then
    echo "Please provide the public slave as first argument"
    exit 1
fi

# Replace @public_slave_host
cp services.json services-renamed.json
sed -i -e "s/@public_slave_host/$1/g" services-renamed.json

curl -skSL -X PUT -H "Authorization: token=$(dcos config show core.dcos_acs_token)" -H 'Content-Type: application/json' -d @services-renamed.json $(dcos config show core.dcos_url)/service/marathon/v2/groups

rm services-renamed.json
