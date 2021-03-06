# palindrome-api

## Install
``` bash
npm install
```

## Run
``` bash
node index.js
```
The testing client is running on `http://localhost:3001`

## Make Request with query parameters
``` bash
curl -X GET \
  'http://localhost:3001/api/palindromes?q=aba'
```

## Make Request with uri path
``` bash
curl -X GET \
  http://localhost:3001/api/palindromes/aba
```

## Response Format
consumes:
  - application/json
produces:
  - application/json
  
### Response 
  200 OK:
``` json
{
    "message": "IS A PALINDROME"
}
```
  400 Bad Request:
``` json
{
    "message": "IS NOT A PALINDROME"
}
```
  Empty Data:
``` json
{
    "error": "You must enter at least one palindrome"
}
```
