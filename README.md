# NLW Valoriza

Valorize seus colegas devs 😜

## Guia

### Variáveis ambiente

|    Nome    | Obrigatória |    Padrão     |                    Descrição                     |   Exemplo    |
| :--------: | :---------: | :-----------: | :----------------------------------------------: | :----------: |
| `NODE_ENV` |     Não     | `development` |     Ambiente em que a aplicação está rodando     | `production` |
| `DB_HOST`  |     Sim     |       -       |              Host do banco de dados              | `localhost`  |
| `DB_PORT`  |     Sim     |       -       |             Porta do banco de dados              |    `5432`    |
| `DB_BASE`  |     Sim     |       -       |              Nome do banco de dados              |    `test`    |
| `DB_USER`  |     Sim     |       -       |     Usuário de conexão com o banco de dados      |   `master`   |
| `DB_PASS`  |     Sim     |       -       | Senha de usuário de conexão com o banco de dados |      -       |
|  `SECRET`  |     Sim     |       -       | Um secredo para ser usado na criptografia do JWT |      -       |

### Comandos

Clonar o repositório

```
git clone https://github.com/AlvesWesley/nlw-valoriza.git
```

Instalar as dependências

```
yarn
```

Rodar as migrations do banco de dados

```
yarn migrate
```

Rodar a aplicação em modo de desenvolvimento

```
yarn dev
```

Executar os testes automatizados

```
yarn test
```
