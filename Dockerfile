
#
# ---- Base ----
FROM node:16.19-alpine AS base
WORKDIR /app
COPY package.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Production ----
FROM dependencies AS build
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules ./node_modules
# copy app source
COPY . .
# build files for production
RUN npm run build

#
# ---- Serve using nginx ----
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
