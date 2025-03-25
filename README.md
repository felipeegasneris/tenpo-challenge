# Proyecto Tenpo

Este es un proyecto [Next.js](https://nextjs.org) iniciado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requisitos del Sistema

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Configuración del Proyecto

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd tenpo
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Iniciar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y logeate con las siguientes credenciales:
- Usuario: `test@example.com`
- Contraseña: `test123`

## Estructura del Proyecto

- `src/app`: Contiene las páginas y rutas de la aplicación.
- `src/components`: Componentes reutilizables de React.
- `src/hooks`: Hooks personalizados, incluyendo `usePokemonList`.
- `src/lib`: Utilidades y configuraciones, como la configuración de la API.
- `src/types`: Definiciones de tipos TypeScript.

## Características Principales

- Listado de Pokémon con scroll infinito.
- Diseño responsive utilizando Tailwind CSS.
- Integración con la API de Pokémon.

## Algunas Consideraciones del Challenge
- La mejor forma según mi criterio para mostrar la lista de 2000 elementos fue utilizando el scroll infinito y virtualizando los elementos que se muestran en la pantalla. eso permite que el usuario pueda ver los elementos sin tener que esperar a que se carguen todos.

- Como mejora a llamadas al backend propongo:
  1. para la autenticación de usuarios, utilizar un servicio de autenticación como Firebase o Auth0. Esto permitirá una autenticación segura y escalable.
  2.  para la capa de llamadas a API, si se quiere escalar propondria un BFF o un fedrador de graphQL. Esto permitirá escalar el consumo de las APIs a mas clientes por ejemplo una app mobile.