# PRIORA Web — versão ajustada à documentação

Versão sem dados fictícios, com os principais estados e terminologia da documentação fornecida.

Ajustes incluídos:
- login PRIORA;
- estado de Área administrativa / Sou Gov.br;
- listagem, busca, filtros e ordenação;
- cards de indicadores;
- detalhes da denúncia na ordem da documentação;
- modal de confirmação de envio;
- integração exclusivamente via API;
- nenhum dado de demonstração embutido.

A API continua definida por `VITE_API_URL`.

Endpoints previstos:
- POST `/auth/login`
- POST `/auth/admin/login`
- GET `/denuncias`
- GET `/denuncias/stats`
- POST `/denuncias/:id/resposta`
