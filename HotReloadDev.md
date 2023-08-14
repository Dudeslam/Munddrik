## run when doing local Dev
docker run \
    --name app \
    --link mongodb \
    -e MONGO_URL=mongodb \
    -e PORT=4000 \
    -p 4000:4000 \
    -v `pwd`/nodejs-with-mongodb-api-example:/src \
    -v nodemodules:/src/node_modules \
    app npm run dev:watch