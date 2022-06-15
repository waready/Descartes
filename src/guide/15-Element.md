# Anexo C - Descartes 5.0 en versión Pionero BTV3.1
[[toc]]
En el uso de Descartes en Genexus 16 se fueron incorporando nuevas funcionalidades que
afectarán la programación de algunos paneles. 

<img :src="$withBase('/img/25.png')" class="center">

## Descartes integrado a GeneXus 16 for Bantotal

Se puede visualizar Descartes en el mismo espacio de trabajo que GeneXus16.
Aparece como un punto del Menú dentro de GeneXus.
Las funcionalidades de Descartes se mantienen. 

<img :src="$withBase('/img/26.png')" class="center">

Las secciones de trabajo ahora aparecen en la parte superior del panel:

## Paneles con HTML/Javascript embebido

Para poder embeber código HTML/Javascript debemos agregar la opción
“generateScriptArea” con valor “true” a nivel del web-ui (en el diseñador de descartes), esta
opción generara los siguientes componentes:
* Variable &GP_userScriptArea: Esta variable debe ser asignada con el código de
usuario a embeber.

* Subrutina ‘GP: Agregar &GP_usrScriptArea a script area’: Esta se encarga de
impactar el código de usuario en el componente HTML encargado de su ejecución.
Previo a la invocación de esta subrutina se debe asignar el código de usuario a la
variable &GP_userScriptArea.

* Subrutina ‘GP: Limpiar script area’: Esta se encarga de limpiar el contenido del
componente HTML encargo de ejecutar el código de usuario, se recomienda siempre
invocar a esta subrutina al inicio de la asignación del código de usuario. 

Un uso común en Bantotal de esta funcionalidad es en la descarga de archivos, donde
invocamos una rutina del framework que nos devuelve un código Javascript encargado de
someter la descarga del archivo en el navegador del cliente. A continuación, se mostrará un
ejemplo de implementación para clarificar lo especificado:

* En la pestaña “Definition” del complemento de Descartes debemos agregar como
propiedad al tag “web-ui” el atributo “generateScriptArea” como se visualiza en la
siguiente imagen:

<img :src="$withBase('/img/27.png')" class="center">


* Luego de codificada la definición, se deberá generar el Web Panel con descartes para
que, el mismo, cree los componentes ya mencionados.

* Una vez generados los componentes, se debe implementar la lógica de asignación
del script de usuario al componente HTML generado por Descartes, para esto
debemos asignar el código script a la variable generada y luego invocar a la subrutina
encargada de embeber el código al componente HTML como se describe en la
siguiente imagen:

<img :src="$withBase('/img/28.png')" class="center">

### Comparación con programación en Genexus 9 y anteriores


En versiones anteriores a Genexus 16, para embeber HTML/Javascript a un Web Panel
simplemente era necesario agregar la sentencia Form.HeaderRawHTML, sin necesidad de
generar lógica adicional, pero debido a un cambio de arquitectura entre Genexus 16 y
Genexus 9 o anteriores esto ya no es posible, por lo que se tuvo que adaptar la generación
de forma que la lógica de embebido de código HTML / Javascript cambio por completo, a
continuación se genera un cuadro comparativo entre ambas versiones utilizando el ejemplo
especificado en el punto anterior:

<img :src="$withBase('/img/29.png')" class="center">

## Uso de variables hidden y propiedad ReadOnly
Debido a la incorporación de seguridad en los pedidos que se realizan al server por parte de
Genexus 16, donde se expresa que toda variable de solo lectura en pantalla no admite
modificaciones en el entorno del cliente. Es decir, si tengo una funcionalidad que mediante
Javascript modifica el valor de una variable de solo lectura, Genexus 16 desplegara un error
HTTP 403 – Forbidden.

Para poder evitar este control en variables que necesariamente deba ser modificado su valor
del lado del cliente (y solo en estas) y que, sin embargo, las mismas no sean desplegadas en
pantalla, es decir, sean Hidden-Data se agregó la propiedad readOnly la cual permite
especificar si el campo es solo lectura o no.
Tener en cuenta que este control evita que la información sea manipulada del lado del cliente
(Hacking), por lo cual solo utilizar esta propiedad en false para aquellos casos controlados
que lo ameriten.

Un claro ejemplo de este caso presentado en Bantotal es el uso de Pop-up con descartes, en
muchos casos se presenta que un Pop-up necesita de una variable Hidden-Data como uno
de sus parámetro, este valor ocasionalmente es de salida, es decir que será editado su valor
luego de retornar del Pop-up, como descartes maneja la asignación de los retornos de los
Pop-up mediante Javascript esto terminaría arrojando un error HTTP 403, para evitar esto es
necesario agregar la propiedad reaOnly=”false” a aquellas variables que sabemos serán
parte del retorno del Pop-up.

## Grillas con tabla base

Debido a que Genexus 16, en función de mejorar la performance, comenzó a generar
código Genexus como Javascript para evitar la ida al servidor, comenzó a provocar errores a
nivel del cliente por la generación de código no compatible a nivel de Javascript. Por este
motivo recomendamos el no uso de grillas con tabla base, especialmente si se va a utilizar
filtros LIKE sobre las misma, ya que esto provocara un error en ejecución difícil de detectar.