# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies
RUN npx playwright install --with-deps

# Copy the rest of your application code to the working directory
COPY . .

# Run Playwright tests and generate the HTML report
CMD ["npx", "playwright", "test", "--reporter=html"]