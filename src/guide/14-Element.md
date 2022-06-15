# Anexo B -Definir Repositorio con HFRConfFilRep
[[toc]]
<img :src="$withBase('/img/24.png')" class="center">

En mi ejemplo se llama contrato y está en la carpeta raíz del directorio virtual donde se
ejecutan los programas.

Luego el código genérico es:


``` genexus
    Call (PFRAddFilToDwn, “nombre del repositorio”, “nombre del archivo”,
    “”, FRFileType.Pdf, 1, &FilId, &FilSee, &ResCod, &ResMsg)
    If (&ResCod <> 0)
        &GP_Mensaje = Udp(PFRRepMsg, &ResMsg, "E")
        Do 'GP: Reportar mensaje'
    Else
        &GP_Url = Link(HFRDwnFil, &FilId, &FilSee, “”)
        Do 'GP: Ir con retorno a &GP_Url'
    EndIf
```
En mi ejemplo:

``` genexus
    Call(PFRAddFilToDwn, "contratos", "pru.pdf", "", FRFileType.Pdf, 1,
    &FilId, &FilSee, &ResCod, &ResMsg)
    If (&ResCod <> 0)
        &GP_Mensaje = Udp(PFRRepMsg, &ResMsg, "E")
        Do 'GP: Reportar mensaje'
    Else
        &GP_Url = Link(HFRDwnFil, &FilId, &FilSee,"")
        Do 'GP: Ir con retorno a &GP_Url'
    EndIf
```

