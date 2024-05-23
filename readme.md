# BookHub

BookHub este o aplicație destinată iubitorilor de cărți care vor să vadă diferite păreri despre o carte înainte să o citească

## Caracteristici

- Operațiuni CRUD pentru utilizatori, autori, cărți și recenzii.
- Autentificare și autorizare folosind JSON Web Tokens (JWT).
- Middleware pentru verificarea rolurilor și a proprietății resurselor.
- Validarea datelor de intrare.
- Teste unitare și de integrare folosind Jest.

## Tehnologii utilizate

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT pentru autentificare
- Jest pentru testare

## Instalare

1. Clonarea acestui repository:
    ```bash
    git clone https://github.com/GVolter/BookHub.git
    ```

2. Instalarea dependențelor:
    ```bash
    npm install
    ```

3. Configurarea variabilelor de mediu:
    Crearea unui fișier `.env` în directorul rădăcină al proiectului și adăugarea următoarelor variabile:
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/database_name
    ```

4. Inițializarea bazei de date:
    ```bash
    npx prisma migrate dev --name init
    ```

5. Pornirea serverului:
    ```bash
    npm run dev
    ```

## Structura proiectului

- `src/`
  - `controllers/` - Controllere pentru gestionarea cererilor API
  - `middlewares/` - Middleware-uri pentru autentificare, autorizare și validare
  - `routes/` - Definirea rutelor API
  - `swagger/` - Configurare Swagger
- `tests/` - Teste unitare și de integrare

## Utilizare

### Autentificare

1. Înregistrarea unui utilizator:
    ```bash
    POST /auth/signup
    {
      "email": "user@example.com",
      "username": "username",
      "password": "Password1!",
      "role": "user"
    }
    ```

2. Autentificare utilizator:
    ```bash
    POST /auth/login
    {
      "email": "user@example.com",
      "password": "Password1!"
    }
    ```

3. Utilizarea token-ului JWT returnat pentru a accesa rutele protejate.

### Operațiuni CRUD

#### Utilizatori

- Creare utilizator:
    ```bash
    POST /users
    ```

- Obținerea tuturor utilizatorilor:
    ```bash
    GET /users
    ```

- Actualizarea unui utilizator:
    ```bash
    PUT /users/:id
    ```

- Ștergerea unui utilizator:
    ```bash
    DELETE /users/:id
    ```

#### Autori

- Obținerea tuturor autorilor (public):
    ```bash
    GET /authors
    ```

- Creare autor (admin):
    ```bash
    POST /authors
    ```

- Actualizarea unui autor (admin):
    ```bash
    PUT /authors/:id
    ```

- Ștergerea unui autor (admin):
    ```bash
    DELETE /authors/:id
    ```

#### Cărți

- Obținerea tuturor cărților:
    ```bash
    GET /books
    ```

- Creare carte (admin):
    ```bash
    POST /books
    ```

- Actualizarea unei cărți (admin):
    ```bash
    PUT /books/:id
    ```

- Ștergerea unei cărți (admin):
    ```bash
    DELETE /books/:id
    ```

#### Recenzii

- Obținerea tuturor recenziilor pentru o carte:
    ```bash
    GET /books/:id/reviews
    ```

- Creare recenzie:
    ```bash
    POST /books/:id/reviews
    ```

- Actualizarea unei recenzii (proprietar sau admin):
    ```bash
    PUT /reviews/:id
    ```

- Ștergerea unei recenzii (proprietar sau admin):
    ```bash
    DELETE /reviews/:id
    ```

## Testare

Pentru a rula testele, se utilizează următoarea comandă:
```bash
npm test
```

## Diagrama baze de date
![Diagrama](media/image.png)

## FlowChart
![Flowchart](media/flowchart.png)