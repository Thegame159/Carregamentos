# Carregamentos do e-Niro

Painel dos gastos com carregamentos do Kia e-Niro.

Os dados estão em `data/`:
- `faturas.csv` — uma linha por fatura (id, data, CEME, kWh, valor, cashback)
- `km.csv` — quilómetros por mês
- `odometro.csv` — leituras do conta-quilómetros
- `gasoleo.csv` — preço médio do gasóleo simples
- `estado.json` — última atualização

## Site = painel
O `index.html` é gerado a partir do painel do artefacto, para os dois serem sempre iguais:
- `src/painel.html` — cópia exata do painel (artefacto);
- `src/cabecalho.html` — cabeçalho do site com o carregador dos ficheiros em `data/`;
- `python3 scripts/build_site.py` — gera o `index.html`.
Sempre que o painel muda, copia-se para `src/painel.html` e corre-se o script.
