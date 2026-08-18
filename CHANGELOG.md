# Changelog

Todas las modificaciones de este proyecto se documentarán en este archivo.


## [1.5.0] - 2026-08-18

### Agregado
- Integración de `Maestro` para pruebas automatizadas End-to-End (E2E) nativas.
- Primer flujo de prueba E2E (`.maestro/inicio.yaml`) para validar la navegación entre "Inicio" y "Tarjetas".

### Eliminado
- Dependencia y archivos de configuración de Cypress (bloqueado por políticas de entorno corporativo).

## [1.4.0] - 2026-08-18

### Agregado (Added)
- **Campo CVV:** Incorporación del código de seguridad en el formulario de alta de tarjetas con ocultamiento automático (`secureTextEntry`).
- **Validaciones Estrictas:** Lógica de validación robusta para habilitar el botón de guardado (16 dígitos exactos para la tarjeta, 4 para fecha de vencimiento y longitud dinámica para CVV).

### Modificado (Changed)
- **UX/UI Formulario de Tarjetas:** Refactorización integral de la pantalla `NewCardScreen`.
- Integración de la librería `react-native-mask-input` para formateo visual automático (espaciado de tarjeta y barra de fecha) mejorando la experiencia de usuario.
- Optimización del espacio en pantalla agilizando la carga al colocar "Vencimiento" y "CVV" en la misma fila mediante Flexbox.


## [1.3.0] - 2026-08-17

### Agregado (Added)
- **Storybook para React Native:** Configuración e integración completa del entorno de desarrollo de UI aislado.
  - Creación de catálogo interactivo para visualizar y probar componentes sin depender de la lógica de navegación o el estado global.
  - Implementación de historias (Stories) para `MovementItem`, simulando distintos flujos de entrada de datos (estado de ingreso y egreso).
  - Implementación de historias para `ProfileMenuItem`, validando las variantes de UI (modo normal y modo destructivo).
  - Integración de variables de entorno (`EXPO_PUBLIC_STORYBOOK`) en el _layout_ principal para habilitar o deshabilitar el catálogo de forma segura, evitando su exposición en compilaciones de producción.
- **Entorno de Pruebas E2E:** Setup inicial de Cypress configurado para testear la versión compilada en Expo Web.
  - Configuración del motor para ejecución *Headless* (sin interfaz gráfica) y creación de la estructura base de directorios.
  - Desarrollo del primer caso de prueba de integración (`inicio.cy.js`) para validar la renderización del enrutador y la presencia de la navegación principal.

### Problemas Conocidos (Known Issues)
- **Bloqueo en Ejecución Local de Cypress:** Actualmente, al intentar inicializar el motor de Cypress a nivel local, el proceso finaliza de manera prematura arrojando el código de error de salida `2147483651`. Se realizó un diagnóstico avanzado (Debug CLI) y se identificó que las políticas de seguridad locales (AppLocker / Antivirus corporativo) están bloqueando la ejecución del archivo `.exe` interno de Cypress alojado en el directorio temporal `AppData`. La configuración del código de pruebas está finalizada y es funcional, pero se requerirá solicitar excepciones al equipo de Infraestructura para habilitar su ejecución física en las máquinas del equipo.

## [1.2.0] - 2026-08-13
### Agregado
- Pantalla de Perfil (`profile.tsx`) con tarjeta de datos de usuario y opciones de configuración.
- Componente reutilizable `profile-menu-item.tsx` para listar las opciones dentro del menú de perfil.
- Ruteo mediante Tabs de Expo Router configurado en `_layout.tsx` vinculando Inicio, Movimientos, Tarjetas y Perfil.

### Modificado
- Arreglo en la visualización de la lista de movimientos en el Home. Se ajustó el Flexbox (`flex: 1`) en `index.tsx` para permitir que el FlatList ocupe el espacio correcto sobre el Tab Navigator.

### Eliminado
- Limpieza del proyecto base de Expo: se eliminaron archivos de plantilla innecesarios (`explore.tsx` y componentes UI de demostración) para mantener el repositorio limpio.

## [1.1.0] - 2026-08-05
### Agregado
- Barra de navegación inferior (Bottom Navigation Bar) en la app, basada en la UI de Claro Pay.
- Pantalla de Tarjetas (`cards/index.tsx`) con listado de tarjetas vinculadas a la cuenta.
- Formulario de creación de tarjetas (`cards/new`).
- Pestañas placeholder para futuras secciones.

### Por hacer (TODO)
- Mejorar la UX en la validación de datos del formulario de tarjetas para mostrar los errores visualmente.

## [1.0.0] - Migración a React Native (Parte 3)
### Agregado
- Inicialización del proyecto móvil utilizando Expo y React Native.
- Creación de componentes nativos (`Header.tsx`, `movement-item.tsx`).
- Generación de empaquetados `.aab` (para Play Store) y `.apk`.
- Implementación de pruebas en dispositivo físico vía ADB.

### Modificado
- Refactor completo del maquetado web (HTML) a componentes nativos (`ThemedText`, `ThemedView`, `Pressable`).
- Reemplazo de la función `map()` por `FlatList` para optimizar el rendimiento del scroll en listas de dispositivos móviles.
- Migración de estilos CSS globales a objetos `StyleSheet.create`.

## [0.2.0] - Migración a React Web (Parte 2)
### Agregado
- Inicialización del proyecto utilizando Vite.
- Separación de la UI en componentes funcionales (`BalanceCard.jsx`, `Header.jsx`, `MovementItem.jsx`).
- Lógica de estados con `useState` para mostrar u ocultar el saldo disponible.
- Lógica de parseo de timestamps a formato de fecha legible.
- Manejo condicional de UI para ingresos (montos positivos) y egresos (montos negativos).

### Modificado
- Conversión de código HTML a JSX (reemplazo de atributos `class` por `className`).

## [0.1.0] - Mockup inicial (Parte 1)
### Agregado
- Estructura base de la aplicación utilizando HTML5.
- Maquetado visual basado en la imagen de referencia.
- Implementación de Flexbox para el posicionamiento y espaciado de los elementos.
- Definición de variables globales en CSS (`:root`) para estandarizar colores, paddings y radios de bordes.