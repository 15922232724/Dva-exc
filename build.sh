#!/bin/bash
IMG_MANGER="registry.cn-hangzhou.aliyuncs.com/security_expo" #私有镜像地址
PROJECT_NAME="web_pc"
PROJECT_VERSION="1.1"
sudo rm -rf build/
sudo yarn run build
sudo docker build -t $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION .
IMAGE_ID=`docker images|grep -i $IMG_MANGER/$PROJECT_NAME | awk '{print $3}'`
echo $IMAGE_ID
sudo docker tag $IMAGE_ID $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION
sudo docker push $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION
docker rmi $IMAGE_ID