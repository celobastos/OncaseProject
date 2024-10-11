# Gerenciamento de Participações de Projetos

## Visão Geral
Este é um projeto para gerenciar a participação de membros em projetos. A aplicação permite criar novos projetos, adicionar membros a esses projetos e visualizar as participações através de um gráfico de pizza. Foi desenvolvida uma aplicação web composta por um **frontend** em React e um **backend** em Django REST framework, com **MySQL** para persistência dos dados.

## Tecnologias Utilizadas
- **Frontend**: React, CSS para estilização, Axios para requisições HTTP, e Chart.js para exibir os gráficos.
- **Backend**: Django REST framework para criação de APIs RESTful e MySQL como banco de dados relacional.

## Arquitetura
O projeto segue uma arquitetura client-server, onde o frontend e o backend são desenvolvidos separadamente, comunicando-se por meio de APIs REST. A aplicação é dividida da seguinte forma:

### Backend
- **Modelos**:
  - **Participant**: Armazena informações sobre os membros (nome e sobrenome).
  - **Project**: Representa um projeto (nome do projeto).
  - **Participation**: Liga um participante a um projeto, com uma porcentagem de participação.
- **Viewsets**:
  - Foram criados viewsets para cada modelo utilizando `viewsets.ModelViewSet`, que fornecem automaticamente operações CRUD (Criar, Ler, Atualizar, Deletar).
- **Serializers**:
  - Os serializers definem como os dados dos modelos são convertidos para formatos JSON e vice-versa, permitindo a manipulação dos dados pelas APIs.

### Frontend
- **Navbar**: Um componente fixo que facilita a navegação pela aplicação.
- **ProjectsList**: Exibe uma lista dos projetos existentes, com paginação para melhorar a navegação.
- **CreateProjectForm**: Um formulário para criação de novos projetos.
- **ProjectPopup**: Um pop-up exibido ao clicar em um projeto, mostrando membros atribuídos ao projeto, um gráfico de participação e um formulário para adicionar novos membros ao projeto.

## Funcionalidades
- **Criação de Projetos**: Permite criar um novo projeto preenchendo um formulário simples.
- **Adicionar Participantes**: Atribui participantes a projetos com uma porcentagem de participação.
- **Visualização das Participações**: Um gráfico de pizza visualiza a distribuição das participações dos membros em cada projeto.
- **Paginação dos Projetos**: A lista de projetos possui paginação para facilitar a navegação.

## Como Rodar o Projeto
### Backend
1. Clone o repositório e entre no diretório do backend.
2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv env
   source env/bin/activate  # Linux/Mac
   .\env\Scripts\activate  # Windows
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Realize as migrações do banco de dados:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Entre no diretório do frontend e instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor do React:
   ```bash
   npm start
   ```

## Boas Práticas Adotadas
- **Modularidade**: Todos os componentes foram separados em arquivos individuais para facilitar a manutenção e reutilização.
- **Responsividade**: A interface foi projetada para ser responsiva, utilizando unidades relativas (`vh`, `vw`, `%`) para se adaptar a diferentes tamanhos de tela.
- **Axios**: Toda a comunicação com o backend é feita através de chamadas HTTP, utilizando o Axios para simplificar as requisições.

## Melhorias Futuras
- **Autenticação**: Implementar um sistema de autenticação para restringir o acesso aos recursos.
- **Notificações**: Adicionar um sistema de notificações para informar aos usuários sobre a criação de novos projetos e membros adicionados.

## Contato
Para qualquer dúvida ou sugestão, entre em contato com o desenvolvedor pelo email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com).

Agradecemos por testar nosso projeto! Fique à vontade para sugerir melhorias ou relatar problemas.

