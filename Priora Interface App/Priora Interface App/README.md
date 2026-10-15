# Priora — Produto final funcional

Projeto React Native + Expo baseado no layout fornecido no Figma.

## O que está funcional
- Tela inicial com rolagem vertical.
- Menu e notificações clicáveis.
- Nova denúncia.
- Campos de título e descrição.
- Seleção de categoria.
- Seleção de foto pela galeria; câmera em dispositivo físico.
- Tela de conferência antes do envio.
- Envio da denúncia e geração de protocolo local.
- Persistência das denúncias no dispositivo com AsyncStorage.
- Minhas denúncias: Em análise / Concluído.
- Ver detalhes.
- Cancelamento de denúncia em análise.
- Menu com atividade e histórico.
- Notificações que abrem os detalhes.

## Rodar no Windows
Abra o terminal dentro da pasta que contém `package.json` e execute:

```powershell
npm.cmd install
npx.cmd expo start --web
```

Para Android/iOS:

```powershell
npx.cmd expo start
```

## Observação sobre produção real
A versão entregue funciona de ponta a ponta localmente. Para um produto com vários usuários e dados salvos em servidor, ainda é necessário conectar a API/banco de dados da prefeitura/equipe. A camada `src/services/api.js` está preparada para isso.


### Estado inicial
O aplicativo foi configurado para iniciar limpo, sem ocorrências, denúncias, notificações ou histórico. A chave local de armazenamento foi versionada para não reutilizar dados de testes anteriores.
