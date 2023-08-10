# 31 de julho (19h15)

Foi analisado:

-   Ponto de situação do projeto:

De momento, o sistema já é capaz de:

-   BACKEND: Receber pacotes LoRaWAN e MQTT e tratá-los – utilizando microserviços;
    -   BACKEND: Persistir esses pacotes em base de dados (MongoDB);
    -   FRONTEND: Apresentar a localização atual dos equipamentos;
    -   FRONTEND: Verificar quais equipamentos se encontram, no momento, online e offline (pressupôs-se comunicações a cada 30 segundos);
-   Utilização do MQTT no IoT:

Foi analisado a forma com que se utiliza o MQTT no IoT. Inicialmente a ideia seria enviar todos os pacotes de dados via MQTT. No entanto, esta solução poderia requerer, em alguns casos, o uso de um *middleware* que realizasse esse mesmo integração. Assim, o MQTT, de momento, será apenas utilizado para equipamentos que utilizem, diretamente, esse meio de comunicação (como é o caso do [Vega NB-13](https://en.iotvega.com/product/nb13) utilizado como exemplo)

-   Próximos passos;

Verificou-se que:

-   A Revisão 2 do diagrama de comunicações é a melhor opção uma vez que nos permite, ao contrário da Revisão 1, tornar a solução independente de uma só tecnologia (no caso, MQTT).

![](media/7c4389430a18eb40970f36a9d6cb3814.jpeg)

Ilustração 1 - Revisão 2 do diagrama de comunicações

Decidiu-se:

-   Analisar a forma de integração de novos equipamentos com as tecnologias atuais. Isto é, deverá ser estudado de que forma é que se deverá proceder para que um novo equipamento que comunique por LoRaWAN ou MQTT possa ficar “compatível” com este sistema;
-   Iniciar-se o registo no documento final daquilo que já foi desenvolvido.
