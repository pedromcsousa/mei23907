# Monitorização de Atividades ao Ar Livre
Trabalho realizado por Pedro Sousa com orientação de Luís Ferreira

## Introdução
Este sistema tem como objetivo integrar dados proveninentes de equipamentos e aplicações de forma a fornecer, em tempo real, dados dos utilizadores/praticantes de atividades ao ar livre.

## Estrutura do repositório
- [Frontend](./frontend) - Incluí o código fonte da aplicação Frontend [^1]
- [API](./api) - Incluí o código fonte dos serviços de backend:
    - [Gateway](./api/gateway) - Aplicação Gateway da API do sistema;
    - [Lorawan](./api/lorawan) - Microserviço de integração com o sistema LoRaWAN;

## Tecnologias e Ferramentas
Este sistema será implementado em ambiente Docker juntamente com as seguintes ferramentes:
- ~~[Chirpstack](https://www.chirpstack.io/docs/getting-started/docker.html): Utilizada para gestão local dos equipamentos de tecnologia LoRaWAN;~~
- [MongoDB](https://hub.docker.com/_/mongo): O sistema de base de dados principal;
    ```
     docker run -d \
        -p 27017:27017 \
        --name mongodb \
        -v mongo-data:/data/db \
        -e MONGODB_INITDB_ROOT_USERNAME=mei23907 \
        -e MONGODB_INITDB_ROOT_PASSWORD=mei23907 \
        mongo:4.4.21
    ```
- [Portainer](https://docs.portainer.io/start/install-ce): Ferramenta de gestão do ambiente Docker;
    ```
    docker volume create portainer_data
    docker run -d \
        -p 8000:8000 \
        -p 9443:9443 \
        --name portainer \
        --restart=always \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data portainer/portainer-ce:latest
    ```
Para a utilização total das funcionalidades oferecidas, é necessário configurar/utilizar as seguintes ferramentas/serviços:
- [The Things Network](https://www.thethingsnetwork.org/): Gestão da rede LoRaWAN (substituindo o Chirpstack para que a implementação seja simplificada);


[^1]: Brevemente;
