#!/bin/bash
set -e

tar cvf secrets.tar ./api/.env.staging ./api/.env.local
travis encrypt-file secrets.tar