FROM node:18

# Set working directory
WORKDIR /usr/src

# Copy application files
COPY rootfs /usr/src

# Install dependencies
RUN npm install

# Make run.sh executable
RUN chmod +x /usr/src/app/run.sh

# Expose the port the app runs on
EXPOSE 1337

# Run the application
CMD ["node /usr/bin/app.js"]
