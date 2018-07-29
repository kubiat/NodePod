# NODEPOD
## Description
This API allows registered users to view purchase/sale ads.
All requests to the app will return a json.
```
{
    success: true,
    result: [
        {
            tags: [
                "lifestyle"
            ],
            _id: "5b3fbf671126672e0b51d049",
            nombre: "Bicleta tamaño xl",
            venta: true,
            precio: 25.45,
            foto: "images/anuncios/bici.jpg"
        }
    ]
}
```

## NOTES TO kasappeal
ACCESS DATA TO EVALUATE THE PRACTICE OF DEVOPS

### EXERCISE 1
**URL STATIC FILE:** https://practicawebops.webcor.es/images/anuncios/bici.jpg

### EXERCISE 2
**IP:** http://18.209.151.145/

IF YOU WANT TO TEST THE APP YOU MUST REPLACE http://localhost:3000 WITH https://practicawebops.webcor.es/ IN ALL EXAMPLE LINKS

## Instalation
Previously we must have installed nodejs and the express framework

Clone this repo
```
git clone https://github.com/kubiat/NodePod
```
Install dependencies with:
```shell
npm install
```
Run the import script with the sample data.
```shell
npm rum installDB
```


### Mongdb
This application use mongo db. To start Mongo DB you can use    
```SHELL
./bin/mongod --dbpath ./data/db --directoryperdb
```
## Development
To start the application in dev type this in console
```shell
npm run dev
```
## Production
To start the app in production type this in the console
```shell
npm run cluster
```
## API documentation
### Users
**User demo:**
email: test@test.es
password: 1234
####  User registration
POST request to http://localhost:3000/apiv1/usuarios/registro
Send this fields:
- **nombre** (name user)
- **clave** (password user) 
- **email**
The API will generate a security hash to protect your password
#### User athentication
To obtain a token make a POST to: /apiv1/usuarios/login with email & password
Use that token inthe rest of request in:
- header: 'x-access-token'
- body: token
- query string: token
 This token is required to call the different methods of the api once the user is authenticated
####  User update
PUT request to http://localhost:3000/apiv1/usuarios/test@test.es
Send this fields:
- **nombre** (name user)
- **clave** (password user) 
- **email**
- **token** he one obtained in the user's authentication
### Use
For each API request it is possible to obtain error messages in the desired language, to do this, insert the variable lang in the querystring (The available languages are Spanish=>es and English=>en).
**lang=es** // **lang=en**
```shell
http://localhost:3000/apiv1/anuncios?tags=work&lang=es&token=xxxxxxxxxxx
```
#### Get ads list
```shell
http://localhost:3000/apiv1/anuncios?token=xxxxxxxxxxx
```
**Filters**
 You can pass the following parameters in querystring:
 - **nombre** Name off Ad. It is enough to put part of the beginning of the Ad.
```
http://localhost:3000/apiv1/anuncios?nombre=ip&token=xxxxxxxxxxx
```
- **tags**
```
http://localhost:3000/apiv1/anuncios?tags=work&token=xxxxxxxxxxx
```
- **precio** Price of ads by rank
    Between two values **precio=valueA-valueB**
    ```
    http://localhost:3000/apiv1/anuncios?precio=10-50&token=xxxxxxxxxxx
    ```
    Add with price lower than **precio=-value**
    ```
    http://localhost:3000/apiv1/anuncios?precio=-50&token=xxxxxxxxxxx
    ```
    Add with price higher than **precio=value-**
    ```
    http://localhost:3000/apiv1/anuncios?precio=50-&token=xxxxxxxxxxx
    ```
- **venta** This parameter defines the type of ad, if true the ad is for sale, otherwise the ad would be searchable. **venta=false** / **venta=true** 
```
http://localhost:3000/apiv1/anuncios?venta=false&token=xxxxxxxxxxx
```
**To paginate results you can use:**
```
?skip=3&limit=2
```
#### Get ads tags
```shell
http://localhost:3000/apiv1/anuncios/tags?lang=es&token=xxxxxxxxxxx
```

#### Insert ads 
You must send via POST the following fields to url http://localhost:3000/apiv1/anuncios/ : 
- **nombre** (String) Name of Ad
- **precio** (Number) Price of Ad
- **foto** (String) Image of Ad
- **venta** (Boolean) Define whether it is for sale or for search
- **tagas** (Array) Define tags for Ad
- **token** he one obtained in the user's authentication
- (optional) **lang** To display errors in the desired language (es/en) 
#### Update ads 
You must send via PUT the following fields to url http://localhost:3000/apiv1/anuncios/**__Id field of Ad in collection anuncios of MONGODB** : 
```
http://localhost:3000/apiv1/anuncios/5b3e4dec4912db88ebebd398
```
- **nombre** (String) Name of Ad
- **precio** (Number) Price of Ad
- **foto** (String) Image of Ad
- **venta** (Boolean) Define whether it is for sale or for search
- **tagas** (Array) Define tags for Ad
- **token** he one obtained in the user's authentication
- (optional) **lang** To display errors in the desired language (es/en) 
## Acknowledgements
Thanks to the ([keepcoding team](https://keepcoding.io/es/))
and especially to ([Javier](https://github.com/jamg44)) for teaching me this technology.
