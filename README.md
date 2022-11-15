
# API de Petição

API para criar, editar, listar e deletar petições. Também será possível assinar uma determinada petição existente.

## Documentação

#### Retorna todas as petições

```http
GET /api/petitions
```

#### Retorna uma petição pelo id

```http
GET /api/petitions/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer |

#### Cria uma petição

```http
POST /api/petitions
```

| Propriedade   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user`      | `string` | ID do usuário que está criando |
| `title`      | `string` | Título |
| `description`      | `string` | Descrição |
| `signatures`      | `string[]` | ID dos assinantes |
| `createdAt`      | `date` | Data de criação |


```http
  {
    "user": "79358c84-a265-414d-8d70-7544315741d6",
    "title": "Any Petiton Title",
    "description": "Any Petiton Description",
    "signatures": [
        "3c964336-3313-4153-b5da-1cfd7038f0a9",
        "6fe61858-2887-4ee4-bb6d-7831cfe0654b",
        "a3d755e9-0de8-4511-b2df-f4e7c4e7e0bf"
    ],
    "createdAt": 2022-03-09T14:02:37
  }
```

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
    "title": "Edited Petiton Title",
    "description": "Edited Petiton Description",
  }
```

#### Deleta uma petição

```http
DELETE /api/petitions/:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer deletar |


#### Assina uma petição

```http
POST /api/petitions/:id/sign
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | ID da petição que você quer assinar |


