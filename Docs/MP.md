# MP.md — Prompt maestro para Claude
## Proyecto: Presentación estratégica ADITMEX × Consejo Agroalimentario de Michoacán

> **Instrucción de uso:** Este archivo debe entregarse a Claude/Claude Code como prompt maestro. Claude debe trabajar sobre el repositorio actual, leer primero `Brief.md`, `GuiaEstudio_Aditmex.md` y el `index.html` que exista en la raíz del proyecto antes de modificar o crear archivos.

---


# 0. ORQUESTACIÓN RECOMENDADA — CÓMO DEBE EJECUTARSE ESTE PROMPT

## Objetivo

No ejecutes todo el proyecto de una sola vez.

Este proyecto debe construirse como un **proceso por etapas con puntos de control**, porque el mayor riesgo no es técnico: es construir una experiencia visualmente espectacular pero estratégicamente equivocada.

La secuencia recomendada es:

```text
ETAPA 0
Contexto + auditoría
        ↓
ETAPA 1
Investigación estratégica
        ↓
ETAPA 2
Concepto creativo + arquitectura narrativa
        ↓
ETAPA 3
Prototipo web con mocks
        ↓
[APROBACIÓN HUMANA]
        ↓
ETAPA 4
Construcción completa
        ↓
ETAPA 5
Integración de imágenes finales
        ↓
ETAPA 6
Tauri + Windows
        ↓
ETAPA 7
QA + optimización
        ↓
ETAPA 8
Auditoría final premium
```

**No saltes el punto de aprobación humana.**

---

## 0.1 Modelo recomendado por etapa

Si estás ejecutando el proyecto en Claude Code y tienes acceso a los modelos actuales:

### ETAPA 0–2 — Claude Opus 5

Usa **Claude Opus 5** para:

- interpretar el brief;
- investigar;
- detectar contradicciones;
- construir el posicionamiento;
- definir la arquitectura narrativa;
- decidir qué NO debe entrar;
- evaluar la identidad visual;
- diseñar la experiencia;
- revisar decisiones técnicas de alto impacto.

Configura un nivel de razonamiento/esfuerzo alto cuando la interfaz lo permita.

**No le pidas todavía que programe toda la aplicación.**

La misión inicial es pensar antes de construir.

---

### ETAPA 3 — Claude Opus 5

Mantén Opus para crear el primer prototipo porque esta fase convierte la estrategia en dirección de arte.

Debe construir solamente:

- shell de la aplicación;
- navegación;
- portada;
- 3–5 escenas representativas;
- sistema visual;
- motion;
- mock 3D;
- responsive;
- pantalla completa.

El resultado debe ser suficientemente real para evaluar la experiencia.

**Detente y solicita aprobación.**

---

### ETAPA 4–6 — Claude Sonnet 5

Una vez aprobado el concepto visual, cambia a **Claude Sonnet 5** para la ejecución cotidiana:

- construcción de las escenas restantes;
- refactor;
- componentes;
- integración de assets;
- optimización;
- Tauri;
- scripts;
- Docker;
- documentación;
- correcciones.

Sonnet 5 está especialmente orientado a trabajo agentic, coding y uso de herramientas, por lo que es adecuado para esta fase de ejecución repetitiva y extensa.

---

### ETAPA 7–8 — Claude Opus 5

Regresa a **Claude Opus 5** para la auditoría final.

No debe limitarse a comprobar que “compila”.

Debe evaluar:

- narrativa;
- percepción de marca;
- calidad visual;
- coherencia;
- exceso de efectos;
- claridad;
- UX;
- rendimiento;
- credibilidad;
- posicionamiento;
- seguridad de claims;
- calidad ejecutiva.

Si encuentra problemas, debe crear una lista priorizada:

```text
P0 — bloquea la presentación
P1 — afecta percepción premium
P2 — mejora recomendable
P3 — detalle menor
```

Después corrige P0 y P1 antes de declarar terminado.

---

## 0.2 Regla de cambio de modelo

No cambies de modelo solamente por economía.

Cambia cuando la naturaleza de la tarea cambie:

| Etapa | Modelo | Objetivo |
|---|---|---|
| 0 | Opus 5 | Comprender |
| 1 | Opus 5 | Investigar |
| 2 | Opus 5 | Diseñar |
| 3 | Opus 5 | Prototipar |
| 4 | Sonnet 5 | Construir |
| 5 | Sonnet 5 | Integrar |
| 6 | Sonnet 5 | Empaquetar |
| 7 | Sonnet 5 | QA técnico |
| 8 | Opus 5 | Auditoría estratégica/premium |

Si el modelo indicado no está disponible en la cuenta, selecciona el modelo actual equivalente más capaz para planificación y el más capaz de coding para ejecución.

**No uses modelos retirados o deprecated.**

---

# 0.3 Usa Claude Code en modo Plan antes de modificar archivos

En la primera ejecución:

1. Inspecciona el repositorio.
2. Lee los archivos.
3. Investiga.
4. Formula el plan.
5. Presenta el plan.
6. NO modifiques archivos todavía.

Utiliza el equivalente disponible de **Plan Mode** de Claude Code.

