# NLW Valoriza 🏆🚀

Valorize seus colegas devs 😜

## Checklist ✔

- [x] Concluir as aulas do NLW
- [x] Implementar graceful shutdown
- [x] Implementar logging com Pino
- [x] Implementar classe customizada de erros
- [x] Implementar testes automatizados (unitário e integração)
- [x] Implementar envio de e-mail ao criar um novo elogio
- [ ] Configurar error tracking com Sentry
- [ ] Fazer deploy em produção

## Guia 📝

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

### Argumentos

Os argumentos podem ser passados no comando para iniciar a aplicação

|      Nome       |          Descrição          |           Exemplo            |
| :-------------: | :-------------------------: | :--------------------------: |
| `--log-level`\* | Informa qual o nível do log | `yarn dev --log-level debug` |

\*[When to use the different log levels](https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels)
