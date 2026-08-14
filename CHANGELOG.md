# Changelog

Todas las modificaciones de este proyecto se documentarán en este archivo.

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