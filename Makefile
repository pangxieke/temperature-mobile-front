IMAGE=temperature-mobile
TAG=$(shell git describe --always --tags)
REGISTRY=registry.cn-shenzhen.aliyuncs.com/yzm-fe

build:
	docker build -t ${REGISTRY}/${IMAGE}:${TAG} .

push: build
	docker push ${REGISTRY}/${IMAGE}:${TAG}

publish: push
	docker tag ${REGISTRY}/${IMAGE}:${TAG} ${REGISTRY}/${IMAGE}:latest
	docker push ${REGISTRY}/${IMAGE}:latest
