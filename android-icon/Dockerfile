FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy application files
COPY app.js .
COPY package*.json ./
COPY run.sh .

# Install dependencies
RUN npm install

# Make run.sh executable
RUN chmod +x /usr/src/app/run.sh

# Expose the port the app runs on
EXPOSE 1337

# Run the application
CMD ["/usr/src/app/run.sh"]
