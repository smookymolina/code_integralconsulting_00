import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        guia: resolve(__dirname, 'guia.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        recursos: resolve(__dirname, 'recursos.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        vacantes: resolve(__dirname, 'vacantes.html'),
        noticias: resolve(__dirname, 'noticias.html'),
        'casos-exito': resolve(__dirname, 'casos-exito.html'),
        preguntas: resolve(__dirname, 'preguntas.html'),
        privacidad: resolve(__dirname, 'privacidad.html'),
      },
    },
  },
});
