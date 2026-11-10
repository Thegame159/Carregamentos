"""Gera index.html (site público) a partir do painel do artefacto.

src/painel.html  -> cópia exata do painel (files/index.html do artefacto)
src/cabecalho.html -> <head> do site com o substituto do runtime `dash`
O site fica sempre igual ao artefacto: só muda a forma de carregar os dados (data/*.csv).
"""
from pathlib import Path
raiz = Path(__file__).resolve().parent.parent
cab = (raiz / 'src/cabecalho.html').read_text()
painel = (raiz / 'src/painel.html').read_text()
html = (cab + '<body>\n<div id="dash-root">\n' + painel +
        '\n<p class="ev-foot">Dados das faturas de carregamento · atualizado automaticamente</p>\n'
        '</div>\n<script>dash.start();</script>\n</body>\n</html>\n')
(raiz / 'index.html').write_text(html)
print('index.html gerado', len(html), 'bytes')
