(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{458:function(e,a,s){"use strict";s.r(a);var n=s(65),r=Object(n.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"reporte-de-errores-advertencias"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reporte-de-errores-advertencias"}},[e._v("#")]),e._v(" Reporte de Errores/Advertencias")]),e._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#conceptos-basicos"}},[e._v("Conceptos Básicos")])]),s("li",[s("a",{attrs:{href:"#reporte-de-mensajes-en-el-init"}},[e._v("Reporte de Mensajes En El Init")])]),s("li",[s("a",{attrs:{href:"#identificadores-de-mensajes"}},[e._v("Identificadores de Mensajes")])])])]),s("p"),e._v(" "),s("h2",{attrs:{id:"conceptos-basicos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#conceptos-basicos"}},[e._v("#")]),e._v(" Conceptos Básicos")]),e._v(" "),s("p",[e._v("El mecanismo de reporte de errores/advertencias permite mostrarle mensajes al usuario\npara informarle de uno o más errores ocurridos, o darle advertencias de las consecuencias\nde una operación (por ejemplo, el saldo de una cuenta quedó negativo).")]),e._v(" "),s("p",[e._v("Al trabajar en ambiente Web, únicamente se puede reportar los errores/advertencias dentro\nde los WebPanel. Esto es contrario a otras arquitecturas, en donde podíamos reportar errores\ndentro de los procedimientos. Por lo tanto, al escribir cómo implementamos una operación\ntambién debemos escribir en el WebPanel código para reportar errores cuando el usuario\nescribió algún dato mal, o cuando ocurre un error durante la ejecución de la operación, y no\npodemos hacerlo desde los procedimientos.")]),e._v(" "),s("p",[e._v("Cuando necesitamos hacer una modificación en la base de datos debemos hacer una\nllamada a un procedimiento. Al ejecutar este procedimiento se podría producir algún error,\npor ejemplo, porque no se encontró un dato en la base de datos. A pesar que el error se haya\ndetectado durante la ejecución del procedimiento, debemos reportarlo en el WebPanel que\ninvocó al procedimiento. Para lograr esto lo que podemos hacer es agregar un parámetro en\nel procedimiento que indique si ocurrió un error o no, y además el mensaje de error. Por ejemplo, podemos agregar un parámetro que se llame ErrMsg, en el cual se cargara el\nmensaje de error si ocurre un error, y se dejará vacío si no ocurre un error. Luego, en el\nWebPanel que invoca al procedimiento debemos consultar el valor que se devolvió en este\nparámetro, y si no está vacío reportar el error.")]),e._v(" "),s("p",[e._v("Para reportar errores y advertencias se debe asignar el valor true al atributo\ngenerateMsgReport (dentro del elemento web-ui). Luego, al generar la definición se crea la\nsubrutina “GP: Reportar mensaje”, con la cual podremos reportar errores y advertencias de\nla siguiente forma:")]),e._v(" "),s("div",{staticClass:"language-genexus line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('&GP_Mensaje = Udp(PFRRepMsg, "Mensaje de error", "E")\nDo \'GP: Reportar mensaje\' \n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("Antes de invocar a la subrutina “GP: Reportar mensaje” se debe cargar en la variable\nGP_Mensaje el texto del mensaje, y el tipo (“E” error y “W” advertencia). Para cargar la\nvariable GP_Mensaje se debe utilizar el procedimiento FRRepMsg como se muestra en el\nejemplo. El procedimiento recibe primero el texto del mensaje, luego el tipo y devuelve el\nvalor que se le debe asignar a la variable GP_Mensaje.")]),e._v(" "),s("img",{staticClass:"center",attrs:{src:e.$withBase("/img/21.png")}}),e._v(" "),s("p",[e._v("El mecanismo de reporte de mensajes brinda la capacidad de reportar múltiples mensajes.\nEs decir, en caso de tener la necesidad de reportar mas de un error, se puede invocar varias\nveces a la subrutina “GP: Reportar mensaje” con los distintos mensajes.")]),e._v(" "),s("h2",{attrs:{id:"reporte-de-mensajes-en-el-init"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reporte-de-mensajes-en-el-init"}},[e._v("#")]),e._v(" Reporte de Mensajes En El Init")]),e._v(" "),s("p",[e._v("Si se asigna el valor true al atributo generateInit (del elemento web-ui) se genera la subrutina\nInit, la cual se invoca siempre antes de realizar una operación sobre la página. Un posible\nuso de esta subrutina es para hacer validaciones que queremos que se realicen siempre\nantes de hacer cualquier operación. Si se detecta un error, se lo puede reportar utilizando el\nmecanismo de reporte de mensajes. Al reportar un error desde la subrutina Init, se\ndesplegará el error y no se ejecutará la operación. También podemos reportar advertencias\ndentro de la subrutina Init, al reportar este tipo de mensajes se generará automáticamente\nun pedido de confirmación antes de realizar la operación solicitada.")]),e._v(" "),s("h2",{attrs:{id:"identificadores-de-mensajes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#identificadores-de-mensajes"}},[e._v("#")]),e._v(" Identificadores de Mensajes")]),e._v(" "),s("p",[e._v("Además del esquema anterior para reportar mensajes hay definido un esquema basado en\nidentificadores. A continuación se define cómo funciona este modelo. Dentro de la definición\ndel objeto se incluye un elemento llamado messages, donde se listan todos los mensajes\nque se pueden reportar y se les asocia un código. Luego, para reportar un mensaje, en lugar\nde indicar el texto del mensaje indicamos su código. De esta forma, no queda el texto\ndirectamente en el código y podría ser más fácil hacer una aplicación para múltiples idiomas.")]),e._v(" "),s("p",[e._v("Este mecanismo, si bien está soportado, se está considerando eliminarlo, ya que hoy día se\ndisponen de otras herramientas para hacer aplicaciones para múltiples idiomas. Por lo tanto,\nse recomienda reportar mensajes sin utilizar identificadores, sin embargo, se muestra un\nejemplo aquí para poder entender el funcionamiento de los identificadores, en caso de\nencontrar un objeto que fue desarrollado utilizando este esquema. Primero mostraremos la\nsección de definiciones de mensajes:")]),e._v(" "),s("div",{staticClass:"language-xml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("messages")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")])]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("message")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("code")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("PaisNoExiste"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("text")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("El país {1} no existe."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("sp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("/>")])]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("message")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("code")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("PaisNoExiste"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("text")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("Country {1} does not exist."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("en"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("/>")])]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("</")]),e._v("messages")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")])]),e._v(" \n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])]),s("p",[e._v("En el ejemplo, dentro del elemento messages se definió un mensaje para indicar que un país\nno existe en español y luego se definió el mismo mensaje en ingles. Aquí se puede observar\nque ambos mensajes están definidos con el mismo código, pero en distintos lenguajes.\nDentro de los mensajes también se pueden incluir parámetros entre llaves (“{“ y “}”), en el\nejemplo anterior el código del país aparece como un parámetro del mensaje. Ahora veremos\nel código necesario para reportar este mensaje e indicar el nombre del país:")]),e._v(" "),s("div",{staticClass:"language-genexus line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('    // Reporta el mensaje "PaisNoExiste" con el código de país de la\n    variable &PaiCod\n    &GP_Mensaje = Udp(PFRBldMsg1, "PaisNoExiste",\n    &PaiCod, "E") Do \'GP: Reportar mensaje\' \n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);