# Step 1: Build the React app
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass build-time environment variables for Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Step 2: Serve the app using Node
FROM node:22-alpine
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the server script
COPY server.js ./

# Expose the port
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Start the application using our custom server
CMD ["node", "server.js"]
