db.usuarios.drop();
db.usuarios.insert({
    "nombre": "admin",
    "email": "test@test.es",
    "clave": "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ="
});

db.usuarios.createIndex({email:1});
db.anuncios.drop();
db.anuncios.insert([   
     {        
        "nombre" : "Bicleta tamaño xl",
        "venta" : true,
        "precio" : 25.45,
        "foto" : "images/anuncios/bici.jpg",      
        "tags" : [ 
            "lifestyle"
        ]
    },
    {       
        "nombre" : "MacBook PRO 2014",
        "venta" : true,
        "precio" : 750.45,
        "foto" : "images/anuncios/macbookpro.jpg",       
        "tags" : [ 
            "work", 
            "lifestyle"
        ]
    },
    {       
        "tags" : [ 
            "lifestyle", 
            "work"
        ],
        "nombre" : "Cafetera Express",
        "venta" : false,
        "precio" : 30.5,
        "foto" : "images/anuncios/cafetera.jpg",       
        "__v" : 0
    },
    {       
        "tags" : [ 
            "mobile", 
            "lifestyle"
        ],
        "nombre" : "iphone 3GS",
        "precio" : 200,
        "foto" : "images/anuncios/iphone.png",
        "venta" : true,
        "__v" : 0
    }
])