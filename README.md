## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Deployed Link

```
https://chat-sdk.onrender.com
```

### GraphQL Api

- Creating merchant

```
mutation {
  createMerchant(input: {name: "<name_here>", email: "<email_here>", password: "<password_here>"}){
    id
    name
    email
  }
}
```

- Get all merchants

```
query{
    getAllMerchants {
        id
        name
        email
    }
}
```

- Update merchant

```
mutation {
  updateMerchant(id, input: {name: "<name_here>", email: "<email_here>", password: "<password_here>"}){
    id
    name
    email
  }
}
```

- delete merchant

```
mutation {
  deleteMerchant(id){}
}
```

### Socket.io connection

- connection link: ws://chat-sdk.onrender.com

- provide a token param having payload as, for authenticating connection:

```
{
  userId: <>,
  merchantId: <>
}
```

- secret_key: '1q2w3e4r5t6y7u8i9o0pzaxscdvfbgnhmj,k.l'

- use 'sendMessage' event for sending message

## License

Nest is [MIT licensed](LICENSE).
