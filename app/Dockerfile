FROM node:14


# Working dir
WORKDIR /usr/src/app

# Copy Package Json files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the API port
EXPOSE 3000

CMD ["node","apiEntryPoint.js"]


