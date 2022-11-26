# API de Petição
API para criar, editar, listar e deletar petições. Também será possível assinar uma determinada petição existente.

## Criação e autenticação

#### Registro de usuário
```http
POST /api/register
```
| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | Nome |
| `email`      | `string` | Email |
| `password`      | `string` | Senha |

##### Input
```http
  {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "any-pass"
  }
```

##### Output
```http
  {
    "insertedUser": {
      "_id": "79358c84-a265-414d-8d70-7544315741d6",
      "name": "John Doe",
      "email": "johndoe@email.com"
    },
    "token": "ANY-TOKEN"
  }
```

&nbsp;
#### Autenticação de usuário
```http
POST /api/auth
```
| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | Email |
| `password`      | `string` | Senha |

##### Input
```http
  {
    "email": "johndoe@email.com",
    "password": "any-pass"
  }
```

##### Output
```http
  {
    "user": {
      "_id": "79358c84-a265-414d-8d70-7544315741d6",
      "name": "John Doe",
      "email": "johndoe@email.com"
    },
    "token": "ANY-TOKEN"
  }
```

&nbsp;
## Documentação geral

**Obs:** Os endpoints que possuem o símbolo :closed_lock_with_key: só podem ser invocados estando o usuário autenticado. Sendo assim,
insira no header da sua requisição o token que você gerou da seguinte forma: ```Authorization: Bearer [seu token] ```
&nbsp;

#### Retorna todas as petições
```http
GET /api/petitions
```
&nbsp;

#### Retorna uma petição pelo id
```http
GET /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer |

&nbsp;
#### Cria uma petição :closed_lock_with_key:
```http
POST /api/petitions
```
| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`       | `string` | Título |
| `description` | `string` | Descrição |
| `target`      | `number` | Meta de qtde de assinaturas (min: 10, max: 5.000.000) |

##### Input
```http
  {
    "title": "Any Petition Title",
    "description": "Any Petition Description",
    "target": 1000
  }
```

##### Output
```http
  {
    "user": "79358c84-a265-414d-8d70-7544315741d6",
    "title": "Any Petition Title",
    "description": "Any Petition Description",
    "target": 1000,
    "signatures": [],
    "createdAt": "2022-03-09T14:02:37"
  }
```
&nbsp;
#### Edita uma petição :closed_lock_with_key:
```http
PUT /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer editar |

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`       | `string` | Novo título |
| `description` | `string` | Nova descrição |
| `target`      | `number` | Nova meta de assinaturas |

```http
  {
    "title": "Edited Petition Title",
    "description": "Edited Petition Description",
    "target": 5000,
  }
```
&nbsp;
#### Deleta uma petição :closed_lock_with_key:
```http
DELETE /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer deletar |

&nbsp;
#### Assina uma petição :closed_lock_with_key:
```http
POST /api/petitions/:id/sign
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer assinar |

&nbsp;
#### Retira a assinatura de uma petição :closed_lock_with_key:
```http
POST /api/petitions/:id/unsign
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer remover sua assinatura |

&nbsp;

#### Verifica a meta de assinaturas
```http
GET /api/petitions/:id/target
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer ver as informações sobre metas |

&nbsp;