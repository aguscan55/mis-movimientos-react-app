# Mis Movimientos - Billetera Virtual (React Native)

Aplicación móvil tipo billetera virtual desarrollada en React Native y Expo Router, inspirada en las interfaces financieras actuales (ej: Claro Pay). Permite visualizar saldo, historial de movimientos y gestionar tarjetas vinculadas.

## Tecnologías y Dependencias
- **Framework:** React Native + Expo (SDK 51+)
- **Enrutamiento:** Expo Router
- **Iconografía:** `lucide-react-native`
- **Gestión de estado:** React Hooks (`useState`, Context API)
- **Formularios:** `react-native-mask-input` (Manejo de máscaras UX)
- **Estilos:** `StyleSheet` nativo de React Native
- **Testing E2E:** Maestro (Pruebas nativas vía ADB)

## Requisitos Previos
Para levantar este proyecto de manera local vas a necesitar:
1. [Node.js](https://nodejs.org/) (v18 o superior)
2. Gestor de paquetes: `npm`
3. Dispositivo móvil físico con Android o Emulador configurado en Android Studio.
4. ADB (Android Debug Bridge) configurado en las variables de entorno de tu PC.

---

## Instalación y Arranque del Proyecto

1. **Clonar el repositorio y acceder a la carpeta:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd mis-movimientos-react-app/parte-3-react-native/mis-movimientos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

**Opción A: Correr el emulador en Android Studio:**
1. Abrí Android Studio e iniciá tu emulador desde el Device Manager.
2. Ejecutá en la terminal: `npx expo start`, luego presioná `a`. Se va a abrir automaticamente en el emulador.

**Opción B: Correr en dispositivo físico vía ADB (Inalámbrico / Wi-Fi)**
Si querés probar la app de forma nativa en tu teléfono sin usar cables, seguí estos pasos (requiere que PC y teléfono estén en la misma red Wi-Fi):

1. En tu teléfono Android, activá las Opciones de Desarrollador y encendé la Depuración Inalámbrica.
2. Entrá a "Vincular dispositivo con código de vinculación". Te dará un código de 6 dígitos, una IP y un puerto (Ej: 192.168.1.X:11111).
3. En la terminal de tu PC, emparejá el dispositivo:
   `adb pair 192.168.1.X:11111`
   (Ingresá el código de 6 dígitos cuando la terminal lo solicite)
4. Volvé a la pantalla anterior en tu teléfono para ver el puerto de conexión definitivo (Ej: 192.168.1.X:22222). Conectate: `adb connect 192.168.1.X:22222`.
5. Levantá el servidor de Expo (limpiando la caché por seguridad):
   `npx expo start -c`
6. Presioná la tecla `a` para instalar y abrir la app en tu teléfono.

## Pruebas E2E (Maestro)

Para las pruebas End-to-End utilizamos Maestro (https://maestro.mobile.dev/). Al ser una herramienta que interactúa directamente con el sistema operativo del dispositivo móvil vía ADB, no se instala por npm, sino como un binario global en tu sistema.

### Instalación de Maestro
En tu terminal (en Windows usar Git Bash o WSL), ejecutá el siguiente comando:

curl -Ls "https://get.maestro.mobile.dev" | bash

(Es posible que debas reiniciar tu terminal luego de la instalación para que reconozca el comando maestro).

### ¿Cómo correr los tests?
1. Asegurate de tener tu emulador Android encendido o tu dispositivo físico conectado.
2. Iniciá la aplicación localmente y dejala abierta en la pantalla de tu dispositivo:

npx expo start -c

(Presioná 'a' para abrirla en Android).

3. En otra terminal, ejecutá el script de npm para lanzar la suite de pruebas:

npm run test:e2e 
(o moverse a la carpeta .maestro y correr: maestro test .maestro/inicio.yaml en git bash)
### Características Principales
- **Historial de Movimientos:** Lista optimizada con cálculo de balance dinámico y filtrado por tipo de transacción (Ingresos/Egresos).
- **Perfil de usuario**
- **Tarjetas:** Se permite al usuario agregar una tarjeta para utilizar en las compras o inversiones futuras.
---

Para la parte 1 utilicé HTML y CSS. En CSS utilicé flexbox para lograr que los elementos queden espaciados como quería, intentando simular la imagen de referencia. También definí variables en `:root` con el padding, radio y colores detallados en la imagen. HTML/CSS usan etiquetas y clases, la diferencia con React es que usa JSX y estados.
Además me va a permitir separar la UI en componentes reutilizables.

Para la parte 2 cree el proyecto utilizando Vite y copié el html usado en la parte 1, cambiando algunas partes del codigo, como pasando de `class` a `className`, pues `class` es una palabra reservada en JS. En la implementación de la parte 2 hay 3 componentes. `BalanceCard.jsx` muestra la parte del saldo de la páagina, y posee la funcionalidad de ocultarlo. `Header.jsx` es el más simple, solo muestra una barra horizontal con los botones para moverse a otras pestañas. `MovementItem.jsx` representa cada ítem en la lista de transacciones, este componente posee la lógica para convertir el formato de fecha que viene en el array (timestamp) a un formato legible. Además permite separar ingresos de egresos, cambiandole el signo al monto según sea necesario.

**Decisiones:** Use Vite para el proyecto en React porque me resulta rápido y fácil. Separé la Home en 3 componentes pequeños. 

La parte 3 requirió mucha investigación porque tuve que entender las diferencias entre React web y React Native. Encontré un video que las explicaba y sobre el cual me basé para un montón de referencias con respecto al proyecto (https://www.youtube.com/watch?v=TvieMHWkOKM&t=42s). Gracias a eso tomé la decisión de usar Expo para crear el proyecto, pudiendo ver los cambios en mi propio teléfono.

La primer diferencia entre React web y Native que noté fue por ejemplo todo el texto debe ir en `<Text>` (en este caso use `<ThemedText>` porque ya venía con Expo). Es decir utilizamos componentes nativos en lugar de tags HTML. Así que a diferencia de el pasaje de la parte 1 a la parte 2, que el código HTML era casi igual y fue reutilizable, en la parte 3 tuve que volver a escribir el código del maquetado, investigando qué componentes nativos utilizar.
Otra diferencia es que React Native no utiliza el DOM como React, porque corre sobre una aplicacion y no sobre la web.

Los Hooks como `useState` los pude dejar igual porque según lo que investigué, funcionan igual que en React.
Utilicé componentes nativos de React Native como `Pressable`, para handlear los botones.

En cuanto a decisiones, utilicé `FlatList` en lugar de `map()`, en parte porque el video decía que era lo que se usaba en Native, pero segun lo que busqué entiendo que `FlatList` esta mejor optimizado para el scroll.
También decidí utilizar `ThemedText` y `ThemedView` porque ya venían con Expo y hacian el estilo mas limpio.

Las principales dificultades se dieron en la parte 3, donde me costó entender qué se puede reutilizar de la parte web y qué tenía que reescribir en Native.
Además, me costó la lógica de mostrar/ocultar el saldo con `useState`.

### Qué mejoraría si tuviera más tiempo
- Limpiar el proyecto Expo y sacar archivos de plantilla innecesarios.
- Entender como funciona el routing en React Native, por lo que vi es distinto a React Web, utiliza Stack. No pude investigar lo suficiente cómo agregar la funcionalidad de moverse a otra ruta.
- Encontré una biblioteca para testing: `@testing-library/react-native`, pero no llegué a utilizarla. Agregaría tests luego de tener algunas otras funcionalidades.
- No agregué casi nada de accesibilidad, asi que tambien es un punto a mejorar.

Para correr el proyecto hace faltar instalar node.js y npm. Luego correr `npm start` sobre la carpeta `parte-3-react-native/mis-movimientos`.

Los componentes que cree fueron: `src/components/Header.tsx`, `src/components/movement-item.tsx`. Luego otro archivo que modifiqué fue `src/app/index.tsx`.

---

## Preguntas

**1) ¿Qué diferencias encontraste entre HTML y JSX?**
- En JSX no se usa `class`, se usa `className`.
- Se pueden escribir expresiones JavaScript dentro de `{}`.
- En JSX el HTML debe estar contenido en un solo elemento padre.

**2) ¿Qué ventajas te dio separar la pantalla en componentes?**
- Dejó el código más ordenado.
- Facilitó reutilizar partes como `MovementItem`.
- Se me hizo más simple cambiar cada sección.
- Me permitió pensar en cada bloque como una pieza independiente.

**3) ¿Diferencias de estilos?**
- En CSS uso selectores, clases y reglas globales. En React Native uso objetos JavaScript con `StyleSheet.create`.
- No hay propiedades como `margin: 0 auto` ni pseudo-clases.
- Todo es inline-style (EN RN) no existe la cascada de CSS.

**4) Por qué en React Native no existen etiquetas como div o p?**
- Porque React Native no renderiza HTML, renderiza componentes nativos. Se usan componentes específicos de mobile, no etiquetas web.

**5) ¿Cuándo elegirías renderizar una lista con map() y cuándo utilizarías FlatList?**
- Creo que se usa `map()` cuando la lista es pequeña y no necesito scrollear.
- Uso `FlatList` cuando la lista es scrollable y puede crecer, porque optimiza el renderizado y tiene mejor performance en mobile.

**6) ¿Qué parte del ejercicio requirió mayor investigación?**
- La parte 3 con React Native, tuve que investigar cómo armar la interfaz con componentes nativos en lugar de etiquetas.
- También investigué cómo funciona Expo y qué hacen `ThemedText` y `ThemedView` que venian ya por defecto cuando hice el proyecto de expo en mi pc.

Cree un `.aab`, que al parecer es solo para subir a tiendas como Play Store, y luego cree la `.apk` y la instale en el emulador y en mi celu.
Utilice expo y adb.

---
