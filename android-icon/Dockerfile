ARG BUILD_FROM
FROM $BUILD_FROM

# Copy application files
COPY rootfs /

# Set working directory
WORKDIR /usr/bin

# Install dependencies
RUN npm install

# Make run.sh executable
RUN chmod +x /usr/src/app/run.sh

# Expose the port the app runs on
EXPOSE 1337

# Run the application
CMD ["node /usr/bin/app.js"]