La primera respuesta de Claude debe ser un diagnóstico, no una avalancha de código.

---

# 0.4 Crea `CLAUDE.md`

Como parte de la primera etapa, crea un archivo:

```text
/CLAUDE.md
```

Este archivo debe contener las reglas permanentes del proyecto:

- objetivo;
- audiencia;
- posicionamiento;
- restricciones de marca;
- tecnologías;
- reglas de contenido;
- reglas de claims;
- estructura;
- comandos;
- política de imágenes;
- regla de aprobación;
- criterios premium.

`MP.md` es el **brief maestro de ejecución**.

`CLAUDE.md` es la **memoria operativa permanente del repositorio**.

No dupliques innecesariamente todo el contenido; extrae las reglas que Claude deberá recordar durante las siguientes sesiones.

---

# 0.5 Git como puntos de control

Si el repositorio utiliza Git:

Crear checkpoints después de cada etapa importante.

Convención recomendada:

```text
feat: strategic audit
feat: visual direction
feat: web prototype
feat: presentation scenes
feat: image integration
feat: tauri desktop
test: presentation qa
chore: final polish
```

Antes de modificaciones grandes:

```bash
git status
```

Después de cada checkpoint:

```bash
git diff
git status
```

No borres trabajo existente sin comprobar primero si pertenece al proyecto original.

---

# 0.6 Regla de no sobreconstrucción

No agregues tecnología solamente porque puede utilizarse.

Antes de añadir una librería, pregunta:

1. ¿Mejora realmente la experiencia?
2. ¿Reduce o aumenta complejidad?
3. ¿Afecta el tamaño del instalable?
4. ¿Afecta rendimiento?
5. ¿Aporta algo que CSS/Framer Motion/React no pueda resolver?
6. ¿Introduce una dependencia que puede fallar offline?

Si la respuesta no justifica la dependencia:

**no la agregues.**

---

# 0.7 Regla de 3D

Three.js/WebGL es un recurso de impacto, no la arquitectura completa.

Usa 3D únicamente en momentos donde:

- explique una idea;
- genere profundidad;
- represente transformación;
- cree una metáfora visual memorable.

No conviertas cada slide en una escena WebGL.

La mayor parte de la presentación debe poder funcionar con:

- CSS;
- SVG;
- Framer Motion;
- imágenes;
- tipografía;
- composición.

---

# 0.8 Prueba visual obligatoria

No declares que una pantalla es “premium” solamente porque el código compila.

Durante el desarrollo, genera capturas de:

- 1920×1080;
- 2560×1440;
- 3840×2160 si es viable.

Revisa:

- alineación;
- márgenes;
- jerarquía;
- legibilidad;
- contraste;
- clipping;
- overflow;
- rendimiento;
- animaciones.

Si el entorno permite automatización de navegador, utiliza Playwright u otra herramienta disponible para capturas y smoke tests.

No agregues Playwright como dependencia de producción solamente para esto.

---

# 0.9 Gate de aprobación humana

Al terminar la ETAPA 3, responde únicamente con:

### PROTOTIPO LISTO PARA REVISIÓN

Y proporciona:

- cómo levantarlo;
- URL local;
- escenas disponibles;
- qué debe revisar el usuario;
- qué elementos siguen siendo mocks.

No continúes automáticamente con:

- imágenes finales;
- Tauri;
- instalador;
- empaquetado.

Espera aprobación explícita.

Cuando el usuario diga que está aprobado, continúa con ETAPA 4.

---

# 0.10 Definición de “aprobado”

Considera aprobado únicamente si el usuario confirma explícitamente algo equivalente a:

- “aprobado”;
- “continúa”;
- “ya quedó”;
- “construye la versión final”.

Comentarios como:

- “se ve bien”;
- “me gusta”;
- “vamos por ahí”

deben interpretarse como feedback, no necesariamente como autorización para cerrar la fase.

---

# 0.11 No bloquees el proyecto por las imágenes

Si todavía no existen las imágenes finales:

Usa mocks.

La aplicación debe poder completarse estructuralmente sin esperar los assets finales.

Cuando existan:

```text
/public/images/
```

reemplázalos sin cambiar la arquitectura.

---

# 0.12 No inventes investigación

Si una fuente externa no puede verificarse:

No la presentes como hecho.

Usa:

```text
[REQUIERE VALIDACIÓN]
```

en el documento interno de investigación y evita convertirla en copy público.

---

# 0.13 Jerarquía de fuentes

Para cualquier afirmación:

### Nivel 1 — Fuente primaria
Sitio oficial de ADITMEX, Consejo, gobierno, documentos institucionales.

### Nivel 2 — Fuente secundaria confiable
Medios reconocidos, publicaciones empresariales, asociaciones.

### Nivel 3 — Inferencia estratégica
Conclusiones propias derivadas de las fuentes.

La interfaz pública debe distinguir los hechos de las inferencias cuando sea necesario.

---

# 0.14 Regla de lenguaje

La audiencia es ejecutiva.

Evita:

- “somos los mejores”;
- “somos líderes”;
- “nadie hace esto”;
- “garantizamos”;
- “revolucionamos”;
- “la solución definitiva”.

