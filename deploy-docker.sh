#!/bin/bash

set -ex

docker build -t danielmschmidt/graphql-performance-tracing-backend ./graphql-base
docker build -t danielmschmidt/graphql-performance-tracing-backend:$(git rev-parse HEAD) ./graphql-base

docker push danielmschmidt/graphql-performance-tracing-backend:latest
docker push danielmschmidt/graphql-performance-tracing-backend:$(git rev-parse HEAD)

