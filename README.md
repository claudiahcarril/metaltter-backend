# Metaltter V 1.0 (Backend)

Backend desarrollado en Node con Express en el contexto de la práctica final del Bootcamp de Desarrollo Web de Women in Tech de Keepcoding.

Metaltter es una plataforma que permite la publicación de mini contenidos, de manera pública o privada.


## Detalles del desarrollo:
### Componentes principales de la plataforma

#### La plataforma debe contar con 2 componentes principales:
1. ZONA PÚBLICA: será la zona donde lleguen usuarios que no están registrados (usuarios públicos).
2. ZONA PRIVADA: los usuarios que se registren, podrán acceder a su zona privada para poder
publicar y personalizar los contenidos que consumen.


## Roles definidos:
#### Tras un análisis del proyecto, detectamos los siguientes roles definidos:
- Usuario anónimo: usuario de la zona pública cuyo principal interés es la búsqueda y
visualización de contenidos.
- Miembro de la plataforma: usuario de la zona privada cuyo principal objetivo es la publicación
de nuevos contenidos, así como recibir contenidos más adecuados a sus gustos.

## Detalles técnicos:
### Express y MongoDB
- Se ha utilizado MongoDB como base de datos con ayuda de la libería Mongoose
- Se ha utilizado la autenticación por JWT. Para ello se ha utilizado la librería jsonwebtoken
- Se han generado 4 modelos independientes para la gestión de Usuarios, Mets (publicaciones), Kudos (likes) y Follows
- Se ha hecho uso de referencias y búsquedas de tipo populate para: 
    - Relacionar los mets publicados con su autor ('postedBy')
    - Relacionar el total de seguidores y usuarios siguiendo con su propietario
    - Relacionar el kudo (like) de un met (publicación) con el met correspondiente
- Se han configurado los CORS para que se acepten peticiones de tipo app desde la URL de front de Metaltter