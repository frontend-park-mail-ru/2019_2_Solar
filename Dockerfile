FROM node AS builder

COPY ./package.json ./package.json
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /dist /usr/share/nginx/html
