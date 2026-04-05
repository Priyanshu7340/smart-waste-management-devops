FROM node:18 AS build

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps
RUN npm install ajv@6 ajv-keywords@3

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