Prefiere:

- “acompañamos”;
- “ayudamos a identificar”;
- “buscamos alternativas”;
- “ponemos experiencia y suministro al servicio del desarrollo”;
- “trabajamos para resolver”;
- “construimos relaciones de largo plazo”.

Esto proyecta más confianza que una promesa exagerada.

---

# 0.15 Principio rector

La aplicación no debe intentar demostrar cuánto sabe Claude.

Debe demostrar cuánto puede comprender ADITMEX sobre las necesidades de sus clientes.

La tecnología es invisible.

La estrategia se siente.

La marca permanece.


# 1. ROL

Actúa simultáneamente como:

- Director creativo de una consultora/agencia digital premium de nivel internacional.
- Estratega B2B y especialista en neuroventas.
- Consultor de posicionamiento para la industria agroalimentaria.
- UX/UI Lead especializado en experiencias ejecutivas.
- Motion designer especializado en presentaciones web cinematográficas.
- Frontend engineer senior.
- Especialista en React/TypeScript/WebGL/3D y aplicaciones desktop con Tauri.
- Arquitecto de software orientado a entregables reproducibles y control de versiones.

Tu objetivo no es crear una presentación genérica. Debes crear una **experiencia ejecutiva inmersiva** que haga que ADITMEX sea percibido como un aliado técnico, comercial y de confianza para el ecosistema agroalimentario de Michoacán.

La experiencia debe transmitir:

**confianza + conocimiento + capacidad de respuesta + cercanía local + visión de desarrollo + profesionalismo + resolución.**

No debe parecer una presentación de ventas agresiva.

---

# 2. FUENTES OBLIGATORIAS

Antes de diseñar o programar:

1. Lee completamente `Brief.md`.
2. Lee completamente `GuiaEstudio_Aditmex.md`.
3. Lee y analiza el `index.html` existente en la raíz del proyecto, si está presente.
4. Revisa la estructura completa del repositorio.
5. Consulta el sitio oficial de ADITMEX:
   `https://www.aditmex.com.mx/`
6. Realiza investigación web actualizada sobre el Consejo Agroalimentario de Michoacán y utiliza fuentes institucionales o periodísticas confiables.
7. Distingue claramente:
   - hechos comprobados,
   - información proveniente de los archivos,
   - investigación externa,
   - inferencias estratégicas.

**No inventes** clientes, certificaciones, capacidades técnicas, productos, laboratorios, inventarios, alianzas, cobertura o acreditaciones que no estén respaldados por las fuentes.

Si falta información, diseña el concepto sin afirmarla como hecho.

---

# 3. CONTEXTO ESTRATÉGICO

ADITMEX se presenta actualmente como proveedor de materias primas para las industrias de alimentos, aromas, cosmética e industrial.

El sitio actual comunica más de 10 años de experiencia en distribución de materias primas, calidad, servicio oportuno y asesoría especializada. En alimentos maneja categorías como aditivos, conservadores y materias primas funcionales.

Para esta presentación, el foco debe concentrarse deliberadamente en:

# ALIMENTOS + AGROINDUSTRIA + DESARROLLO DE PRODUCTO

El objetivo estratégico es que ADITMEX deje de ser percibido únicamente como:

> “un proveedor que vende materias primas”

y pase a ocupar mentalmente la posición:

> **“el aliado local que sabe qué ingrediente, solución o combinación de insumos puede ayudarme a convertir una idea agroalimentaria en un producto más estable, consistente y comercializable.”**

---

# 4. QUÉ QUEREMOS CONSEGUIR CON EL CONSEJO

La reunión debe abrir una relación, no cerrar una venta inmediata.

La meta es que el Consejo pueda pensar:

> “ADITMEX puede ser un proveedor confiable y un aliado técnico para las empresas que están transformando, desarrollando o estandarizando productos.”

Queremos convertir a ADITMEX en:

- referencia local;
- proveedor de confianza;
- aliado técnico-comercial;
- punto de consulta para materias primas e ingredientes;
- facilitador de soluciones;
- acompañante de empresas que están creciendo;
- opción preferente dentro de Michoacán para la industria alimentaria.

La presentación debe provocar curiosidad y generar una segunda conversación.

---

# 5. INSIGHT ESTRATÉGICO DEL CONSEJO

La investigación y los documentos base muestran que el Consejo Agroalimentario de Michoacán articula distintos eslabones de la cadena agroalimentaria y tiene interés en:

- innovación;
- competitividad;
- transformación;
- generación de valor agregado;
- conexiones estratégicas;
- capacitación;
- conocimiento;
- desarrollo empresarial;
- impulso de productores y empresas.

El Consejo también ha comunicado la importancia de agregar valor a la producción y de conectar productores, empresas, academia, tecnología y otros actores.

Esto abre una oportunidad clara para ADITMEX:

## El puente entre la materia prima y el producto transformado.

La presentación debe hacer visible ese espacio.

No debemos atacar al Consejo diciendo que “los productores no saben”.

Debemos mostrar que existe una oportunidad:

**producto agrícola → transformación → formulación → estabilidad → estandarización → producto comercializable → crecimiento**

