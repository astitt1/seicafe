# React + Vite SEI-Cafe

## Instructor Notes

### Env Variables

- Create and .env file and create the variables "DATABASE_URL" & "SECRET"

### CRA --> Vite (All breaking changes)

1. All of the backend files need to have the ".cjs" extension so vite knows to run as common JS. (All the imports must be changed too)
2. All component files must have the ".jsx" extension (All the imports must be changed too)
3. Vite outputs all of its build contents in the "dist" folder so the server will have these modifications. (code below is not in order)

```js
  app.use(favicon(path.join(__dirname, 'dist', 'vite.svg')));
  app.use(express.static(path.join(__dirname, 'dist')));
...
...
...
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
```

4. Vite defines the server proxy in the vite.config.js file. The following code makes the proxy.

```js
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
```

5. The dev script I made to run both frontend and backend easily. Uses concurrently

```js
"script": {
  ...
  "dev": "concurrently \"nodemon server.cjs\" \"vite\"",
  ...
}

```
