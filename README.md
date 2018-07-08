docker build . --tag=usa-charts

docker run -it -d -p 4000:4000 --name=usa-charts usa-charts