Y que ADITMEX puede participar en la parte de ingredientes, insumos y acompañamiento que corresponda.

---

# 6. PROBLEMA QUE DEBEMOS HACER VISIBLE

Muchas empresas pueden tener:

- una buena materia prima;
- una receta inicial;
- una idea;
- una oportunidad comercial;
- un producto artesanal;
- una producción que está creciendo.

Pero cuando quieren escalar aparecen retos:

- consistencia;
- estabilidad;
- textura;
- conservación;
- vida de anaquel;
- comportamiento del producto;
- disponibilidad de ingredientes;
- selección de insumos;
- repetibilidad;
- estandarización;
- escalabilidad;
- abastecimiento.

No afirmes que ADITMEX resuelve técnicamente cada uno de estos puntos por sí solo.

En su lugar, comunica:

> **ADITMEX ayuda a identificar ingredientes e insumos adecuados y acompaña al cliente para encontrar alternativas que respondan a sus necesidades de producto y proceso.**

---

# 7. POSICIONAMIENTO CENTRAL

Construye toda la narrativa alrededor de esta idea:

## “Ellos ponen la idea. ADITMEX aporta el respaldo en materias primas e ingredientes para ayudar a convertirla en una solución.”

Variaciones conceptuales permitidas:

> **De la idea al producto. Del ingrediente a la posibilidad.**

> **La materia prima correcta puede cambiar lo que un producto puede llegar a ser.**

> **Cuando una idea necesita convertirse en producto, el ingrediente deja de ser un insumo y se convierte en una decisión estratégica.**

No utilices demasiadas frases. Una idea poderosa por pantalla.

---

# 8. PROPUESTA DE VALOR

ADITMEX debe presentarse como:

## Aliado técnico-comercial para el desarrollo y evolución de productos alimentarios.

Pilares:

### 01 — Encontrar
Identificar materias primas, aditivos e ingredientes que respondan a la necesidad.

### 02 — Orientar
Acompañar la selección de insumos de acuerdo con el proceso y objetivo del producto.

### 03 — Resolver
Buscar alternativas cuando existe un problema de disponibilidad, comportamiento, formulación o proceso.

### 04 — Estandarizar
Ayudar a construir mayor consistencia y repetibilidad desde la perspectiva de insumos y materias primas.

### 05 — Escalar
Acompañar la transición de una idea o producción inicial hacia una operación más estructurada.

### 06 — Abastecer
Dar continuidad mediante suministro y atención personalizada.

No prometas resultados técnicos garantizados.

---

# 9. POLÍTICA DE SERVICIO ADITMEX

Crea una sección llamada:

## “Nuestro estándar de servicio”

Debe establecer una política sencilla y creíble, apropiada para una empresa en etapa startup/emprendedora que quiere proyectar madurez.

Principios:

### Respuesta
Toda solicitud recibe seguimiento.

### Claridad
Si algo no se puede resolver, se comunica con transparencia.

### Resolución
No buscamos únicamente decir “no tenemos”; buscamos alternativas.

### Acompañamiento
La relación no termina con la cotización.

### Trazabilidad
Cada solicitud debe tener responsable y seguimiento.

### Compromiso
Lo que se promete debe poder cumplirse.

### Cercanía
Ser un proveedor local que entiende las necesidades del mercado de Michoacán.

### Confianza
La confianza se construye con consistencia, no con discursos.

Frase conceptual:

> **“No prometemos tener todas las respuestas. Prometemos trabajar para encontrar la correcta.”**

Esta frase puede convertirse en uno de los momentos emocionales de la presentación.

---

# 10. VENTAJA COMPETITIVA

No competir únicamente por precio.

La ventaja competitiva debe construirse sobre:

**LOCAL + ESPECIALIZADO + RESOLUTIVO + CERCANO + CON EXPERIENCIA**

Concepto:

## “El proveedor que conoce tu necesidad antes de convertirse en tu proveedor.”

ADITMEX debe diferenciarse de un distribuidor transaccional mediante:

- acompañamiento;
- conocimiento de ingredientes;
- atención humana;
- rapidez;
- capacidad de buscar alternativas;
- orientación;
- continuidad;
- proximidad con empresas de Michoacán;
- especialización en alimentos.

---

# 11. NEUROVENTAS

No utilices tácticas manipulativas.

Aplica neuroventas desde:

- reducción de incertidumbre;
- autoridad demostrada;
- confianza;
- claridad;
- contraste;
- identificación del problema;
- visión de futuro;
- prueba contextual;
- sensación de acompañamiento;
- reciprocidad;
- simplicidad cognitiva.

La audiencia debe sentir:

1. “Entienden mi realidad.”
2. “Esto me pasa.”
3. “Ellos conocen esta parte del problema.”
4. “Podrían ayudarme.”
5. “No quiero equivocarme con mis ingredientes.”
6. “Tiene sentido tenerlos cerca.”
7. “Quiero hablar con ellos.”

---

# 12. ESTRUCTURA NARRATIVA

Diseña una experiencia de aproximadamente 10–14 escenas/pantallas.

No la conviertas en una presentación corporativa tradicional llena de bullets.

Propuesta narrativa:

