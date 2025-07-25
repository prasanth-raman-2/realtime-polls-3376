#!/bin/bash
cd /home/kavia/workspace/code-generation/realtime-polls-3376/quickpoll_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

