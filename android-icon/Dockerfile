FROM node:18

# Set working directory
WORKDIR /usr/src

# Copy application files
COPY ./rootfs /usr/src

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 1337

CMD ["app.js"]