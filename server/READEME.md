### Server configuration

✅ API Gateway (Express.js with JWT authentication)
✅ Microservices (Kanban, CRUD Table, User Permissions) with Express.js
✅ Socket.io for real-time updates in Kanban & CRUD services
✅ PostgreSQL with Sequelize ORM
✅ Logging (Winston) & Testing (Jest)
✅ Docker support

### Setup & Run

1. Install dependencies - ( cd/server )

```
npm install
```

2. Start Api Gateway

```
cd api-gateway
```

- Api Gateway will run on port 8000

```
node index.js
```

3. Start services

- CRUD table service

```
cd/servers/crud
```

```
node index.js
```

- kanban service

```
cd/servers/kanban
```

```
node index.js
```