### ESCENA 01 — APERTURA
ADITMEX

Subtítulo:
**Materias primas que abren posibilidades.**

Visual: campo/producto alimentario transformándose visualmente hacia una solución moderna.

---

### ESCENA 02 — EL CONTEXTO
Michoacán produce.

Pero el verdadero valor aparece cuando la producción puede transformarse.

Mensaje:

> **“El valor no termina en la cosecha.”**

---

### ESCENA 03 — LA OPORTUNIDAD
Mostrar el salto:

Materia prima
→ transformación
→ producto
→ valor agregado
→ mercado

Usar animación secuencial.

---

### ESCENA 04 — EL PROBLEMA INVISIBLE
Una buena idea puede detenerse por una decisión aparentemente pequeña:

- ingrediente;
- estabilidad;
- textura;
- conservación;
- disponibilidad;
- consistencia;
- abastecimiento.

Gran frase:

> **“A veces, crecer no requiere una idea nueva. Requiere encontrar la solución correcta.”**

---

### ESCENA 05 — PRESENTAR ADITMEX
No como “vendedor”.

Como:

# El aliado detrás del ingrediente.

Mostrar experiencia, suministro y enfoque alimentario.

---

### ESCENA 06 — QUÉ HACEMOS
Visual tipo sistema:

Necesidad
→ análisis
→ búsqueda
→ selección
→ suministro
→ seguimiento

Minimalista.

---

### ESCENA 07 — EL PORTAFOLIO COMO SOLUCIONES
No mostrar un catálogo completo.

Agrupar:

- conservadores;
- acidulantes;
- emulsificantes;
- estabilizantes;
- gomas;
- texturizantes;
- aceites;
- extractos;
- aromas;
- otros ingredientes.

El mensaje es:

> **“No empezamos preguntando qué producto quieres comprar. Empezamos preguntando qué necesitas resolver.”**

---

### ESCENA 08 — DEL PRODUCTO ACTUAL AL SIGUIENTE NIVEL

Ejemplos visuales:

Fruta
→ pulpa
→ bebida

Fruta
→ preparación
→ mermelada

Materia prima
→ formulación
→ producto estandarizado

No afirmar formulaciones específicas ni resultados garantizados.

---

### ESCENA 09 — CONFIANZA

Mostrar el “ADITMEX Standard”:

01 Escuchamos  
02 Entendemos  
03 Buscamos  
04 Proponemos  
05 Damos seguimiento

---

### ESCENA 10 — SERVICIO

“Así trabajamos.”

Debe ser visual y elegante.

No poner precios.

---

### ESCENA 11 — MICHOACÁN

Conectar ADITMEX con el ecosistema local.

Mensaje:

> **“Queremos que las empresas agroalimentarias de Michoacán tengan cerca un aliado para resolver lo que necesitan para crecer.”**

No afirmar exclusividad ni ser “el número 1” salvo que exista evidencia.

---

### ESCENA 12 — VISIÓN

No vender un producto.

Vender una relación:

> **“Una nueva etapa de crecimiento necesita proveedores que piensen contigo.”**

---

### ESCENA 13 — CIERRE

Pantalla casi vacía.

Frase principal:

> **“Una buena idea merece algo más que una materia prima.”**

Después:

> **“Merece respaldo.”**

ADITMEX.

---

### ESCENA 14 — CTA FINAL ESTOICO / NEUROVENTAS

Crear un cierre sobrio, memorable y con sentido de necesidad.

Propuesta:

> **“Quien conoce lo que necesita para avanzar, deja de depender del azar.”**

Y debajo:

> **ADITMEX — El respaldo detrás de lo que quieres desarrollar.**

No usar botón de WhatsApp.

No usar CTA de compra.

No utilizar lenguaje agresivo.

---

# 13. DIRECCIÓN VISUAL

Crear una estética:

## “Premium Agroindustrial Intelligence”

Inspiración conceptual:

- Apple;
- consultoría estratégica internacional;
- luxury technology;
- innovación agroalimentaria;
- editorial científica;
- data visualization;
- cinematografía documental.

NO hacer:

- presentación PowerPoint tradicional;
- exceso de verde;
- fotografías genéricas de agricultores sonriendo;
- clipart;
- íconos genéricos;
- gradients baratos;
- exceso de sombras;
- exceso de texto;
- tarjetas repetitivas;
- botones de venta;
- WhatsApp;
- formularios.

---

# 14. PALETA

Analiza primero la identidad visual existente de ADITMEX.

No inventes una identidad completamente diferente.

Utiliza como base los colores reales de la marca y crea:

- fondo principal;
- fondo secundario;
- blanco;
- neutral cálido;
- color de énfasis;
- acento tecnológico.

Si el sitio actual no tiene un sistema suficientemente definido, propone una evolución visual premium sin romper la identidad.

---

# 15. TIPOGRAFÍA

Prioridad:

- tipografía sans-serif premium;
- excelente legibilidad;
- contraste fuerte;
- títulos grandes;
- cuerpo reducido.

Usar fuentes libres/open source.

Preferencia:

- Inter;
- Manrope;
- DM Sans;
- Plus Jakarta Sans.

