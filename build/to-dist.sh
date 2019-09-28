#!/usr/bin/env bash

echo 'script:\\cp -R -P ./client/images ./dist/images & \\cp -R -P ./client/css/lib ./dist/css/lib'
\cp -R ./client/images ./dist/images & \cp -R -P ./client/css/lib ./dist/css/lib
