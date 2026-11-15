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

def custo_real(mes):
    """Custo por 100 km entre duas leituras de bateria (igual ao painel)."""
    lt = sorted([r for r in bat if num(r.get('pct')) > 0 and num(r.get('odometro')) > 0], key=lambda r: r['data_hora'])
    ini = mes + '-01'
    antes = [r for r in lt if r['data_hora'][:10] < ini]
    dentro = [r for r in lt if r['data_hora'][:7] == mes]
    a = antes[-1] if antes else (dentro[0] if dentro else None)
    z = dentro[-1] if dentro else None
    if not a or not z or num(z['odometro']) - num(a['odometro']) <= 0:
        return None
    da, dz = a['data_hora'][:10], z['data_hora'][:10]
    todas = ler('faturas.csv')
    ef = lambda r: num(r['valor']) - min(num(r.get('gems') or 0), num(r['valor']))
    fs = [r for r in todas if da < r['data'] < dz]
    pg = sum(ef(r) - num(r['cashback']) for r in fs)
    kw = sum(num(r['kwh']) for r in fs)
    if kw > 0:
        pref = pg / kw
    else:
        ult = [r for r in todas if r['data'] <= dz][-15:]
        kp = sum(num(r['kwh']) * (ef(r) / num(r['valor']) if num(r['valor']) else 1) for r in ult)
        pref = sum(ef(r) - num(r['cashback']) for r in ult) / kp if kp else 0
    delta = (num(z['pct']) - num(a['pct'])) / 100 * 64
    return (pg - delta * pref) / (num(z['odometro']) - num(a['odometro'])) * 100

cr = custo_real(mes)

res = {
    'mes': f"{MESES[agora.month - 1]} {agora.year}",
    'gasto': eur(gasto),
    'pago': eur(pago),
    'cashback': eur(cash),
    'kwh': f"{kwh:.1f}".replace('.', ',') + ' kWh',
    'carregamentos': str(len(fat)),
    'km_mes': milhar(km) + ' km' if km else '—',
    'custo_100km': eur(cr) if cr is not None else (eur(pago / km * 100) if km else '—'),
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