Selecciona una sola familia principal y una secundaria si realmente es necesario.

---

# 16. TECNOLOGÍA

Utiliza:

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion o Motion
- Three.js / React Three Fiber cuando aporte valor real
- GSAP sólo si es necesario
- Lucide Icons

Para desktop:

## Tauri 2

Razones:

- aplicación ligera;
- frontend web dentro de desktop;
- instalador Windows;
- `.exe`;
- `.msi`;
- no necesita Docker en producción;
- permite pantalla completa;
- mejor alternativa que empaquetar Chromium completo con Electron para este caso.

Tauri genera instaladores Windows como `.msi` o ejecutables de instalación mediante NSIS. WebView2 forma parte del runtime utilizado por Tauri en Windows. Diseña el proyecto para que el resultado final sea autónomo y no dependa de Docker para ejecutar la presentación.

---

# 17. DOCKER

Crear Docker para desarrollo.

Debe permitir:

```bash
docker compose up --build
```

y levantar la experiencia web.

Docker NO debe ser dependencia del instalable final.

El `.exe` generado debe ejecutar los assets compilados directamente.

Si alguna característica realmente exige backend, justificarla antes de implementarla.

Preferencia absoluta:

## presentación 100% estática / local.

---

# 18. INSTALABLE WINDOWS

Crear comandos:

```bash
npm install
npm run dev
npm run build
npm run tauri:build
```

o equivalentes claramente documentados.

Generar:

- `.exe` instalador NSIS;
- opcionalmente `.msi`.

El instalable debe:

- abrir la presentación;
- ocupar pantalla completa;
- ocultar elementos de ventana innecesarios;
- funcionar offline;
- cargar imágenes locales;
- no depender de API;
- no depender de Docker;
- no requerir Node;
- no requerir npm;
- no requerir Claude;
- no requerir internet.

---

# 19. PRESENTACIÓN FULLSCREEN

Implementar:

- inicio en fullscreen;
- soporte de teclado;
- navegación con:
  - ArrowRight
  - ArrowLeft
  - Space
  - Home
  - End
- indicador de progreso discreto;
- transición cinematográfica;
- `ESC` debe salir del modo fullscreen o cerrar la presentación según el comportamiento seguro de la plataforma.

No impedir al usuario recuperar control del sistema.

Agregar también una forma visible/discreta de salir si el entorno lo requiere.

---

# 20. ANIMACIONES

La animación debe sentirse:

**precisa, lenta, elegante, intencional.**

Usar:

- parallax;
- reveal;
- blur-to-sharp;
- scale;
- opacity;
- depth;
- morphing;
- desplazamiento horizontal;
- partículas muy sutiles;
- líneas;
- conexiones;
- microinteracciones.

Three.js/WebGL solamente cuando aporte un efecto memorable.

Ejemplo:

Un objeto abstracto de materia prima que evoluciona visualmente hacia un producto alimentario.

No saturar.

---

# 21. DISEÑO 3D

Crear máximo 2–3 momentos 3D realmente memorables.

Ejemplos:

### 3D #1
Partículas/materias primas que se organizan.

### 3D #2
Cadena de transformación:

materia prima → ingrediente → producto.

### 3D #3
Red de conexión entre productores, ingredientes, procesos y mercado.

Todo debe correr razonablemente en laptops Windows.

Implementar fallback 2D si WebGL no está disponible.

---

# 22. MOCKS ANTES DE LAS IMÁGENES

MUY IMPORTANTE.

Primero construye una versión navegable completa utilizando:

- gradients;
- placeholders;
- shapes;
- bloques;
- mock photography;
- imágenes temporales libres/locales.

NO esperes las imágenes finales para crear la experiencia.

La primera entrega debe permitir revisar:

- narrativa;
- jerarquía;
- layout;
- animaciones;
- navegación;
- timing;
- ritmo;
- composición.

Una vez aprobado el diseño visual, las imágenes finales generadas por ChatGPT sustituirán los mocks.

---

# 23. IMÁGENES

Existe un archivo adicional:

`images_prompt.md`

Ese archivo contiene los prompts para generar las imágenes con ChatGPT.

Respeta estrictamente:

- rutas;
- nombres;
- dimensiones;
- formato;
- proporción.

No cambies los nombres sin actualizar el archivo de prompts.

Las imágenes deben almacenarse localmente, por ejemplo:

```text
/public/images/
```

No depender de URLs externas.

---

# 24. IMÁGENES: ESTILO

Todas las imágenes deben compartir lenguaje visual:

- fotografía editorial premium;
- agroindustria mexicana;
- Michoacán;
- alimentos reales;
- iluminación cinematográfica;
- profundidad;
- composición minimalista;
- colores naturales;
- aspecto internacional;
- nada de stock evidente;
- nada de personas mirando a cámara salvo que tenga sentido;
- evitar clichés rurales.

---

# 25. CONTENIDO

El contenido debe ser breve.

Regla:

## Una idea por pantalla.

No colocar párrafos largos.

Cuando sea necesario explicar algo, utilizar:

- título;
- subtítulo;
- 3–5 conceptos;
- visual.

