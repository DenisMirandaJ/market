#!/bin/bash

npx prisma db push
npx prisma db seed
npx prisma generate
node ./dist/src/main.js