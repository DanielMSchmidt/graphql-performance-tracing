# GraphQL Performance Tracing

This is the base for a blogpost / talk about how to measure performance traces.
It contains different directories representing different stages of how to do performance profiles.

## Deployment

1. Get a DC/OS cluster
2. Install the DC/OS CLI and configure it with the give cluster
3. Add the ssh-key for the cluster to your SSH agent
4. run `./deploy-dcos.sh` this opens all the pages you need (public agent + master)
