# mind
Projeto desenvolvido em React e NodeJs

### `Back-end`
O Back-end foi desenvolvido em NodeJs. Foi utilizado o Express para criação do server e das rotas, utilizando os conceitos de RestAPI. <br>
Para a autenticação e criptografia das senhas, foi utilizado o BCrypt. <br>
Na Controller do projeto, foi utilizado o Multer, um Middleware que foi utilizado para o manuseio, das imagens, que por meio de upload são enviadas para uma pasta do projeto. <br>
Também foi utilizado o jwtToken para criação de um Token de autenticação do usuário. <br>

### `Front-end`

O Front-end do projet foi desenvolvido em React. Foram utilizados vários marcações  para os estilos, como HTML, SCSS e Bootstrap. <br>
Para o consumo das rotas da API, foi utilizado o Axios. <br>
Foram criados formulários com o Formik, para o envio das informações para a API. <br>
Para se manter autenticado, foi usilizado o SessionStorage para guardar as informações <br>
Para as rotas e manipulação de rotas privadas, foi utilizado o React-router. <br>
Os ícones utilizados são do FontAwesome.

### `Database`

O database utilizado foi o MongoDB.

## Build

### Importação do Banco de Dados

Na pasta /db, utilizando o terminal, com o MongoDB instalado, efetuar o comando:
#### mongoimport --db mind --collection users --file mongodata.json --jsonArray

Se estiver utilizado MongoDB Compass:<br>
Criar um novo database "mind", e a collection "users". <br>
Após criar e selecionar a collection, clicar nas opções da collection e ir em "Import data". <br>
Selecionar o arquivo mongodata.json.

### Projeto React

Na pasta /front:

`npm install` <br>
`npm start` <br><br>
Na porta https://localhost:3000/

### Projeto NodeJS

Na pasta /back

`npm install` <br>
`node src/server.js` <br>
ou <br>
`npm run dev`<br>

Na porta https://localhost:5000/





