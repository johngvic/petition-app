# API de Petição
API para criar, editar, listar e deletar petições. Também será possível assinar uma determinada petição existente.

## Documentação
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
#### Cria uma petição
```http
POST /api/petitions
```
| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | Título |
| `description`      | `string` | Descrição |

##### Input
```http
  {
    "title": "Any Petition Title",
    "description": "Any Petition Description",
  }
```

##### Output
```http
  {
    "user": "79358c84-a265-414d-8d70-7544315741d6",
    "title": "Any Petition Title",
    "description": "Any Petition Description",
    "signatures": [],
    "createdAt": "2022-03-09T14:02:37"
  }
```
&nbsp;
#### Edita uma petição
```http
PUT /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer editar |

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | Novo título |
| `description`      | `string` | Nova descrição |

```http
  {
    "title": "Edited Petition Title",
    "description": "Edited Petition Description",
  }
```
&nbsp;
#### Deleta uma petição
```http
DELETE /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer deletar |

&nbsp;
#### Assina uma petição
```http
POST /api/petitions/:id/sign
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer assinar |

&nbsp;