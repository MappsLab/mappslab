#!/bin/bash
set -e

tar cvf secrets.tar ./api/.env.staging ./api/.env.development ./api/.env.test
travis encrypt-file secrets.tar