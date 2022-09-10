FROM node:14-alpine


# Working dir
WORKDIR /usr/src/app

# Copy Package Json files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the API port
EXPOSE 8000

CMD ["npm","start"]