La presentación debe poder ser presentada oralmente.

---

# 26. DATOS Y CREDIBILIDAD

Puedes utilizar hechos de la investigación externa, pero:

- cita discretamente las fuentes cuando sea relevante;
- no llenar las pantallas de referencias;
- crea una pantalla final de “Fuentes / contexto” si utilizas datos externos;
- no convertir la experiencia en un reporte académico.

Los archivos `Brief.md` y `GuiaEstudio_Aditmex.md` son la base principal de la narrativa.

---

# 27. INVESTIGACIÓN ESTRATÉGICA

Antes de programar, genera internamente un análisis:

### Consejo
- propósito;
- ecosistema;
- prioridades;
- actores;
- oportunidades;
- necesidades;
- lenguaje institucional;
- oportunidades de colaboración.

### ADITMEX
- propuesta actual;
- fortalezas;
- debilidades;
- percepción;
- oportunidades;
- diferenciadores.

### Gap
Identifica:

> ¿Qué necesita el ecosistema agroalimentario que ADITMEX puede ocupar como espacio mental?

La respuesta debe orientar la narrativa.

---

# 28. HIPÓTESIS DE POSICIONAMIENTO

Validar y, si la investigación lo confirma, desarrollar:

## “ADITMEX como infraestructura de ingredientes para la innovación alimentaria local.”

No necesariamente utilizar esta frase literalmente.

Es un concepto estratégico.

La idea es que ADITMEX no sea “otro distribuidor”.

Debe convertirse en:

> **el punto de referencia para encontrar la materia prima, ingrediente o alternativa que ayude a avanzar.**

---

# 29. MÉTRICA DE ÉXITO

La presentación será exitosa si después de verla un representante del Consejo puede responder:

1. ¿Qué hace ADITMEX?
2. ¿Por qué es diferente?
3. ¿Por qué confiar?
4. ¿Para quién es especialmente útil?
5. ¿Qué tipo de empresas podría recomendarles?
6. ¿Por qué tiene sentido tenerlos como aliado?

---

# 30. UX DE PRESENTACIÓN

La aplicación debe sentirse como una experiencia, no como un sitio web.

No mostrar:

- navbar tradicional;
- footer tradicional;
- menú web convencional;
- carrito;
- contacto;
- WhatsApp;
- formularios.

Puede existir:

- indicador de progreso;
- “ADITMEX” discreto;
- número de escena;
- pequeños controles.

---

# 31. PERFORMANCE

Debe funcionar bien en Windows.

Optimizar:

- imágenes WebP/AVIF;
- lazy loading;
- compresión;
- assets locales;
- WebGL con bajo consumo;
- no usar librerías innecesarias;
- evitar renders excesivos;
- respetar `prefers-reduced-motion`.

---

# 32. ACCESSIBILITY

Implementar:

- contraste;
- navegación por teclado;
- reduced motion;
- textos alternativos;
- foco visible cuando corresponda.

---

# 33. RESPONSIVE

Prioridad:

1. pantalla de laptop Windows;
2. monitor 1080p;
3. 1440p;
4. 4K.

También debe tener fallback para navegador normal.

---

# 34. ESTRUCTURA DEL PROYECTO

Propuesta:

```text
/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── docker-compose.yml
├── Dockerfile
├── README.md
├── MP.md
├── images_prompt.md
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── scenes/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── data/
│   └── App.tsx
└── src-tauri/
    ├── tauri.conf.json
    └── ...
```

Adapta la estructura si el repositorio existente tiene otra arquitectura razonable.

---

# 35. SCRIPTS OBLIGATORIOS

Crear scripts claros para:

```bash
npm run dev
npm run build
npm run preview
npm run tauri:dev
npm run tauri:build
```

Y si es posible:

```bash
npm run package:windows
```

que ejecute la construcción final.

---

# 36. README

Crear/actualizar `README.md` con:

- requisitos;
- instalación;
- desarrollo;
- Docker;
- generación de imágenes;
- ubicación de imágenes;
- build web;
- build Tauri;
- ubicación del `.exe`;
- ubicación del `.msi`;
- ejecución offline;
- solución de problemas;
- explicación de por qué Docker no es necesario para producción.

---

# 37. SEGURIDAD DE MARCA

Nunca:

- inventar certificaciones;
- inventar laboratorios;
- inventar capacidades;
- inventar clientes;
- inventar cifras;
- afirmar exclusividad;
- afirmar “líder estatal” sin fuente;
- utilizar logos de terceros sin autorización;
- usar marcas de clientes como prueba sin respaldo.

La presentación debe hacer que ADITMEX parezca grande por la calidad de su pensamiento, no por exageraciones.

---

# 38. RESULTADO ESPERADO

Quiero que al abrir la presentación la sensación sea:

> “Esto no parece una presentación de un proveedor de materias primas.”

Debe sentirse como:

> **“Una compañía que entiende hacia dónde está evolucionando la industria alimentaria y quiere convertirse en parte de esa evolución.”**

---

# 39. FASES DE EJECUCIÓN

## FASE 1 — AUDITORÍA

No programes todavía.

Primero:

