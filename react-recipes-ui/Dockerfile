FROM node:14-alpine


# Working dir
WORKDIR /usr/src/app

# Copy Package Json files
COPY package*.json .
COPY yarn.lock .
# Install Dependencies
RUN yarn install
RUN npm install

# Copy all source files
COPY . .

# Expose the UI port
EXPOSE 8001

CMD ["npm","start"]


