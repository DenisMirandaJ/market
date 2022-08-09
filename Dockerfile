FROM node:16.16
WORKDIR /app/market
COPY . .
RUN npm ci --only=production
RUN npm run prebuild
RUN npm run build
CMD ["./docker_start.sh" ]