import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './routes/AppRoutes';

/** Gera o HTML de uma rota (usado só pelo scripts/prerender.mjs, durante o build). */
export function render(url: string, basename: string): string {
  return renderToString(
    <StaticRouter location={url} basename={basename}>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </StaticRouter>,
  );
}

export { seoPages, notFoundPage, pageUrl } from './seo/pages';
