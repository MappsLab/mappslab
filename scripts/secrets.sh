#!/bin/bash
set -e

tar cvf secrets.tar ./api/.env.staging
travis encrypt-file secrets.tar