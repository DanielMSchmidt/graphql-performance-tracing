#!/bin/bash

HOST=$(dcos node --json | jq --raw-output '.[] | select(.reserved_resources.slave_public != null) | .id')

dcos node ssh --option StrictHostKeyChecking=no --option LogLevel=quiet --master-proxy --mesos-id="$HOST" "curl -s ifconfig.co";
