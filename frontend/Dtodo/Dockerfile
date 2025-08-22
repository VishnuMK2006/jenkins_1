#base image define
#working directory
#copy packeage.json here
#commands to install packeages
#copy scorce code now
#expose the port now
#run command

# step1

FROM node:20-alpine AS image1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
# till the above i copy the entire scorce code to docker
RUN npm run build
# step 2


FROM nginx:alpine

#After run the npm run build command it creat and folder structure 
# /app
#  ├── node_modules/
#  ├── src/
#  ├── package.json
#  ├── vite.config.js
#  └── dist/            #This is the folder we want
#       ├── index.html  we gonna copy it and make use of this index .html file thats why
#       ├── assets/
#       └── other compiled files



COPY --from=image1 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]