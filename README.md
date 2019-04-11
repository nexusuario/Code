# Credito de Carbono Decentralizado

Com a crescente preocupação de desenvolvimento sustentável, e o futuro das próximas gerações, a comoditie de crédito de carbono tem se mostrado uma preocupação relevante diante da humanidade. Nosso trabalho visa a criação de uma plataforma em blockchain que seja referência no mercado de crédito de carbono.

* Cria uma rede de negócios em blockchain
* Desenvolve uma instância em Hyperledger Fabric
* Constroi um app angular para interagir com através do REST API


# Fluxo de Arquitetura

<p align="center">
  <img width="650" height="200" src="images/arch.png">
</p>

1. O administrador interage com a plataforma de Energia Decentralizada através do framework Angular
2. O processo de requisição do usuário ocorre através de um REST API
3. Implementa requisições ao Blockchain IBM através do Hyperledger Fabric v1
4. O framework Angular obtem os dados através de chamadas GET para o REST API

# Componentes Incluídos

* Hyperledger Composer
* Angular Framework


# Como rodar a aplicação?
Siga as etapas seguintes

## Prerequisitos:
- Sistema Operacional (ou máquina virtual): Ubuntu Linux 14.04 / 16.04 LTS (ambos 64-bit), ou Mac OS 10.12
- [Docker](https://www.docker.com/) (Version 17.03 ou maior)
- [npm](https://www.npmjs.com/)  (v5.x)
- [Node](https://nodejs.org/en/) (version 8.9 ou maior - versão 9 ainda não suportada)
  * para instalar uma versão específica do node, você pode usar [nvm](https://davidwalsh.name/nvm)
- [Hyperledger Composer](https://hyperledger.github.io/composer/installing/development-tools.html)
  * to install composer cli
    `npm install -g composer-cli`
  * to install composer-rest-server
    `npm install -g composer-rest-server`
  * to install generator-hyperledger-composer
    `npm install -g generator-hyperledger-composer`

## Steps
1. [Clone the repo](#1-clone-the-repo)
2. [Setup Fabric](#2-setup-fabric)
3. [Generate the Business Network Archive](#3-generate-the-business-network-archive)
4. [Deploy to Fabric](#4-deploy-to-fabric)
5. [Run Application](#5-run-application)
6. [Create Participants](#6-create-participants)
7. [Execute Transactions](#7-execute-transactions)

## 1. Clone the repo

Clone o código total de desenvolvimento. Em um terminal rode:

```
git clone https://github.com/nexusuario/Code
cd Decentralized-Energy-Composer
```

## 2. Inicie o ambiente Fabric

Esses comandos irão "matar" e remover todos os contêiners, além de remover cadeias anteriores "chaincodes" criado com imagens do hyperledger fabric:

```none
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

Todos os scripts estarão neste diretório: `/fabric-tools`.  É necessáiro criar um card administrativo para a rede de negócios, chamado de peer admin card:

```
cd fabric-tools/
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

## 3. Gera a Arquitetura de Negócios da rede

Gera o importante arquivo .bna

```
cd ../
npm install
```

O comando `composer archive create` no pacote `package.json` terá criado um arquivo chamado: `decentralized-energy-network@0.1.15.bna`.


## 4. Subir para o Fabric

Agora a regra de negócios será colocada no peer, então a arquitetura de negócios .bna será administrada pelo card administrador e importada para uso. É importante dar um "ping" para a obtenção de resposta. Caso não exista reposta, o card de negócios deve ser criado novamente, instalado o bna e iniciado a rede.


Primeiro deve se instalar a rede de negócios:

```
composer network install --card PeerAdmin@hlfv1 --archiveFile decentralized-energy-network@0.1.15.bna
```

Iniciar a rede de negócios:

```
composer network start --networkName decentralized-energy-network --networkVersion 0.1.15 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```

Importar como administrador o card:
```
composer card import --file networkadmin.card
```

Checar se o processo foi realizado corretamente:

```
composer network ping --card admin@decentralized-energy-network
```

## 5. Rodar Aplicação

Primeiro vá até a pasta `angular-app` e então instale a dependência:

```
cd angular-app/
npm install
```

Para iniciar a aplicação:
```
npm start
```

A aplicação deve estar rodando localmente agora no endereço:
`http://localhost:4200`

<div style='border: 2px solid #f00;'>
  <img width="800" src="images/app_scrnshot.png">
</div>
</br>

A comunicação do servidor REST com a rede estará disponível em: 
`http://localhost:3000/explorer/`


## 6. Cria Participantes

Uma vez que a aplicação abre, é possível criar participantes: Residentes, Empresas, Bancos, etc.


## 7. Executa Transações

A execução de transações manualmente entre vendedores e compradores pode então ser executada, e os valores das contas são alterados, de acordo com a transação executada. Existem processos de validação da informação que rodam com a blockchain de modo que a saída, atualizada automaticamente, demora um certo tempo. 

No final da seção, pare o fabric:

```
cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh
```

## Additional Resources
* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [Hyperledger Composer Docs](https://hyperledger.github.io/composer/latest/introduction/introduction.html)

## License
[Apache 2.0](LICENSE)
