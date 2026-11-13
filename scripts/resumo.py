#!/usr/bin/env python3
"""Gera data/resumo.json (resumo do mês atual) para o widget do Android (KWGT).
Uso: python3 scripts/resumo.py   (a partir da raiz do repositório)"""
import csv, json, os
from datetime import datetime
from zoneinfo import ZoneInfo

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(RAIZ, 'widget')  # dados do widget (atualizados sempre)
SAIDA = os.path.join(RAIZ, 'data')  # o KWGT lê data/resumo.json
CONSUMO_FOCUS = 4.35  # L/100 km
MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
         'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

def ler(nome):
    with open(os.path.join(D, nome), encoding='utf-8') as f:
        return list(csv.DictReader(f))

def num(x):
    try: return float(x)
    except (TypeError, ValueError): return 0.0

def eur(v):
    s = f"{abs(v):,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
    return ('-' if v < 0 else '') + s + ' €'

def milhar(v):
    return f"{int(round(v)):,}".replace(',', '.')

agora = datetime.now(ZoneInfo('Europe/Lisbon'))
mes = agora.strftime('%Y-%m')
fat = [r for r in ler('faturas.csv') if r['data'][:7] == mes]
gasto = sum(num(r['valor']) - min(num(r.get('gems') or 0), num(r['valor'])) for r in fat)
cash = sum(num(r['cashback']) for r in fat)
kwh = sum(num(r['kwh']) for r in fat)
pago = gasto - cash
km = next((num(r['km']) for r in ler('km.csv') if r['mes'][:7] == mes), 0.0)
odo = sorted(ler('odometro.csv'), key=lambda r: r['data'])
gas = sorted(ler('gasoleo.csv'), key=lambda r: r['data'])
preco = num(gas[-1]['preco_litro']) if gas else 0.0
focus = km / 100 * CONSUMO_FOCUS * preco if km else 0.0
poup = focus - pago if km else None

bat = sorted(ler('bateria.csv'), key=lambda r: r['data_hora']) if os.path.exists(os.path.join(D, 'bateria.csv')) else []
b = bat[-1] if bat else None

res = {
    'mes': f"{MESES[agora.month - 1]} {agora.year}",
    'gasto': eur(gasto),
    'pago': eur(pago),
    'cashback': eur(cash),
    'kwh': f"{kwh:.1f}".replace('.', ',') + ' kWh',
    'carregamentos': str(len(fat)),
    'km_mes': milhar(km) + ' km' if km else '—',
    'custo_100km': eur(pago / km * 100) if km else '—',
    'poupanca': ('+' if poup >= 0 else '') + eur(poup) if poup is not None else '—',
    'focus': eur(focus) if km else '—',
    'gasoleo_100km': eur(CONSUMO_FOCUS * preco),
    'odometro': milhar(num(odo[-1]['km'])) + ' km' if odo else '—',
    'atualizado': agora.strftime('%d/%m %H:%M'),
    'bateria_pct': int(num(b['pct'])) if b else 0,
    'bateria': f"{int(num(b['pct']))}% · {int(num(b['autonomia_km']))} km" if b else '—',
    'bateria_kwh': (f"{num(b['pct']) / 100 * 64:.1f}".replace('.', ',') + ' kWh') if b else '—',
    'bateria_quando': (b['data_hora'][8:10] + '/' + b['data_hora'][5:7] + ' ' + b['data_hora'][11:16]) if b else '—',
}
with open(os.path.join(SAIDA, 'resumo.json'), 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=1)
print(json.dumps(res, ensure_ascii=False, indent=1))
