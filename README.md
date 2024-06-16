# Backend Vitrine de Produtos
## Instruções para Build Local
- Instalar dependencias do package.json
- Preencher o arquivo .env seguindo o padrão proposto no .envExample
- Ligar um banco de dados através do software de sua preferência e criar a database informada no .env
- Rodar o script **npm run dev** 1x para se criar as tabelas
- Ligar o programa usando o script **npm run dev** após as tabelas criadas.

O sistema conta com 4 tabelas, sendo elas:
- Config (Guarda o número do whatsapp para onde os pedidos serão direcionados)
- Produto
- Categoria
- Usuario

## Sobre
<p>Se trata do backend de uma aplicação focada em uma vitrine de produtos simples com direcionamento para o Whatsapp. 
O sistema foi feito de forma limpa como uma solução simples para lojistas que precisam ter sua imagem na internet.</p>
<p>
  A base de cargos dos usuários é simples e composta apenas por 1 usuário nível administrador
cujo tem um PASS TOKEN (utilizado para redefinir a senha), onde este faz toda a gestão da aplicação.
E de forma direta é possível realizar o CRUD de Produtos e de Categorias, sendo possível atrelar <b>1 categoria</b> e <b>1 imagem (opcional)</b> para cada produto do sistema, abaixo as operações do sistema.
</p>

### Funcionalidades

- CRUD número de Whatsapp para direcionar pedidos
- CRUD Produtos
- CRUD Categorias
- Update Usuário master (só é possível 1)

### Tecnologias
- Sequelize (ORM)
- PostgreeSQL (Banco de Dados)
- Express (Router)
- JWT (Tokenização)
- NodeJS
- JavaScript

### Frontend
<a href=#>link para o frontend</a>

