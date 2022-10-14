FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install --prefix server --only=production
RUN npm install --prefix client --only=production
RUN npm run build --prefix client
USER node
CMD ["npm", "start", "--prefix", "server"]
EXPOSE 8000
