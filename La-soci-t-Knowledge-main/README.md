# Knowledge

Projet ecommerce d'un éditrice française fait pour vender ses cours en ligne

## Installation

- Faites un clone pour la répertoire

```bash
  git clone <repository-url>
```

- Naviger au project

```bash
  cd ecommerce-project
```

- Installer les dépendances

```bash
  npm i
```

## Configuration

### Environment Variables

- **DEFAULT_ADMIN_NAME=**
- **DEFAULT_ADMIN_EMAIL=**
- **DEFAULT_ADMIN_PASSWORD=**
- **MONGODB_URI=**
- **NEXTAUTH_SECRET=**
- **NEXTAUTH_URL=**
- **SQUARE_ACCESS_TOKEN=**
- **NEXT_PUBLIC_SQUARE_APP_ID=**
- **NEXT_PUBLIC_SQUARE_LOCATION_ID=**

## Référence de l'API

```markdown
/actions/admin.actions.ts
```

#### Créer un nouveau cours

```javascript
createCourse(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Récupérer tous les cours

```javascript
fetchCourses();
```

Aucun paramètre requis.

#### Créer une nouvelle leçon

```javascript
createLesson(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Modifier un cours

```javascript
editCourse(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Supprimer un cours

```javascript
deleteCourse(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Récupérer les leçons par identifiant de cours

```javascript
fetchLessonsByCourseId(courseId);
```

| Paramètre  | Type  | Description                             |
| :--------- | :---- | :-------------------------------------- |
| `courseId` | `any` | **Obligatoire**. L'identifiant du cours |

#### Modifier une leçon

```javascript
editLesson(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Récupérer tous les utilisateurs

```javascript
fetchUsers();
```

Aucun paramètre requis.

#### Supprimer une leçon

```javascript
deleteLesson(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Créer un nouveau thème

```javascript
createTheme(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Supprimer un thème

```javascript
deleteTheme(formData);
```

| Paramètre  | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire |

#### Récupérer tous les thèmes

```javascript
fetchThemes();
```

Aucun paramètre requis.

```markdown
/actions/user.actions.ts
```

#### Ajouter au panier

```javascript
addToCart(courseId: string, selectedIds: string[], userId: string)
```

| Paramètre     | Type       | Description                                                           |
| :------------ | :--------- | :-------------------------------------------------------------------- |
| `courseId`    | `string`   | **Obligatoire**. L'identifiant du cours à ajouter.                    |
| `selectedIds` | `string[]` | **Obligatoire**. Les identifiants des leçons sélectionnées à ajouter. |
| `userId`      | `string`   | **Obligatoire**. L'identifiant de l'utilisateur.                      |

#### Supprimer du panier

```javascript
removeFromCart(formData: FormData)
```

| Paramètre  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire. |

#### Obtenir les leçons du panier

```javascript
getCartLessons(userId: string)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |

#### Obtenir les articles du panier

```javascript
fetchCartItems(userId: string)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |

#### Soumettre le paiement

```javascript
submitPayment(token: string, product: any[], userId: string, amount: number)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `token`   | `string` | **Obligatoire**. Le jeton de paiement.           |
| `product` | `any[]`  | **Obligatoire**. Les articles du panier.         |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |
| `amount`  | `number` | **Obligatoire**. Le montant total du paiement.   |

#### Obtenir les commandes de l'utilisateur

```javascript
getUserOrders(userId: string)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |

#### Valider une leçon

```javascript
validateLesson(formData: FormData)
```

| Paramètre  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `formData` | `Object` | **Obligatoire**. Les données du formulaire. |

#### Obtenir les leçons validées par l'utilisateur

```javascript
getValidatedLessons(userId: string)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |

```markdown
/actions/general.actions.ts
```

```javascript
fetchLessons();
```

Aucun paramètre requis.

#### Trouver un cours par son identifiant

```javascript
findCourseById(courseId: string)
```

| Paramètre  | Type     | Description                                           |
| :--------- | :------- | :---------------------------------------------------- |
| `courseId` | `string` | **Obligatoire**. L'identifiant du cours à rechercher. |

#### Récupérer les leçons par identifiant de cours

```javascript
fetchLessonsByCourseId(courseId: string)
```

| Paramètre  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `courseId` | `string` | **Obligatoire**. L'identifiant du cours. |

#### Récupérer le panier de l'utilisateur

```javascript
fetchUserCart(userId: string)
```

| Paramètre | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `userId`  | `string` | **Obligatoire**. L'identifiant de l'utilisateur. |

## Structure des routes

```
- /
  - /cart
  - /courses
  - /library
    - /[id]
      - /[lessonId]
  - /login
  - /register
  - /admin
    - /themes
    - /users
    - /courses
      - /[id]
        - /[lessonId]
```
