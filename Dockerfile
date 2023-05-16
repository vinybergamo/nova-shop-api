FROM node:latest
ARG PORT=3333
WORKDIR /app
ENV PORT=${PORT}
ENV DATABASE_URL=postgresql://postgres:ad45eLhADkAmzCl3GtbK@containers-us-west-203.railway.app:7442/railway
COPY . /app
RUN rm -rf node_modules
RUN npm install --production
RUN rm -rf /app/src \
  rm -rf ormlogs.log \
  rm -rf test \
  rm -rf Dockerfile \
  rm -rf tsconfig.json \
  rm -rf tsconfig.build.json \
  rm -rf nest-cli.json \
  .env \
  .git \
  .prettierrc \
  README.md \
  .gitignore \
  .eslintrc.js \
  rm -rf package-lock.json \
  rm -rf package.json
EXPOSE ${PORT}
CMD [ "node", "dist/main" ]
