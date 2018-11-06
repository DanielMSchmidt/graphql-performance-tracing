#!/bin/bash

set -ex

dcos marathon app list --json | jq ".[].id" | xargs -t -n1 dcos marathon app remove

