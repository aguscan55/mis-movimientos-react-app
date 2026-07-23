# mis-movimientos-react-app
Mockup practica para HTML + CSS, React y React Native.

Para la parte 1 utilicé HTML y CSS. En CSS utilicé flexbox para lograr que los elementos queden espaciados como quería, intentando simular la imagen de referencia. También definí variables en :root con el padding, radio y colores detallados en la imagen. HTML/CSS usan etiquetas y clases, la diferencia con React es que usa JSX y estados.
Además me va a permitir separar la UI en componentes reutilizables.

Para la parte 2 cree el proyecto utilizando Vite y copié el html usado en la parte 1, cambiando algunas partes del codigo, como pasando de class a className, pues class es una palabra reservada en JS. En la implementación de la parte 2 hay 3 componentes. BalanceCard.jsx muestra la parte del saldo de la páagina, y posee la funcionalidad de ocultarlo. Header.jsx es el más simple, solo muestra una barra horizontal con los botones para moverse a otras pestañas. MovementItem.jsx representa cada ítem en la lista de transacciones, este componente posee la lógica para convertir el formato de fecha que viene en el array (timestamp) a un formato legible. Además permite separar ingresos de egresos, cambiandole el signo al monto según sea necesario.

Decisiones: Use Vite para el proyecto en React porque me resulta rápido y fácil. Separé la Home en 3 componentes pequeños. 

La parte 3 requirió mucha investigación porque tuve que entender las diferencias entre React web y React Native. Encontré un video que las explicaba y sobre el cual me basé para hacer un montón de referencias con respecto al proyecto (https://www.youtube.com/watch?v=TvieMHWkOKM&t=42s). Gracias a eso tomé la decisión de usar Expo para crear el proyecto, pudiendo ver los cambios en mi propio teléfono.

La primer diferencia entre React web y Native que noté fue por ejemplo todo el texto debe ir en <Text> (en este caso use <ThemedText> porque ya venía con Expo). Es decir utilizamos componentes nativos en lugar de tags HTML. Así que a diferencia de el pasaje de la parte 1 a la parte 2, que el código HTML era casi igual y fue reutilizable, en la parte 3 tuve que volver a escribir el código del maquetado, investigando qué componentes nativos utilizar.
Otra diferencia es que React Native no utiliza el DOM como React, porque corre sobre una aplicacion y no sobre la web.

Los Hooks como UseState los pude dejar igual porque según lo que investigué, funcionan igual que en React.
Utilicé componentes nativos de React Native como Pressable, para handlear los botones.

En cuanto a decisiones, utilicé FlatList en lugar de map, en parte porque el video decía que era lo que se usaba en Native, pero segun lo que busqué entiendo que FlatList esta mejor optimizado para el scroll.
También decidí utilizar ThemedText y ThemedView porque ya venían con Expo y hacian el estilo mas limpio.

Las principales dificultades se dieron en la parte 3, donde me costó entender qué se puede reutilizar de la parte web y qué tenía que reescribir en Native.
Además, me costó la lógica de mostrar/ocultar el saldo con useState.


        ########### Qué mejoraría si tuviera más tiempo #############
Limpiar el proyecto Expo y sacar archivos de plantilla innecesarios.
Entender como funciona el routing en React Native, por lo que vi es distinto a React Web, utiliza Stack. No pude investigar lo suficiente cómo agregar la funcionalidad de moverse a otra ruta.
No agregué casi nada de accesibilidad, asi que tambien es un punto a mejorar.


