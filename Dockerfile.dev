FROM node

COPY ./package.json ./package.json
RUN npm install
COPY ./ ./
RUN npm run build

CMD ["npm", "start"]