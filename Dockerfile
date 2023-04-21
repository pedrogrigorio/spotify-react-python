# Build Stage
FROM node:alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# Run Stage
FROM python:alpine
WORKDIR /app

# Install Redis
RUN apk add --no-cache redis

# Copy requirements.txt and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the backend code
COPY backend ./

# Copy the frontend build
COPY --from=build /app/build /app/static

# Copy Redis config
RUN mkdir /data && chown redis:redis /data
VOLUME /data

# Start Redis and the backend server
CMD ["sh", "-c", "redis-server /etc/redis/redis.conf && uvicorn main:app --reload --host 0.0.0.0"]
