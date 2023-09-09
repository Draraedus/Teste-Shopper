# Pré-requisitos
Antes de começarmos, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

**Node.js**: Você precisará do Node.js instalado em sua máquina. Verifique a instalação com os comandos node -v e npm -v.

**MySQL**: Instale o MySQL Server com o MySQL WorkBench.

**Git**: Se você ainda não possui o Git instalado, você pode baixá-lo e instalá-lo no site oficial.

Um editor de código, como **Visual Studio Code**, é altamente recomendado.

# Instalação
## Configuração do Banco de Dados MySQL por MySQL workbench

Após a instalação do MySQL, inicie o servidor MySQL e configure uma senha para o usuário root, se ainda não tiver feito isso.

Abra o workbench e informe a senha do usuário root para entrar no WorkBench da conexão do servidor.

Na aba Administração no canto esquerdo da tela clique em **Data Import/Restore**.

Selecione a opção **"Import from self-contained file"** e escolha o arquivo database.SQL.

**Crie um schema com o nome products** e clique em importar.

## Instalação do Backend+frontend

Vá no link do github e copie o link para clonar o repositório na aba **code**.

Abra o bloco de comando numa pasta de sua escolha e digite o código a seguir:

    git clone linkdorepositorio

Agora no mesmo caminho no bloco de comando digite os seguintes códigos:

    cd ./backend
    npm install
    cd ..
    cd ./frontend
    npm install

Isso vai instalar as bibliotecas necessárias.

## Configuração do backend

Vá na WorkBench Do MySQL e abra novamente a sua conexão informando a senha e o usuário.

Vá agora na parte superior e selecione a **aba database**.

Em seguida clique em **manage connections**.

Selecione seu banco de dados e localize as variáveis **host e port**.

Agora acesse o arquivo localizado em **Backend/src/bd/dataBaseConfig.ts** com um editor de texto e modifique os valores host e port para essas váriaveis e modifique o usuário e senha para os seus.

## Inicialização
Com o server do MySQL já iniciado faça os seguintes passos.

1. Abra um bloco de comando na pasta /backend e digite npm start.
2. Faça o mesmo na pasta /frontend.