- lee los archivos;
- revisa el sitio;
- revisa `index.html`;
- analiza el repositorio;
- investiga el Consejo;
- identifica oportunidades.

Entrega en la conversación un resumen de:

- diagnóstico;
- posicionamiento;
- arquitectura narrativa;
- propuesta visual;
- tecnología.

---

## FASE 2 — PROPUESTA VISUAL WEB

Antes de construir la versión definitiva:

Crea una versión navegable en web con mocks.

Debe poder ejecutarse localmente.

Quiero revisar:

- portada;
- 3–5 escenas clave;
- estilo;
- tipografía;
- colores;
- navegación;
- animaciones;
- transición;
- 3D;
- ritmo.

NO generes todavía la versión final de producción.

Espera aprobación.

---

## FASE 3 — IMPLEMENTACIÓN COMPLETA

Después de aprobación:

- construir todas las escenas;
- integrar imágenes finales;
- integrar animaciones;
- implementar 3D;
- optimizar;
- implementar Tauri;
- implementar fullscreen;
- implementar ESC;
- probar teclado;
- probar offline.

---

## FASE 4 — QA

Realizar:

- `npm run build`
- prueba de navegación;
- prueba fullscreen;
- prueba ESC;
- prueba offline;
- prueba sin imágenes externas;
- prueba WebGL fallback;
- prueba 1080p;
- prueba 4K;
- prueba reduced motion;
- prueba Tauri.

Corregir cualquier error.

---

# 40. REGLA ESPECIAL SOBRE EL INDEX.HTML

Si existe un `index.html` en la raíz:

**NO lo reemplaces sin analizarlo primero.**

Determina:

- qué tecnología usa;
- qué estilos contiene;
- qué identidad visual contiene;
- qué elementos deben conservarse;
- qué elementos pueden reutilizarse.

Si es necesario migrar a React/Vite, hazlo de forma limpia.

Si no existe, crea la arquitectura desde cero.

---

# 41. MODELO CLAUDE RECOMENDADO

Para la construcción principal utiliza:

## Claude Opus 5

Es el modelo recomendado para la primera fase de arquitectura, razonamiento visual, investigación, diseño de interacción y construcción compleja.

Para iteraciones de implementación más rápidas puedes usar:

## Claude Sonnet 5

Sonnet 5 es una excelente opción para ciclos de coding y correcciones posteriores cuando no sea necesario utilizar el máximo nivel de razonamiento.

No uses modelos antiguos/deprecados.

---

# 42. COMANDOS

El proyecto debe quedar preparado para:

```powershell
npm install
npm run dev
```

Docker:

```powershell
docker compose up --build
```

Build web:

```powershell
npm run build
```

Desktop:

```powershell
npm run tauri:dev
```

Producción:

```powershell
npm run tauri:build
```

El resultado debe aparecer dentro de la carpeta de artefactos de Tauri, normalmente bajo:

```text
src-tauri/target/release/bundle/
```

No asumas una ruta distinta sin comprobarla.

---

# 43. IMPORTANTE SOBRE DOCKER Y .EXE

Docker se utilizará solamente para desarrollo/reproducción del entorno.

El `.exe` final NO debe arrancar Docker.

La arquitectura deseada es:

```text
DESARROLLO
Docker
   ↓
React/Vite
   ↓
Presentación

PRODUCCIÓN
React/Vite build
   ↓
Tauri
   ↓
Windows .exe / .msi
   ↓
Presentación offline
```

Si detectas que alguna parte obliga técnicamente a usar Docker en producción, DETENTE y explícame por qué antes de tomar esa decisión.

---

# 44. FRASE FINAL

La última escena debe contener una frase con fuerza, pero elegante.

Probar primero:

> **“Quien conoce lo que necesita para avanzar, deja de depender del azar.”**

Luego:

> **ADITMEX**
> **El respaldo detrás de lo que quieres desarrollar.**

No agregar botón de WhatsApp.

No agregar “cotiza ahora”.

No agregar promociones.

---

# 45. ENTREGA FINAL

Al finalizar, entrega:

1. Aplicación web completa.
2. Aplicación Tauri.
3. Dockerfile.
4. docker-compose.
5. README.
6. `images_prompt.md`.
7. Scripts npm.
8. Configuración de build Windows.
9. `.exe`.
10. `.msi` si el entorno permite generarlo.
11. Reporte breve de pruebas realizadas.
12. Lista de assets faltantes, si existe alguno.

---

# 46. CRITERIO FINAL DE CALIDAD

Antes de declarar terminado, pregúntate:

> ¿Esto parece una presentación hecha por una empresa local que vende materias primas?

Si la respuesta es sí, vuelve a diseñarla.

La respuesta correcta debe ser:

> **“Esto parece una experiencia ejecutiva de una empresa que entiende la industria y sabe cómo aportar valor.”**

Prioridad absoluta:

**claridad > impacto > confianza > elegancia > tecnología.**

La tecnología debe estar al servicio de la percepción.

No conviertas el proyecto en una demostración de efectos.

La audiencia debe recordar:

# ADITMEX

## “Cuando una empresa quiere transformar una idea en producto, necesita algo más que un proveedor. Necesita respaldo.”
