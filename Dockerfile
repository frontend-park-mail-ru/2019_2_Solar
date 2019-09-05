FROM node

COPY ./package.json ./package.json
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY --from=builder /app/dist /usr/share/nginx/html