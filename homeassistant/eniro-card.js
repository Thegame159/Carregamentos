/* Cartão e-Niro para o Home Assistant.
   Copiar para /config/www/eniro/ junto com eniro.webp e registar /local/eniro/eniro-card.js como Módulo JavaScript. */
(function () {
  var CSS = `
:host{display:block}
*{box-sizing:border-box}
ha-card{overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.08);
  background:radial-gradient(34rem 18rem at 50% 9rem,rgba(26,158,134,.24),transparent 70%),
  radial-gradient(26rem 20rem at 95% 85%,rgba(90,70,140,.18),transparent 70%),#08121B;color:#F2F5F7;
  font-family:var(--ha-font-family-body,var(--paper-font-body1_-_font-family,system-ui,sans-serif))}
.w{padding:20px 20px 18px;display:flex;flex-direction:column;gap:18px}
p{margin:0}
.top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.brand{font-size:1.35rem;font-weight:600;letter-spacing:.02em}
.brand small{display:block;font-size:.72rem;font-weight:400;color:#8D99A6;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
.chip{display:inline-flex;align-items:center;gap:8px;font-size:.78rem;color:#c9d3da;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:6px 12px;white-space:nowrap}
.dot{width:8px;height:8px;border-radius:50%;background:#8D99A6}
.plug .dot{background:#8DC63F}
.chg .dot{background:#5FE3D0;animation:beat 1.6s infinite}
.car{position:relative;width:min(100%,460px);align-self:center;margin:-4px 0 0}
.car::before{content:"";position:absolute;inset:4% -4% 14%;background:radial-gradient(closest-side,rgba(26,158,134,.45),transparent);filter:blur(16px);transition:background .6s}
.chg .car::before{background:radial-gradient(closest-side,rgba(95,227,208,.6),transparent);animation:glow 2.4s ease-in-out infinite}
.car::after{content:"";position:absolute;left:10%;right:8%;bottom:2%;height:10%;background:radial-gradient(closest-side,rgba(0,0,0,.8),transparent);filter:blur(6px)}
.car img{position:relative;z-index:1;display:block;width:100%;height:auto;filter:drop-shadow(0 10px 18px rgba(0,0,0,.45))}
.hero{display:grid;justify-items:center;text-align:center;gap:8px;margin-top:-6px}
.big{font-size:4.2rem;font-weight:500;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.big span{font-size:.38em;vertical-align:.95em;margin-left:.1em;color:#c9d3da}
.sub{font-size:1.15rem;color:#F2F5F7;font-variant-numeric:tabular-nums}
.sub i{font-style:normal;color:#8D99A6;margin:0 .45em}
.mrow{display:flex;align-items:center;gap:12px;width:min(20rem,88%);margin:6px 0 4px;padding-left:30px}
.meter{position:relative;flex:1;height:10px;background:rgba(255,255,255,.16);clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)}
.bolt{width:24px;height:24px;flex:none;fill:#5f6b77;transition:fill .4s}
.chg .bolt{fill:#5FE3D0;filter:drop-shadow(0 0 6px rgba(95,227,208,.8));animation:glow 1.6s ease-in-out infinite}
.plug .bolt{fill:#8DC63F}
.fill{position:absolute;inset:0 auto 0 0;width:0;background:#8DC63F;box-shadow:0 0 14px rgba(141,198,63,.65);overflow:hidden;transition:width .9s cubic-bezier(.2,.8,.2,1)}
.chg .fill{background:#5FE3D0;box-shadow:0 0 16px rgba(95,227,208,.7)}
.fill::after{content:"";position:absolute;inset:0;opacity:0;background:repeating-linear-gradient(110deg,transparent 0 12px,rgba(255,255,255,.45) 12px 20px);background-size:40px 100%}
.chg .fill::after{opacity:1;animation:flow 1s linear infinite}
.low .fill{background:#F5A623;box-shadow:0 0 14px rgba(245,166,35,.6)}
.tick{position:absolute;top:0;bottom:0;width:2px;background:rgba(255,255,255,.9);transform:translateX(-1px);font-size:0}
.tick b{position:absolute;top:22px;left:50%;transform:translateX(-50%);font-size:.66rem;font-weight:500;color:#aab6c0;white-space:nowrap}
.sess{display:flex;flex-direction:column;gap:10px;padding:14px 16px;border-radius:16px;border:1px solid rgba(95,227,208,.3);background:linear-gradient(160deg,rgba(95,227,208,.1),rgba(20,31,41,.6) 65%)}
.sess[hidden]{display:none}
.sh{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.sh p{font-size:.74rem;color:#8D99A6;letter-spacing:.08em;text-transform:uppercase}
.sh span{font-size:.74rem;color:#aab6c0;white-space:nowrap}
.sg{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:8px}
.sg b{display:block;font-size:1.2rem;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.sg div:first-child b{color:#5FE3D0}
.sg small{font-size:.7rem;color:#8D99A6}
.sr{display:flex;gap:16px;font-size:.8rem;color:#8D99A6}
.sr b{color:#F2F5F7;font-weight:600;margin-left:4px}
.sn{font-size:.76rem;color:#8DC63F}
.sess.drop{border-color:rgba(245,166,35,.55);background:linear-gradient(160deg,rgba(245,166,35,.12),rgba(20,31,41,.6) 65%)}
.sess.drop .sn{color:#F5A623}
.alerts{display:flex;flex-direction:column;gap:6px;margin-top:-4px}
.alerts[hidden]{display:none}
.alerts .a{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;border:1px solid rgba(245,166,35,.55);background:linear-gradient(160deg,rgba(245,166,35,.16),rgba(20,31,41,.6) 70%);font-size:.86rem;font-weight:500;color:#F8C46A;cursor:pointer}
.alerts .a svg{width:18px;height:18px;flex:none;fill:none;stroke:#F5A623;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.live{display:none;grid-template-columns:repeat(3,1fr);gap:8px;border:1px solid rgba(95,227,208,.35);border-radius:16px;padding:12px 10px;background:linear-gradient(160deg,rgba(95,227,208,.12),rgba(20,31,41,.5) 65%)}
.chg .live{display:grid}
.live div{text-align:center}
.live p{font-size:.7rem;color:#8D99A6;text-transform:uppercase;letter-spacing:.08em}
.live b{display:block;font-size:1.15rem;font-weight:600;margin-top:3px;font-variant-numeric:tabular-nums}
.live b.c{color:#5FE3D0}
.spark{border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:12px 14px 8px;background:rgba(20,31,41,.55)}
.spark .h{display:flex;justify-content:space-between;font-size:.74rem;color:#8D99A6;letter-spacing:.06em;text-transform:uppercase}
.spark svg{display:block;width:100%;height:64px;margin-top:6px}
.spark .ax{display:flex;justify-content:space-between;font-size:.66rem;color:#6f7c88;margin-top:2px}
.tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.cons{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.t.c{border-color:rgba(141,198,63,.35);background:linear-gradient(160deg,rgba(141,198,63,.12),#141F29 65%)}
.t.c b{font-size:1.5rem;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.t.c b i{font-style:normal;font-size:.72rem;font-weight:500;color:#aab6c0;margin-left:4px}
.t.c small{font-size:.7rem;color:#8D99A6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:-2px}
.foot{align-items:center;gap:6px}
.foot svg{flex:none;width:14px;height:14px;fill:none;stroke:#6f7c88;stroke-width:1.8;stroke-linecap:round}
.t{display:flex;flex-direction:column;gap:6px;padding:12px;border-radius:16px;background:#141F29;border:1px solid rgba(255,255,255,.07);cursor:pointer;min-width:0;transition:border-color .2s}
.t:hover{border-color:rgba(255,255,255,.2)}
.t svg{width:20px;height:20px;fill:none;stroke:#8DC63F;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.t p{font-size:.7rem;color:#8D99A6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.t b{font-size:.92rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.t.al{border-color:rgba(245,166,35,.55);background:linear-gradient(160deg,rgba(245,166,35,.14),#141F29 60%)}
.t.al svg{stroke:#F5A623}
.t.al b{color:#F5A623}
.t.dim svg{stroke:#5f6b77}
.foot{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:.72rem;color:#6f7c88}
.fu{display:inline-flex;align-items:center;gap:6px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rf{flex:none;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:.78rem;font-weight:500;color:#c9d3da;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:6px 12px;cursor:pointer;transition:background .2s,border-color .2s,color .2s}
.rf:hover{background:rgba(255,255,255,.1)}
.rf svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.rf.ask{color:#F5A623;border-color:rgba(245,166,35,.6);background:rgba(245,166,35,.12)}
.rf.busy{color:#5FE3D0;border-color:rgba(95,227,208,.5);pointer-events:none}
.rf.busy svg{animation:spin 1s linear infinite}
.rf.ok{color:#8DC63F;border-color:rgba(141,198,63,.5)}
.pc{margin-left:auto;font-size:.7rem;color:#6f7c88;white-space:nowrap;font-variant-numeric:tabular-nums}
.pc.alto{color:#F5A623}
.rf.wait{color:#6f7c88;border-color:rgba(255,255,255,.08);background:transparent;cursor:default}
@keyframes spin{to{transform:rotate(360deg)}}
.mes{display:none;flex-direction:column;gap:8px}
.tem-dados .mes{display:flex}
.mh{display:flex;justify-content:space-between;align-items:baseline;margin:4px 2px 0}
.mh p{font-size:.74rem;color:#8D99A6;letter-spacing:.08em;text-transform:uppercase}
.mh span{font-size:.68rem;color:#6f7c88}
.pago{display:grid;grid-template-columns:1fr auto;align-items:end;gap:10px;padding:14px 16px;border-radius:16px;background:#141F29;border:1px solid rgba(255,255,255,.07)}
.pago .l{font-size:.72rem;color:#8D99A6}
.pago .v{font-size:2rem;font-weight:500;line-height:1.1;letter-spacing:-.01em;font-variant-numeric:tabular-nums;margin-top:2px}
.pago .d{font-size:.78rem;color:#8D99A6;margin-top:4px}
.pago .d b{color:#8DC63F;font-weight:600}
.pago .k{text-align:right;font-size:.78rem;color:#8D99A6;line-height:1.6}
.pago .k b{color:#F2F5F7;font-weight:600;font-variant-numeric:tabular-nums}
.poup{padding:14px 16px;border-radius:16px;border:1px solid rgba(141,198,63,.55);background:linear-gradient(160deg,rgba(141,198,63,.14),rgba(20,31,41,.6) 60%)}
.poup .top2{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.poup .l{font-size:.72rem;color:#8D99A6}
.poup .v{font-size:1.6rem;font-weight:600;color:#8DC63F;font-variant-numeric:tabular-nums}
.cmp{display:grid;gap:7px;margin-top:10px}
.cmp div{display:grid;grid-template-columns:62px 1fr 64px;align-items:center;gap:8px;font-size:.74rem;color:#aab6c0}
.cmp i{display:block;height:6px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden}
.cmp i u{display:block;height:100%;border-radius:3px;transition:width .9s cubic-bezier(.2,.8,.2,1)}
.cmp .e u{background:#8DC63F;box-shadow:0 0 8px rgba(141,198,63,.6)}
.cmp .g u{background:#F5A623}
.cmp b{text-align:right;color:#F2F5F7;font-weight:600;font-variant-numeric:tabular-nums}
.cmp small{grid-column:1/-1;font-size:.68rem;color:#6f7c88}
@media (max-width:380px){.big{font-size:3.4rem}}
@keyframes beat{0%{box-shadow:0 0 0 0 rgba(95,227,208,.8)}70%{box-shadow:0 0 0 8px rgba(95,227,208,0)}}
@keyframes glow{50%{opacity:.55}}
.lt{position:absolute;z-index:2;pointer-events:none;opacity:0;border-radius:50%}
svg.lt{inset:0;width:100%;height:100%;border-radius:0;overflow:visible}
.head{background:radial-gradient(closest-side,#fff 0%,#fff 35%,rgba(255,255,255,.75) 60%,rgba(255,255,255,0) 100%);box-shadow:0 0 16px 6px rgba(255,255,255,.85),0 0 42px 14px rgba(255,255,255,.4)}
.head::after{content:"";position:absolute;left:50%;top:50%;width:300%;height:12%;transform:translate(-50%,-50%);border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.95),transparent)}
.turn{background:radial-gradient(closest-side,#fff6cc 0%,#ffb21e 40%,rgba(255,120,0,.9) 70%,transparent);box-shadow:0 0 16px 6px rgba(255,160,20,.95),0 0 40px 14px rgba(255,120,0,.6)}
.beam{z-index:0;left:-10%;top:58%;width:60%;height:38%;border-radius:0;background:radial-gradient(ellipse at 72% 28%,rgba(255,255,255,.45),rgba(255,255,255,.12) 40%,transparent 70%);filter:blur(8px)}
@media (prefers-reduced-motion:no-preference){
.intro .car img{animation:carIn .9s cubic-bezier(.2,.8,.2,1) both,dim 5.5s ease-in-out 1s both}
.intro .car::before{animation:fadeIn 1.4s ease both}
.intro .turn{animation:blink 1.4s linear .6s 1 both}
.intro .head,.intro .beam{animation:lamp 5.5s ease-in-out 1s 1 both}
.intro .drl{animation:lamp 5.5s ease-in-out .9s 1 both}
.chg .drl{animation:breathe 3.2s ease-in-out infinite}
.intro .big{animation:fadeUp .6s ease .2s both}
.intro .mrow,.intro .sub{animation:fadeUp .6s ease .35s both}
.intro .spark,.intro .sess,.intro .alerts{animation:fadeUp .6s ease .5s both}
.intro .cons .t{animation:fadeUp .55s ease both}
.intro .cons .t:nth-child(1){animation-delay:.6s}.intro .cons .t:nth-child(2){animation-delay:.68s}
.intro .tiles .t{animation:fadeUp .55s ease both}
.intro .tiles .t:nth-child(1){animation-delay:.76s}.intro .tiles .t:nth-child(2){animation-delay:.82s}
.intro .tiles .t:nth-child(3){animation-delay:.88s}.intro .tiles .t:nth-child(4){animation-delay:.94s}
.fill{transition:width 3.2s cubic-bezier(.25,.6,.3,1)}
}
@keyframes carIn{from{opacity:0;transform:translateX(28px) scale(.97)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes blink{0%,8%{opacity:0}12%,26%{opacity:1}32%,42%{opacity:0}46%,60%{opacity:1}66%,100%{opacity:0}}
@keyframes lamp{0%{opacity:0}12%,75%{opacity:1}100%{opacity:0}}
@keyframes dim{0%,100%{filter:drop-shadow(0 10px 18px rgba(0,0,0,.45)) brightness(1)}14%,72%{filter:drop-shadow(0 10px 18px rgba(0,0,0,.45)) brightness(.62) saturate(.9)}}
@keyframes breathe{0%,100%{opacity:.25}50%{opacity:.9}}

@keyframes flow{to{background-position:40px 0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;

  var IC = {
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    tyre: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5"/>',
    bat: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V5M17 7V5M7 13h3M15.5 11.5v3M14 13h3"/>',
    road: '<path d="M5 21 9 3M19 21 15 3M12 6v2M12 11v2M12 16v2"/>',
    fan: '<path d="M12 12c0-4 1-8 4-8 2 0 3 2 1.5 4S12 12 12 12zM12 12c4 0 8 1 8 4 0 2-2 3-4 1.5S12 12 12 12zM12 12c0 4-1 8-4 8-2 0-3-2-1.5-4S12 12 12 12zM12 12c-4 0-8-1-8-4 0-2 2-3 4-1.5S12 12 12 12z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1"/>',
    leaf: '<path d="M5 19c10 0 14-6 14-15C9 4 5 9 5 19zM5 19l6-6"/>'
  };
  var NAMES = { door_fl: 'frente esq.', door_fr: 'frente dir.', door_rl: 'trás esq.', door_rr: 'trás dir.', trunk: 'mala', hood: 'capô' };

  function defaults(p) {
    return {
      soc: 'sensor.' + p + '_ev_battery_level', range: 'sensor.' + p + '_ev_range',
      charging: 'binary_sensor.' + p + '_ev_battery_charge', plugged: 'binary_sensor.' + p + '_ev_battery_plug',
      limit: 'number.' + p + '_ac_charging_limit', dc_limit: 'number.' + p + '_dc_charging_limit', power: 'sensor.' + p + '_ev_charging_power',
      time_left: 'sensor.' + p + '_estimated_charge_duration', locked: 'lock.' + p + '_door_lock',
      tyres: 'binary_sensor.' + p + '_tire_pressure_all', aux: 'sensor.' + p + '_car_battery_level',
      auto_cut: 'binary_sensor.' + p + '_auto_cut_battery_pre_warning', key: 'binary_sensor.' + p + '_smart_key_battery_warning',
      odometer: 'sensor.' + p + '_odometer', climate: 'climate.' + p + '_climate_control',
      updated: 'sensor.' + p + '_last_updated_at', refresh: 'button.' + p + '_force_refresh', pedidos: 'counter.eniro_pedidos_hoje',
      cons30: 'sensor.' + p + '_30_day_average_energy_consumption', today: 'sensor.' + p + '_today_s_daily_driving_stats',
      door_fl: 'binary_sensor.' + p + '_front_left_door', door_fr: 'binary_sensor.' + p + '_front_right_door',
      door_rl: 'binary_sensor.' + p + '_back_left_door', door_rr: 'binary_sensor.' + p + '_back_right_door',
      trunk: 'binary_sensor.' + p + '_trunk', hood: 'binary_sensor.' + p + '_hood'
    };
  }
  function fmtN(n, d) { return Number(n).toLocaleString('pt-PT', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0, useGrouping: true }).replace(/[\u00a0\u202f ]/g, '.'); }
  function ago(t) {
    var m = Math.round((Date.now() - t) / 60000);
    if (isNaN(m)) return '—';
    if (m < 1) return 'agora';
    if (m < 60) return 'há ' + m + ' min';
    var h = Math.round(m / 60); if (h < 48) return 'há ' + h + ' h';
    return 'há ' + Math.round(h / 24) + ' dias';
  }

  class ENiroCard extends HTMLElement {
    setConfig(c) {
      c = c || {};
      var e = defaults(c.prefix || 'garagem_e_niro');
      Object.keys(c.entities || {}).forEach(function (k) { e[k] = c.entities[k]; });
      this.c = c; this.e = e;
      this.r = this.shadowRoot || this.attachShadow({ mode: 'open' });
      var tile = function (k, ic, label) { return '<div class="t" data-k="' + k + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[ic] + '</svg><p>' + label + '</p><b data-v="' + k + '">—</b></div>'; };
      this.r.innerHTML = '<style>' + CSS + '</style><ha-card><div class="w root">' +
        '<div class="top"><p class="brand">' + (c.name || 'e-Niro') + '<small>' + (c.subtitle || 'Kia · 64 kWh') + '</small></p>' +
        '<span class="chip"><span class="dot"></span><span data-v="state">Estacionado</span></span></div>' +
        '<div class="car"><img alt="" src="' + (c.image || '/local/eniro/eniro.webp') + '">' +
        (c.lights === false ? '' :
        '<span class="lt head" style="left:38.2%;top:51.4%;width:12%;height:7%;transform:translate(-50%,-50%) rotate(-17deg)"></span>' +
        '<svg class="lt drl" viewBox="0 0 952 476" preserveAspectRatio="none"><defs><filter id="enGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter></defs>' +
        '<g stroke="#fff" stroke-linecap="round" fill="none"><path d="M342 324 L326 342 M322 357 L352 383" stroke-width="14" opacity=".7" filter="url(#enGlow)"/><path d="M342 324 L326 342 M322 357 L352 383" stroke-width="6"/></g></svg>' +
        '<span class="lt turn" style="left:61.8%;top:39.6%;width:6%;height:3%;transform:translate(-50%,-50%) rotate(-4deg)"></span>' +
        '<span class="lt turn" style="left:32.9%;top:55%;width:3.7%;height:4%;transform:translate(-50%,-50%)"></span>' +
        '<span class="lt beam"></span>') + '</div>' +
        '<div class="hero"><p class="big"><b data-v="soc" style="font-weight:500">—</b><span>%</span></p>' +
        '<div class="mrow"><div class="meter"><div class="fill"></div><div class="tick" data-v="limtxt"></div></div>' +
        '<svg class="bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg></div>' +
        '<p class="sub"><span data-v="range">—</span><i>/</i><span data-v="odo">—</span></p></div>' +
        '<div class="alerts" hidden></div>' +
        '<div class="live"><div><p>Potência</p><b class="c" data-v="power">—</b></div><div><p>Falta</p><b data-v="left">—</b></div><div><p>Pronto às</p><b data-v="eta">—</b></div></div>' +
        '<div class="spark"><div class="h"><span>Bateria · 24 h</span><span data-v="delta"></span></div>' +
        '<svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DC63F" stop-opacity=".35"/><stop offset="1" stop-color="#8DC63F" stop-opacity="0"/></linearGradient></defs>' +
        '<path class="area" fill="url(#g)" d=""/><path class="line" fill="none" stroke="#8DC63F" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" d=""/></svg>' +
        '<div class="ax"><span>-24 h</span><span>-12 h</span><span>agora</span></div></div>' +
        '<div class="mes"><div class="mh"><p data-v="r_mes">Este mês</p><span data-v="r_atual"></span></div>' +
        '<div class="pago"><div><p class="l">Pago na prática</p><p class="v" data-v="r_pago">—</p><p class="d"><span data-v="r_gasto">—</span> · <b data-v="r_cash">—</b> cashback</p></div>' +
        '<div class="k"><b data-v="r_kwh">—</b><br><b data-v="r_n">—</b> carregamentos<br><b data-v="r_km">—</b></div></div>' +
        '<div class="poup"><div class="top2"><p class="l">Poupança vs gasóleo</p><p class="v" data-v="r_poup">—</p></div>' +
        '<div class="cmp"><div class="e"><span>Elétrico</span><i><u data-w="e"></u></i><b data-v="r_e100">—</b></div>' +
        '<div class="g"><span>Focus</span><i><u data-w="g"></u></i><b data-v="r_g100">—</b></div>' +
        '<small>Custo por 100 km · no Focus o mês teria custado <span data-v="r_focus">—</span></small></div></div></div>' +
        '<div class="sess" hidden><div class="sh"><p>Último carregamento</p><span data-v="s_quando"></span></div>' +
        '<div class="sg"><div><b data-v="s_kwh">—</b><small data-v="s_pct"></small></div><div><b data-v="s_dur">—</b><small>duração</small></div><div><b data-v="s_avg">—</b><small>média</small></div></div>' +
        '<div class="sr"><span>Mín. <b data-v="s_min">—</b></span><span>Máx. <b data-v="s_max">—</b></span></div><p class="sn" data-v="s_nota"></p></div>' +
        '<div class="cons">' +
        '<div class="t c" data-k="cons30"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC.gauge + '</svg><p>Consumo médio · 30 dias</p><b><span data-v="cons30">—</span><i data-v="cons30u"></i></b><small data-v="cons30b"></small></div>' +
        '<div class="t c" data-k="today"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC.leaf + '</svg><p>Hoje</p><b><span data-v="today">—</span><i data-v="todayu"></i></b><small data-v="todayb"></small></div></div>' +
        '<div class="tiles">' + tile('locked', 'lock', 'Portas') + tile('aux', 'bat', 'Bateria 12 V') +
        tile('kwh', 'bolt', 'Energia na bateria') + tile('climate', 'fan', 'Climatização') + '</div>' +
        '<div class="foot"><span class="fu"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC.clock + '</svg>Dados do carro <span data-v="updated">—</span></span>' +
        '<span class="pc" data-v="pc"></span><button class="rf" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg><span data-v="rf">Atualizar</span></button></div>' +
        '</div></ha-card>';
      var self = this;
      var rf = this.r.querySelector('.rf');
      rf.addEventListener('click', function () { self.refresh(); });
      clearInterval(this._rfi); this._rfi = setInterval(function () { self.rfState(); }, 30000);
      this.r.querySelectorAll('.t').forEach(function (t) {
        t.addEventListener('click', function () {
          var id = self.e[t.getAttribute('data-k')];
          if (!id) return;
          var ev = new Event('hass-more-info', { bubbles: true, composed: true }); ev.detail = { entityId: id }; self.dispatchEvent(ev);
        });
      });
      if (this._h) this.u();
    }
    set hass(h) { this._h = h; if (this.r) this.u(); }
    getCardSize() { return 9; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }
    s(k) { var id = this.e[k], st = id && this._h.states[id]; return st && st.state !== 'unavailable' && st.state !== 'unknown' ? st : null; }
    on(k) { var st = this.s(k); return !!st && ['on', 'open', 'true'].indexOf(st.state) > -1; }
    num(k) { var st = this.s(k); var n = st ? Number(st.state) : NaN; return isNaN(n) ? null : n; }
    // o e-Niro não envia a potência: estima-se pelo tempo que falta (calculado pelo próprio carro)
    estima(soc, min) {
      if (soc == null || !(min > 0)) return null;
      var cap = this.c.capacity || 64, ac = this.num('limit'), dc = this.num('dc_limit');
      if (ac == null) ac = 100; if (dc == null) dc = 80;
      var p = ac > soc ? (ac - soc) / 100 * cap / (min / 60) : null;
      if ((p == null || p > 11) && dc > soc) p = (dc - soc) / 100 * cap / (min / 60);
      return p == null || p <= 0 || p > 250 ? null : Math.round(p * 10) / 10;
    }
    set(k, v) { var el = this.r.querySelector('[data-v=' + k + ']'); if (el) el.textContent = v; }
    hist() {
      var self = this, e = this.e;
      if (!this._h.callWS || (this._hq && Date.now() - this._hq < 6e5)) return;
      this._hq = Date.now();
      var end = new Date(), start = new Date(end - 7 * 864e5);
      var ids = [e.soc, e.charging, e.power, e.time_left].filter(Boolean);
      this._h.callWS({ type: 'history/history_during_period', start_time: start.toISOString(), end_time: end.toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false }).then(function (res) {
        var rd = function (id, num) {
          return ((res && res[id]) || []).map(function (x) {
            var t = x.lu !== undefined ? x.lu * 1000 : Date.parse(x.last_changed || x.last_updated);
            var v = x.s !== undefined ? x.s : x.state;
            return [t, num ? Number(v) : v];
          }).filter(function (q) { return !isNaN(q[0]) && (!num || !isNaN(q[1])); });
        };
        var soc = rd(e.soc, true), t0 = Date.now() - 864e5, before = soc.filter(function (q) { return q[0] < t0; });
        self._pts = (before.length ? [before[before.length - 1]] : []).concat(soc.filter(function (q) { return q[0] >= t0; }));
        self._sess = self.lastSession(rd(e.charging, false), soc, rd(e.power, true), rd(e.time_left, true));
        self.drawSpark(); self.drawSession();
      }).catch(function () {});
    }
    // último carregamento terminado: do primeiro "on" ao "off" seguinte
    lastSession(chg, soc, pw, tl) {
      var s = null, e = null;
      for (var i = chg.length - 1; i >= 0; i--) {
        if (chg[i][1] === 'off' && e == null && i > 0 && chg[i - 1][1] === 'on') e = chg[i][0];
        else if (e != null && chg[i][1] === 'on' && (i === 0 || chg[i - 1][1] !== 'on')) { s = chg[i][0]; break; }
      }
      if (s == null || e == null) return null;
      var at = function (arr, t) { var v = null; arr.forEach(function (q) { if (q[0] <= t) v = q[1]; }); return v; };
      var s0 = at(soc, s), after = soc.filter(function (q) { return q[0] >= e && q[0] <= e + 3 * 36e5; });
      var s1 = after.length ? after[after.length - 1][1] : at(soc, e);
      var ps = pw.filter(function (q) { return q[0] >= s && q[0] <= e && q[1] > 0.3; }).map(function (q) { return q[1]; }), self = this, est = false;
      if (!ps.length && tl) {
        ps = tl.filter(function (q) { return q[0] >= s && q[0] < e && q[1] >= 10; }).map(function (q) { return self.estima(at(soc, q[0]), q[1]); }).filter(function (x) { return x != null; });
        est = ps.length > 0;
      }
      var cap = this.c.capacity || 64, kwh = (s0 != null && s1 != null) ? Math.max(0, (s1 - s0) / 100 * cap) : null;
      var h = (e - s) / 36e5;
      return { s: s, e: e, s0: s0, s1: s1, kwh: kwh, h: h, avg: kwh != null && h > 0 ? kwh / h : null,
        min: ps.length ? Math.min.apply(null, ps) : null, max: ps.length ? Math.max.apply(null, ps) : null, est: est };
    }
    drawSession() {
      var x = this._sess, box = this.r.querySelector('.sess');
      if (!box) return;
      if (!x) { box.hidden = true; return; }
      box.hidden = false;
      var hm = function (t) { var d = new Date(t); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); };
      var dia = function (t) { var d = new Date(t), h = new Date(); h.setHours(0, 0, 0, 0); var diff = Math.round((h - new Date(d).setHours(0, 0, 0, 0)) / 864e5); return diff === 0 ? 'hoje' : diff === 1 ? 'ontem' : d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric' }); };
      var mins = Math.round(x.h * 60);
      this.set('s_quando', dia(x.s) + ' · ' + hm(x.s) + ' – ' + hm(x.e));
      this.set('s_kwh', x.kwh == null ? '—' : '+' + fmtN(x.kwh, 1) + ' kWh');
      this.set('s_pct', x.s0 != null && x.s1 != null ? Math.round(x.s0) + '% → ' + Math.round(x.s1) + '%' : '');
      this.set('s_dur', Math.floor(mins / 60) + ' h ' + ('0' + mins % 60).slice(-2));
      this.set('s_avg', x.avg == null ? '—' : fmtN(x.avg, 1) + ' kW');
      var aq = x.est ? '≈ ' : '';
      this.set('s_min', x.min == null ? '—' : aq + fmtN(x.min, 1) + ' kW');
      this.set('s_max', x.max == null ? '—' : aq + fmtN(x.max, 1) + ' kW');
      var caiu = x.min != null && x.max != null && x.max > 2 && x.min < x.max * 0.7;
      box.classList.toggle('drop', caiu);
      this.set('s_nota', x.min == null ? 'Sem leituras de potência nesta carga' : (caiu ? 'A potência baixou durante a carga (de ' + fmtN(x.max, 1) + ' para ' + fmtN(x.min, 1) + ' kW)' : 'Potência estável durante a carga') + (x.est ? ' · estimada pelo tempo que faltava' : ''));
    }
    // minutos que faltam até poder atualizar outra vez (dados ou último pedido há menos de N min)
    espera() {
      var min = this.c.refresh_cooldown == null ? 15 : Number(this.c.refresh_cooldown);
      var t = 0, up = this.s('updated'), bt = this.s('refresh');
      if (up) t = Math.max(t, Date.parse(up.state) || 0);
      if (bt) t = Math.max(t, Date.parse(bt.state) || 0);
      if (this.limite()) return -1;
      var ax = this.num('aux'), minAux = this.c.refresh_min_12v == null ? 70 : Number(this.c.refresh_min_12v);
      if (ax != null && ax < minAux && !this.on('charging')) return -2;
      var falta = t + min * 6e4 - Date.now();
      return falta > 0 ? Math.ceil(falta / 6e4) : 0;
    }
    pedidosHoje() { var c = this.s('pedidos'); return c ? Number(c.state) || 0 : null; }
    maxDia() { return this.c.refresh_max == null ? 20 : Number(this.c.refresh_max); }
    limite() { var n = this.pedidosHoje(); return n != null && n >= this.maxDia(); }
    rfState() {
      var n = this.pedidosHoje(), pc = this.r && this.r.querySelector('.pc');
      if (pc) { pc.textContent = n == null ? '' : n + '/' + this.maxDia() + ' hoje'; pc.classList.toggle('alto', n != null && n >= this.maxDia() * 0.8); pc.title = 'Pedidos feitos hoje ao carro (botão e automações)'; }
      var b = this.r && this.r.querySelector('.rf');
      if (!b || this._busy || this._ask || /ok|ask/.test(b.className)) return;
      var w = this.espera();
      b.className = 'rf' + (w ? ' wait' : '');
      b.title = w === -2 ? 'A bateria de 12 V está fraca. Para não a gastar mais, só dá para pedir dados ao carro quando estiver a carregar.' : w === -1 ? 'Chegaste ao limite de pedidos de hoje. Volta a zero à meia-noite.' : w ? 'Os dados são recentes. Para poupar a bateria de 12 V, só dá para pedir outra vez daqui a ' + w + ' min.' : '';
      this.set('rf', w === -2 ? '12 V fraca' : w === -1 ? 'Limite de hoje' : w ? 'Daqui a ' + w + ' min' : 'Atualizar');
    }
    // pedir dados frescos ao carro: 1.º toque pede confirmação, 2.º envia
    refresh() {
      var self = this, b = this.r.querySelector('.rf'), id = this.e.refresh;
      if (!id || !this._h || this.espera() !== 0) return;
      var reset = function (txt, cls, ms) { b.className = 'rf ' + (cls || ''); self.set('rf', txt); clearTimeout(self._rt); self._rt = setTimeout(function () { self._ask = false; b.className = 'rf'; self.rfState(); }, ms); };
      if (!this._ask) { this._ask = true; reset('Confirmar?', 'ask', 4000); return; }
      this._ask = false;
      var antes = (this.s('updated') || {}).state;
      b.className = 'rf busy'; this.set('rf', 'A pedir…'); clearTimeout(this._rt); this._busy = true;
      this._h.callService('button', 'press', { entity_id: id }).then(function () {
        var t0 = Date.now(), espera = setInterval(function () {
          var agora = (self.s('updated') || {}).state;
          if (agora && agora !== antes) { clearInterval(espera); self._busy = false; reset('Atualizado', 'ok', 3000); }
          else if (Date.now() - t0 > 150000) { clearInterval(espera); self._busy = false; reset('Pedido enviado', 'ok', 3000); }
        }, 3000);
      }).catch(function () { self._busy = false; reset('Falhou', 'ask', 4000); });
    }
    intro(soc) {
      var self = this, root = this.r.querySelector('.root'), fill = this.r.querySelector('.fill'), el = this.r.querySelector('[data-v=soc]');
      var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._intro = 'run';
      if (calmo) { el.textContent = Math.round(soc); fill.style.width = soc + '%'; this._intro = 'done'; return; }
      root.classList.add('intro'); fill.style.width = '0%'; el.textContent = '0';
      var t0 = null, dur = 3200, alvo = Math.round(soc);
      requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.width = soc + '%'; }); });
      var passo = function (t) {
        if (t0 == null) t0 = t;
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(alvo * e);
        if (k < 1) requestAnimationFrame(passo); else { self._intro = 'done'; var n = self.num('soc'); if (n != null) { el.textContent = Math.round(n); fill.style.width = n + '%'; } }
      };
      requestAnimationFrame(passo);
      setTimeout(function () { root.classList.remove('intro'); }, 7000);
    }
    drawSpark() {
      var pts = (this._pts || []).slice(), now = Date.now(), t0 = now - 864e5, cur = this.num('soc');
      if (cur != null) pts.push([now, cur]);
      if (!pts.length) return;
      if (pts[0][0] > t0) pts.unshift([t0, pts[0][1]]);
      var lo = Math.max(0, Math.min.apply(null, pts.map(function (p) { return p[1]; })) - 8);
      var hi = Math.min(100, Math.max.apply(null, pts.map(function (p) { return p[1]; })) + 8);
      if (hi - lo < 10) { lo = Math.max(0, lo - 5); hi = Math.min(100, hi + 5); }
      var X = function (t) { return Math.max(0, (t - t0) / 864e5 * 300); }, Y = function (v) { return 60 - (v - lo) / (hi - lo) * 54; };
      var d = '', prev = null;
      pts.forEach(function (p, i) { var x = X(p[0]).toFixed(1), y = Y(p[1]).toFixed(1); d += i ? (' L' + x + ' ' + (prev != null ? prev : y) + ' L' + x + ' ' + y) : ('M' + x + ' ' + y); prev = y; });
      this.r.querySelector('.line').setAttribute('d', d);
      this.r.querySelector('.area').setAttribute('d', d + ' L300 64 L0 64 Z');
      var dv = Math.round(pts[pts.length - 1][1] - pts[0][1]);
      this.set('delta', dv === 0 ? 'sem variação' : (dv > 0 ? '+' : '−') + Math.abs(dv) + ' pp');
    }
    u() {
      var h = this._h, root = this.r.querySelector('.root'), self = this;
      var ch = this.on('charging'), pl = ch || this.on('plugged');
      var soc = this.num('soc'), lim = this.num('limit'); if (lim == null) lim = 100;
      root.classList.toggle('chg', ch); root.classList.toggle('plug', pl && !ch);
      root.classList.toggle('low', soc != null && soc < 20 && !ch);
      if (!this._intro && soc != null) this.intro(soc); else if (this._intro !== 'run') this.set('soc', soc == null ? '—' : Math.round(soc));
      var rg = this.num('range'); this.set('range', rg == null ? '— km' : fmtN(rg) + ' km');
      if (this._intro === 'done') this.r.querySelector('.fill').style.width = (soc || 0) + '%';
      this.r.querySelector('.tick').style.left = lim + '%';
      this.set('limtxt', 'limite ' + Math.round(lim) + '%');
      var p = this.num('power'), left = this.num('time_left'), est = false;
      if (ch && !(p > 0)) { p = this.estima(soc, left); est = p != null; }
      this.set('state', ch ? ('A carregar' + (p ? ' · ' + fmtN(p, 1) + ' kW' : '')) : pl ? 'Ligado à tomada' : 'Estacionado');
      this.set('sub2', ch ? 'a carregar' : pl ? 'ligado' : 'estacionado');
      this.set('power', p == null ? '—' : (est ? '≈ ' : '') + fmtN(p, 1) + ' kW');
      if (left != null) {
        var mm = Math.round(left); this.set('left', Math.floor(mm / 60) + ' h ' + ('0' + mm % 60).slice(-2));
        var eta = new Date(Date.now() + mm * 60000); this.set('eta', ('0' + eta.getHours()).slice(-2) + ':' + ('0' + eta.getMinutes()).slice(-2));
      } else { this.set('left', '—'); this.set('eta', '—'); }
      var lockSt = this.s('locked'), open = [];
      ['door_fl', 'door_fr', 'door_rl', 'door_rr', 'trunk', 'hood'].forEach(function (k) { if (self.on(k)) open.push(NAMES[k]); });
      var locked = lockSt ? lockSt.state === 'locked' : null;
      var tl = this.r.querySelector('[data-k=locked]');
      tl.querySelector('svg').innerHTML = locked === false ? IC.unlock : IC.lock;
      this.set('locked', open.length ? 'Aberta: ' + open.join(', ') : locked == null ? '—' : locked ? 'Trancado' : 'Destrancado');
      tl.classList.toggle('al', open.length > 0 || locked === false);
      // consumo médio de 30 dias (a Kia envia em Wh/km; converte-se para kWh/100 km)
      var c30 = this.s('cons30'), c30v = c30 ? Number(c30.state) : NaN;
      if (!isNaN(c30v)) {
        var u30 = String(c30.attributes.unit_of_measurement || '').toLowerCase();
        var k100 = u30.indexOf('wh/km') === 0 ? c30v / 10 : c30v;
        this.set('cons30', fmtN(k100, 1)); this.set('cons30u', 'kWh/100 km');
        this.set('cons30b', 'a 100% dá ≈ ' + fmtN(6400 / k100) + ' km');
      } else { this.set('cons30', '—'); this.set('cons30u', ''); this.set('cons30b', ''); }
      // condução de hoje (atributos do sensor diário: Wh e km)
      var td = this.s('today'), ta = td ? td.attributes : {}, dist = Number(ta.distance) || 0, wh = Number(ta.total_consumed) || 0;
      this.set('todayu', '');
      if (!td) { this.set('today', '—'); this.set('todayb', ''); }
      else if (!dist) { this.set('today', '0'); this.set('todayu', 'km'); this.set('todayb', 'ainda não andou hoje'); }
      else {
        this.set('today', fmtN(dist)); this.set('todayu', 'km');
        this.set('todayb', fmtN(wh / 1000, 1) + ' kWh · ' + fmtN(wh / 10 / dist, 1) + ' kWh/100 km');
      }
      var ax = this.num('aux'); this.set('aux', ax == null ? '—' : Math.round(ax) + '%');
      this.r.querySelector('[data-k=aux]').classList.toggle('al', ax != null && ax < 60);
      // faixa de alertas: só aparece quando há alguma coisa a tratar
      var al = [];
      if (this.on('auto_cut')) al.push(['bat', 'Bateria 12 V em risco de corte', 'aux']);
      else if (ax != null && ax < 60) al.push(['bat', 'Bateria 12 V fraca · ' + Math.round(ax) + '%', 'aux']);
      if (open.length) al.push(['unlock', 'Aberto: ' + open.join(', '), 'locked']);
      else if (locked === false) al.push(['unlock', 'Carro destrancado', 'locked']);
      if (this.on('tyres')) al.push(['tyre', 'Pressão dos pneus a verificar', 'tyres']);
      if (this.on('key')) al.push(['key', 'Pilha da chave fraca', 'key']);
      var box = this.r.querySelector('.alerts');
      box.innerHTML = al.map(function (a) { return '<div class="a" data-k="' + a[2] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + IC[a[0]] + '</svg><span>' + a[1] + '</span></div>'; }).join('');
      box.querySelectorAll('.a').forEach(function (a) { a.addEventListener('click', function () { var id = self.e[a.getAttribute('data-k')]; if (!id) return; var ev = new Event('hass-more-info', { bubbles: true, composed: true }); ev.detail = { entityId: id }; self.dispatchEvent(ev); }); });
      box.hidden = !al.length;
      // energia disponível (bateria de 64 kWh)
      this.set('kwh', soc == null ? '—' : fmtN(soc / 100 * (this.c.capacity || 64), 0) + ' kWh');
      var od = this.num('odometer'); this.set('odo', od == null ? '— km' : fmtN(od) + ' km');
      var cl = this.s('climate');
      var clOn = cl && cl.state !== 'off';
      this.set('climate', !cl ? '—' : clOn ? 'Ligada · ' + fmtN(cl.attributes.temperature || 0) + ' °C' : 'Desligada');
      this.r.querySelector('[data-k=climate]').classList.toggle('dim', !clOn);
      var up = this.s('updated'); this.set('updated', up ? ago(Date.parse(up.state)) : '—');
      this.drawSpark(); this.drawSession(); this.hist(); this.resumo(); this.rfState();
    }
    resumo() {
      var self = this, url = this.c.dados_url || '';
      if (this._res) this.drawResumo();
      if (!url || (this._rq && Date.now() - this._rq < 18e5)) return;
      this._rq = Date.now();
      fetch(url + (url.indexOf('?') < 0 ? '?' : '&') + 't=' + Math.floor(Date.now() / 6e5), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d) { self._res = d; self.drawResumo(); } })
        .catch(function () {});
    }
    drawResumo() {
      var d = this._res; if (!d || !this.r) return;
      var v = function (x) { return x == null || x === '' ? '—' : String(x); };
      var n = function (s) { var x = parseFloat(String(s || '').replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')); return isNaN(x) ? null : x; };
      this.r.querySelector('.root').classList.add('tem-dados');
      this.set('r_mes', d.mes ? d.mes.charAt(0).toUpperCase() + d.mes.slice(1) : 'Este mês');
      this.set('r_atual', d.atualizado ? 'faturas até ' + d.atualizado : '');
      this.set('r_pago', v(d.pago)); this.set('r_gasto', 'faturado ' + v(d.gasto)); this.set('r_cash', '−' + v(d.cashback));
      this.set('r_kwh', v(d.kwh)); this.set('r_n', v(d.carregamentos)); this.set('r_km', v(d.km_mes));
      this.set('r_poup', v(d.poupanca)); this.set('r_e100', v(d.custo_100km)); this.set('r_g100', v(d.gasoleo_100km)); this.set('r_focus', v(d.focus));
      var e = n(d.custo_100km), g = n(d.gasoleo_100km), mx = Math.max(e || 0, g || 0) || 1;
      this.r.querySelector('[data-w=e]').style.width = ((e || 0) / mx * 100) + '%';
      this.r.querySelector('[data-w=g]').style.width = ((g || 0) / mx * 100) + '%';
    }
  }
  if (!customElements.get('eniro-card')) customElements.define('eniro-card', ENiroCard);

  /* ---------- Cartão de segurança: carro visto de cima ---------- */
  var SCSS = `
:host{display:block}
*{box-sizing:border-box}
ha-card{overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.08);
  background:radial-gradient(26rem 18rem at 50% 45%,rgba(26,158,134,.16),transparent 70%),#08121B;color:#F2F5F7;
  font-family:var(--ha-font-family-body,var(--paper-font-body1_-_font-family,system-ui,sans-serif))}
.w{padding:18px 20px 18px;display:flex;flex-direction:column;gap:14px}
p{margin:0}
.top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ttl{font-size:1.05rem;font-weight:600}
.chip{display:inline-flex;align-items:center;gap:8px;font-size:.78rem;color:#c9d3da;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:6px 12px;white-space:nowrap}
.dot{width:8px;height:8px;border-radius:50%;background:#8DC63F}
.bad .chip{border-color:rgba(245,166,35,.6);color:#F5A623}
.bad .dot{background:#F5A623;animation:beat 1.6s infinite}
.body{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:16px;align-items:center}
svg.car{display:block;width:100%;height:auto}
.shell{fill:#1b2733;stroke:#3a4a57;stroke-width:2}
.glass{fill:#0d151c;stroke:#2c3a46;stroke-width:1.5}
.roof{fill:#16212b}
.mirror{fill:#2a3844}
.panel{fill:transparent;stroke:transparent;stroke-width:2;transition:fill .3s}
.panel.open{fill:rgba(245,166,35,.32);stroke:#F5A623}
.door{stroke:#8DC63F;stroke-width:4;stroke-linecap:round;transition:all .3s}
.door.open{stroke:#F5A623}
.swing{stroke:#F5A623;stroke-width:4;stroke-linecap:round;opacity:0;transition:opacity .3s}
.swing.on{opacity:1}
.tyre{fill:#0b1016;stroke:#46535e;stroke-width:1.5}
.tyre.warn{stroke:#F5A623;fill:rgba(245,166,35,.25)}
.lbl rect{fill:#141F29;stroke:rgba(255,255,255,.12)}
.lbl text{font-size:11px;font-weight:600;fill:#8DC63F;text-anchor:middle}
.lbl.warn rect{stroke:#F5A623;fill:rgba(245,166,35,.15)}
.lbl.warn text{fill:#F5A623}
.lbl line{stroke:#46535e;stroke-width:1}
.lockic{fill:none;stroke:#8DC63F;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.unl .lockic{stroke:#F5A623}
.rows{display:flex;flex-direction:column}
.row{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:.86rem;cursor:pointer}
.row:last-child{border-bottom:0}
.row span{color:#8D99A6}
.row b{font-weight:600;text-align:right}
.row.al b{color:#F5A623}
@media (max-width:420px){.body{grid-template-columns:1fr}.svgw{width:min(220px,80%);margin:0 auto}}
@keyframes beat{0%{box-shadow:0 0 0 0 rgba(245,166,35,.8)}70%{box-shadow:0 0 0 8px rgba(245,166,35,0)}}
@media (prefers-reduced-motion:no-preference){
.intro svg.car image,.intro svg.car .shell{animation:sIn .9s cubic-bezier(.2,.8,.2,1) both}
.intro .door{stroke-dasharray:90;animation:draw .8s ease-out both}
.intro .door[data-dr=fl]{animation-delay:.5s}.intro .door[data-dr=fr]{animation-delay:.6s}
.intro .door[data-dr=rl]{animation-delay:.7s}.intro .door[data-dr=rr]{animation-delay:.8s}
.intro .lbl{animation:fade .5s ease both}
.intro .lbl[data-lb=fl]{animation-delay:.9s}.intro .lbl[data-lb=fr]{animation-delay:1s}
.intro .lbl[data-lb=rl]{animation-delay:1.1s}.intro .lbl[data-lb=rr]{animation-delay:1.2s}
.intro [data-shackle]{animation:lockClick .7s cubic-bezier(.3,1.6,.5,1) 1.3s both}
.intro .row{animation:fadeUp .5s ease both}
.intro .row:nth-child(1){animation-delay:.4s}.intro .row:nth-child(2){animation-delay:.48s}.intro .row:nth-child(3){animation-delay:.56s}.intro .row:nth-child(4){animation-delay:.64s}.intro .row:nth-child(5){animation-delay:.72s}
.swing.on{animation:swing .5s ease-out both}
}
@keyframes sIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes draw{from{stroke-dashoffset:90}to{stroke-dashoffset:0}}
@keyframes fade{from{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes lockClick{0%{transform:translateY(-5px)}100%{transform:none}}
@keyframes swing{from{opacity:0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;

  var CAR = '<svg class="car" viewBox="0 0 260 420" role="img" aria-label="Carro visto de cima: portas, mala, capô e pneus">' +
    // pneus (por baixo da carroçaria)
    '<rect class="tyre" data-ty="fl" x="58" y="82" width="22" height="52" rx="7"/><rect class="tyre" data-ty="fr" x="180" y="82" width="22" height="52" rx="7"/>' +
    '<rect class="tyre" data-ty="rl" x="58" y="290" width="22" height="52" rx="7"/><rect class="tyre" data-ty="rr" x="180" y="290" width="22" height="52" rx="7"/>' +
    // carroçaria
    '<path class="shell" d="M96 22 C110 14 150 14 164 22 C182 32 190 52 190 80 L192 330 C192 370 180 396 160 402 C142 407 118 407 100 402 C80 396 68 370 68 330 L70 80 C70 52 78 32 96 22 Z"/>' +
    // capô e mala (zonas que acendem)
    '<path class="panel" data-pn="hood" d="M98 26 C112 19 148 19 162 26 C176 34 182 52 183 80 L184 104 L76 104 L77 80 C78 52 84 34 98 26 Z"/>' +
    '<path class="panel" data-pn="trunk" d="M77 352 L183 352 C181 376 172 392 158 396 C141 400 119 400 102 396 C88 392 79 376 77 352 Z"/>' +
    // vidros e tejadilho
    '<path class="glass" d="M84 118 C100 106 160 106 176 118 L170 156 C150 150 110 150 90 156 Z"/>' +
    '<rect class="roof" x="90" y="160" width="80" height="128" rx="10"/>' +
    '<path class="glass" d="M92 292 C112 298 148 298 168 292 L174 326 C156 334 104 334 86 326 Z"/>' +
    '<path class="glass" d="M78 162 L86 162 L86 222 L78 222 Z M78 228 L86 228 L86 284 L78 286 Z M174 162 L182 162 L182 222 L174 222 Z M174 228 L182 228 L182 286 L174 284 Z" opacity=".7"/>' +
    // retrovisores
    '<path class="mirror" d="M70 124 L54 118 L54 132 L70 136 Z"/><path class="mirror" d="M190 124 L206 118 L206 132 L190 136 Z"/>' +
    // portas (linha da porta + porta aberta a rodar para fora)
    '<line class="door" data-dr="fl" x1="69" y1="158" x2="69" y2="222"/><line class="swing" data-sw="fl" x1="69" y1="158" x2="28" y2="196"/>' +
    '<line class="door" data-dr="rl" x1="69" y1="228" x2="69" y2="288"/><line class="swing" data-sw="rl" x1="69" y1="228" x2="30" y2="262"/>' +
    '<line class="door" data-dr="fr" x1="191" y1="158" x2="191" y2="222"/><line class="swing" data-sw="fr" x1="191" y1="158" x2="232" y2="196"/>' +
    '<line class="door" data-dr="rr" x1="191" y1="228" x2="191" y2="288"/><line class="swing" data-sw="rr" x1="191" y1="228" x2="230" y2="262"/>' +
    // etiquetas dos pneus
    '<g class="lbl" data-lb="fl"><line x1="58" y1="108" x2="46" y2="108"/><rect x="4" y="96" width="42" height="24" rx="8"/><text x="25" y="112">OK</text></g>' +
    '<g class="lbl" data-lb="fr"><line x1="202" y1="108" x2="214" y2="108"/><rect x="214" y="96" width="42" height="24" rx="8"/><text x="235" y="112">OK</text></g>' +
    '<g class="lbl" data-lb="rl"><line x1="58" y1="316" x2="46" y2="316"/><rect x="4" y="304" width="42" height="24" rx="8"/><text x="25" y="320">OK</text></g>' +
    '<g class="lbl" data-lb="rr"><line x1="202" y1="316" x2="214" y2="316"/><rect x="214" y="304" width="42" height="24" rx="8"/><text x="235" y="320">OK</text></g>' +
    // cadeado no tejadilho
    '<g transform="translate(118 206)"><rect class="lockic" x="0" y="10" width="24" height="18" rx="3"/><path class="lockic" data-shackle d="M5 10 V5 a7 7 0 0 1 14 0 V10"/></g>' +
    '</svg>';

  // variante com fotografia vista de cima (frente para cima): a imagem ocupa x 40..220, y 20..400
  function carFoto(src) {
    var X = function (v) { return 40 + v * 180 / 274; }, Y = function (v) { return 20 + v * 380 / 578; };
    var fy1 = Y(205), fy2 = Y(330), ry1 = Y(335), ry2 = Y(455), lx = X(42), rx = X(232);
    var ty1 = Y(150), ty2 = Y(470);
    var door = function (k, x, y1, y2, dir) {
      return '<line class="door" data-dr="' + k + '" x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '"/>' +
        '<line class="swing" data-sw="' + k + '" x1="' + x + '" y1="' + y1 + '" x2="' + (x + dir * 40) + '" y2="' + (y1 + 36) + '"/>';
    };
    var lbl = function (k, side, y) {
      var bx = side < 0 ? 2 : 216, ex = side < 0 ? X(30) : X(244), lx2 = side < 0 ? 44 : 216;
      return '<g class="lbl" data-lb="' + k + '"><line x1="' + ex + '" y1="' + y + '" x2="' + lx2 + '" y2="' + y + '"/><rect x="' + bx + '" y="' + (y - 12) + '" width="42" height="24" rx="8"/><text x="' + (bx + 21) + '" y="' + (y + 4) + '">OK</text>' +
        '<rect class="tyre" data-ty="' + k + '" x="-50" y="0" width="1" height="1" style="display:none"/></g>';
    };
    return '<svg class="car" viewBox="0 0 260 420" role="img" aria-label="Carro visto de cima: portas, mala, capô e pneus">' +
      '<image href="' + src + '" x="40" y="20" width="180" height="380"/>' +
      '<rect class="panel" data-pn="hood" x="' + X(40) + '" y="' + Y(6) + '" width="' + (X(234) - X(40)) + '" height="' + (Y(160) - Y(6)) + '" rx="26"/>' +
      '<rect class="panel" data-pn="trunk" x="' + X(50) + '" y="' + Y(500) + '" width="' + (X(224) - X(50)) + '" height="' + (Y(572) - Y(500)) + '" rx="18"/>' +
      door('fl', lx, fy1, fy2, -1) + door('rl', lx, ry1, ry2, -1) + door('fr', rx, fy1, fy2, 1) + door('rr', rx, ry1, ry2, 1) +
      lbl('fl', -1, ty1) + lbl('fr', 1, ty1) + lbl('rl', -1, ty2) + lbl('rr', 1, ty2) +
      '<g transform="translate(118 ' + (Y(380) - 18) + ')"><circle cx="12" cy="17" r="20" fill="rgba(8,18,27,.55)"/><rect class="lockic" x="0" y="10" width="24" height="18" rx="3"/><path class="lockic" data-shackle d="M5 10 V5 a7 7 0 0 1 14 0 V10"/></g>' +
      '</svg>';
  }

  var SNAMES = { door_fl: 'Porta frente esq.', door_fr: 'Porta frente dir.', door_rl: 'Porta trás esq.', door_rr: 'Porta trás dir.', trunk: 'Mala', hood: 'Capô' };

  class ENiroSeguranca extends HTMLElement {
    setConfig(c) {
      c = c || {};
      var p = c.prefix || 'garagem_e_niro';
      var e = defaults(p);
      e.tyre_fl = 'binary_sensor.' + p + '_tire_pressure_front_left'; e.tyre_fr = 'binary_sensor.' + p + '_tire_pressure_front_right';
      e.tyre_rl = 'binary_sensor.' + p + '_tire_pressure_rear_left'; e.tyre_rr = 'binary_sensor.' + p + '_tire_pressure_rear_right';
      Object.keys(c.entities || {}).forEach(function (k) { e[k] = c.entities[k]; });
      this.c = c; this.e = e;
      this.r = this.shadowRoot || this.attachShadow({ mode: 'open' });
      var row = function (k, label) { return '<div class="row" data-k="' + k + '"><span>' + label + '</span><b data-v="' + k + '">—</b></div>'; };
      this.r.innerHTML = '<style>' + SCSS + '</style><ha-card><div class="w root">' +
        '<div class="top"><p class="ttl">' + (c.name || 'Segurança') + '</p><span class="chip"><span class="dot"></span><span data-v="state">—</span></span></div>' +
        '<div class="body"><div class="svgw">' + (c.top_image === false ? CAR : carFoto(c.top_image || '/local/eniro/eniro-top.webp')) + '</div><div class="rows">' +
        row('locked', 'Trinco') + row('doors', 'Portas') + row('trunk', 'Mala') + row('hood', 'Capô') + row('tyres', 'Pneus') +
        '</div></div></div></ha-card>';
      var self = this;
      this.r.querySelectorAll('.row').forEach(function (r) {
        r.addEventListener('click', function () {
          var k = r.getAttribute('data-k'), id = self.e[k === 'doors' ? 'door_fl' : k];
          if (!id) return;
          var ev = new Event('hass-more-info', { bubbles: true, composed: true }); ev.detail = { entityId: id }; self.dispatchEvent(ev);
        });
      });
      if (!this._intro) { this._intro = true; var rt = this.r.querySelector('.root'); rt.classList.add('intro'); setTimeout(function () { rt.classList.remove('intro'); }, 4000); }
      if (this._h) this.u();
    }
    set hass(h) { this._h = h; if (this.r) this.u(); }
    getCardSize() { return 6; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }
    s(k) { var id = this.e[k], st = id && this._h.states[id]; return st && st.state !== 'unavailable' && st.state !== 'unknown' ? st : null; }
    on(k) { var st = this.s(k); return !!st && ['on', 'open', 'true'].indexOf(st.state) > -1; }
    set(k, v) { var el = this.r.querySelector('[data-v=' + k + ']'); if (el) el.textContent = v; }
    row(k, alert) { var el = this.r.querySelector('[data-k=' + k + ']'); if (el) el.classList.toggle('al', !!alert); }
    u() {
      var self = this, q = function (s) { return self.r.querySelector(s); };
      var open = [];
      ['fl', 'fr', 'rl', 'rr'].forEach(function (k) {
        var o = self.on('door_' + k); if (o) open.push(SNAMES['door_' + k]);
        q('[data-dr=' + k + ']').classList.toggle('open', o); q('[data-sw=' + k + ']').classList.toggle('on', o);
        var w = self.on('tyre_' + k), has = !!self.s('tyre_' + k);
        q('[data-ty=' + k + ']').classList.toggle('warn', w);
        var lb = q('[data-lb=' + k + ']'); lb.classList.toggle('warn', w); lb.querySelector('text').textContent = has ? (w ? '!' : 'OK') : '—';
      });
      ['trunk', 'hood'].forEach(function (k) {
        var o = self.on(k); q('[data-pn=' + k + ']').classList.toggle('open', o);
        self.set(k, self.s(k) ? (o ? (k === 'hood' ? 'Aberto' : 'Aberta') : (k === 'hood' ? 'Fechado' : 'Fechada')) : '—'); self.row(k, o);
        if (o) open.push(SNAMES[k]);
      });
      var nDoors = ['fl', 'fr', 'rl', 'rr'].filter(function (k) { return self.on('door_' + k); }).length;
      this.set('doors', nDoors ? nDoors + (nDoors > 1 ? ' abertas' : ' aberta') : 'Todas fechadas'); this.row('doors', nDoors > 0);
      var lk = this.s('locked'), locked = lk ? lk.state === 'locked' : null;
      this.set('locked', locked == null ? '—' : locked ? 'Trancado' : 'Destrancado'); this.row('locked', locked === false);
      var root = q('.root'); root.classList.toggle('unl', locked === false);
      q('[data-shackle]').setAttribute('d', locked === false ? 'M5 10 V5 a7 7 0 0 1 13 -3' : 'M5 10 V5 a7 7 0 0 1 14 0 V10');
      var tyreBad = ['fl', 'fr', 'rl', 'rr'].filter(function (k) { return self.on('tyre_' + k); }).length || (this.on('tyres') ? 1 : 0);
      this.set('tyres', this.s('tyres') ? (tyreBad ? 'Verificar pressão' : 'OK') : '—'); this.row('tyres', tyreBad > 0);
      var bad = open.length > 0 || locked === false || tyreBad > 0;
      root.classList.toggle('bad', bad);
      this.set('state', open.length ? 'Aberto: ' + open.join(', ').toLowerCase() : locked === false ? 'Destrancado' : tyreBad ? 'Ver pneus' : 'Tudo seguro');
    }
  }
  if (!customElements.get('eniro-seguranca-card')) customElements.define('eniro-seguranca-card', ENiroSeguranca);


  /* ---------- Cartão SoH: valor medido no evDash, guardado à mão ---------- */
  var HCSS = `
:host{display:block}
*{box-sizing:border-box}
ha-card{overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.08);background:radial-gradient(22rem 14rem at 20% 0,rgba(141,198,63,.14),transparent 70%),#08121B;color:#F2F5F7;font-family:var(--ha-font-family-body,system-ui,sans-serif)}
.w{padding:18px 20px;display:flex;flex-direction:column;gap:14px}
p{margin:0}
.top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ttl{font-size:1.05rem;font-weight:600}
.ttl small{display:block;font-size:.7rem;font-weight:400;color:#8D99A6;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
.chip{font-size:.76rem;border-radius:999px;padding:5px 12px;border:1px solid rgba(141,198,63,.5);color:#8DC63F;white-space:nowrap}
.chip.m{border-color:rgba(95,227,208,.5);color:#5FE3D0}.chip.a{border-color:rgba(245,166,35,.6);color:#F5A623}
.hero{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center}
.ring{position:relative;width:96px;height:96px}
.ring svg{width:100%;height:100%;overflow:visible}
.ring .bg{fill:none;stroke:rgba(255,255,255,.1);stroke-width:9}
.ring .fg,.ring .gl{fill:none;stroke:#8DC63F;stroke-width:9;stroke-linecap:round}
.ring .gl{stroke-width:12;opacity:.45}
.ring b{position:absolute;inset:0;display:grid;place-items:center;font-size:1.2rem;font-weight:600;font-variant-numeric:tabular-nums}
.ring b em{font-style:normal;white-space:nowrap}.ring b i{font-style:normal}
.ring b span{font-size:.6em;color:#aab6c0;margin-left:2px}
.meta p{font-size:.8rem;color:#8D99A6;line-height:1.6}
.meta p b{color:#F2F5F7;font-weight:600}
.hist{border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:10px 12px 6px;background:rgba(20,31,41,.55)}
.hist .h{display:flex;justify-content:space-between;font-size:.7rem;color:#8D99A6;letter-spacing:.06em;text-transform:uppercase}
.hist svg{display:block;width:100%;height:54px;margin-top:6px}
.hist .none{font-size:.76rem;color:#6f7c88;padding:8px 0}
.form{display:flex;gap:8px;align-items:center}
.form label{flex:1;min-width:0;display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:0 12px;background:#141F29}
.form input{flex:1;min-width:0;width:100%;background:transparent;border:0;color:#F2F5F7;font:inherit;font-size:1rem;padding:10px 0;outline:none;font-variant-numeric:tabular-nums}
.form label span{color:#8D99A6;font-size:.85rem}
.form label:focus-within{border-color:#8DC63F}
.form button{font:inherit;font-weight:600;font-size:.85rem;border:0;border-radius:12px;padding:11px 16px;background:#8DC63F;color:#0b1a06;cursor:pointer;white-space:nowrap}
.form button[disabled]{background:rgba(255,255,255,.1);color:#6f7c88;cursor:default}
.msg{font-size:.74rem;color:#8D99A6;min-height:1em;margin-top:-6px}
.msg.err{color:#F5A623}.msg.ok{color:#8DC63F}
@media (prefers-reduced-motion:no-preference){
.intro .top,.intro .hero,.intro .hist,.intro .form{animation:fUp .6s ease both}
.intro .hero{animation-delay:.1s}.intro .hist{animation-delay:.25s}.intro .form{animation-delay:.4s}
.intro .hist svg path{animation:wipe 1.2s ease-out .5s both}
@keyframes wipe{from{clip-path:inset(-10px 100% -10px -10px)}to{clip-path:inset(-10px -10px -10px -10px)}}
.intro .hist svg circle{animation:pop .4s ease-out both;animation-delay:1.2s}
}
@keyframes fUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes pop{from{opacity:0}to{opacity:1}}`;

  class ENiroSoH extends HTMLElement {
    setConfig(c) {
      c = c || {}; this.c = c;
      this.e = { val: c.input || 'input_number.soh_da_bateria', btn: c.button || 'input_button.guardar_soh', reg: c.sensor || 'sensor.soh_da_bateria_registado', odo: c.odometer || 'sensor.garagem_e_niro_odometer' };
      this.r = this.shadowRoot || this.attachShadow({ mode: 'open' });
      this.r.innerHTML = '<style>' + HCSS + '</style><ha-card><div class="w">' +
        '<div class="top"><p class="ttl">' + (c.name || 'Saúde da bateria') + '<small>SoH medido no evDash</small></p><span class="chip" data-v="grau">—</span></div>' +
        '<div class="hero"><div class="ring"><svg viewBox="0 0 100 100"><defs><filter id="sohGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5"/></filter></defs><circle class="bg" cx="50" cy="50" r="42"/><circle class="gl" cx="50" cy="50" r="42" transform="rotate(-90 50 50)" stroke-dasharray="263.9" stroke-dashoffset="263.9" filter="url(#sohGlow)"/><circle class="fg" cx="50" cy="50" r="42" transform="rotate(-90 50 50)" stroke-dasharray="263.9" stroke-dashoffset="263.9"/></svg><b><em><i data-v="soh">—</i><span>%</span></em></b></div>' +
        '<div class="meta"><p>Registado a <b data-v="quando">—</b></p><p>Aos <b data-v="km">—</b></p><p data-v="dif"></p></div></div>' +
        '<div class="hist"><div class="h"><span>Evolução</span><span data-v="n"></span></div><div data-v="graf"><p class="none">Ainda só há um registo.</p></div></div>' +
        '<div class="form"><label><input type="text" inputmode="decimal" placeholder="Novo valor, ex.: 98,6" aria-label="Novo valor do SoH"><span>%</span></label><button type="button">Guardar</button></div>' +
        '<p class="msg" data-v="msg"></p></div></ha-card>';
      var self = this;
      this.r.querySelector('button').addEventListener('click', function () { self.guardar(); });
      this.r.querySelector('input').addEventListener('keydown', function (ev) { if (ev.key === 'Enter') self.guardar(); });
      if (!this._intro) { this._intro = true; var w0 = this.r.querySelector('.w'); w0.classList.add('intro'); setTimeout(function () { w0.classList.remove('intro'); }, 4000); }
      if (this._h) this.u();
    }
    set hass(h) { this._h = h; if (this.r) this.u(); }
    getCardSize() { return 5; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }
    set(k, v) { if (k === 'soh' && this._contando) return; var el = this.r.querySelector('[data-v=' + k + ']'); if (el) el.textContent = v; }
    _calmo() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    conta(v) {
      var self = this, el = this.r.querySelector('[data-v=soh]'), cs = this.r.querySelectorAll('.fg,.gl'), t0 = null; this._contando = true;
      var p = Math.max(0, Math.min(100, v)) / 100;
      var passo = function (t) { if (t0 == null) t0 = t + 150; var k = Math.max(0, Math.min(1, (t - t0) / 3200)), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmtN(v * e, 1);
        cs.forEach(function (c) { c.style.strokeDashoffset = 263.9 * (1 - p * e); });
        if (k < 1) requestAnimationFrame(passo); else self._contando = false; };
      requestAnimationFrame(passo);
    }
    msg(t, cls) { var m = this.r.querySelector('[data-v=msg]'); m.textContent = t; m.className = 'msg ' + (cls || ''); }
    guardar() {
      var self = this, inp = this.r.querySelector('input'), b = this.r.querySelector('button');
      var v = parseFloat(String(inp.value).replace(',', '.'));
      if (isNaN(v) || v < 50 || v > 110) { this.msg('Escreve um valor entre 50 e 110, por exemplo 98,6.', 'err'); return; }
      v = Math.round(v * 10) / 10;
      b.disabled = true; this.msg('A guardar…');
      this._h.callService('input_number', 'set_value', { entity_id: this.e.val, value: v })
        .then(function () { return self._h.callService('input_button', 'press', { entity_id: self.e.btn }); })
        .then(function () { inp.value = ''; b.disabled = false; self._hq = 0; self.msg('Guardado: ' + fmtN(v, 1) + '%', 'ok'); setTimeout(function () { self.hist(true); }, 2500); })
        .catch(function () { b.disabled = false; self.msg('Não foi possível guardar. Tenta outra vez.', 'err'); });
    }
    u() {
      var st = this._h.states[this.e.reg], ok = st && !isNaN(Number(st.state));
      var v = ok ? Number(st.state) : null;
      this.set('soh', v == null ? '—' : fmtN(v, 1));
      var off = v == null ? 263.9 : 263.9 * (1 - Math.max(0, Math.min(100, v)) / 100), rr = this.r;
      var pinta = function () { rr.querySelectorAll('.fg,.gl').forEach(function (c) { c.style.strokeDashoffset = off; }); };
      if (!this._ringIn && v != null) { this._ringIn = true; if (this._calmo()) pinta(); else this.conta(v); } else if (!this._contando) pinta();
      var chip = this.r.querySelector('[data-v=grau]');
      var g = v == null ? ['Sem registo', 'm'] : v >= 95 ? ['Excelente', ''] : v >= 90 ? ['Bom', ''] : v >= 85 ? ['Normal', 'm'] : ['A vigiar', 'a'];
      chip.textContent = g[0]; chip.className = 'chip ' + g[1];
      this.set('quando', ok && st.attributes.registado_em ? st.attributes.registado_em : '—');
      var od = this._h.states[this.e.odo]; this.set('km', od && !isNaN(Number(od.state)) ? fmtN(Number(od.state)) + ' km' : '—');
      this.hist(false);
    }
    hist(force) {
      var self = this, id = this.e.reg;
      if (!this._h.callWS || (!force && this._hq && Date.now() - this._hq < 18e5)) { this.drawHist(); return; }
      this._hq = Date.now();
      var end = new Date(), start = new Date(end - 6 * 365 * 864e5), rec = new Date(end - 11 * 864e5);
      // estatísticas de longo prazo (guardadas para sempre) + histórico recente (horas exatas dos últimos dias)
      var pStat = this._h.callWS({ type: 'recorder/statistics_during_period', start_time: start.toISOString(), end_time: end.toISOString(), statistic_ids: [id], period: 'day', types: ['mean'] })
        .then(function (r) { return ((r && r[id]) || []).map(function (x) { return [typeof x.start === 'number' ? x.start : Date.parse(x.start), Math.round(Number(x.mean) * 10) / 10]; }); })
        .catch(function () { return []; });
      var pHist = this._h.callWS({ type: 'history/history_during_period', start_time: rec.toISOString(), end_time: end.toISOString(), entity_ids: [id], minimal_response: true, no_attributes: true })
        .then(function (res) { return ((res && res[id]) || []).map(function (x) { return [x.lu !== undefined ? x.lu * 1000 : Date.parse(x.last_changed), Number(x.s !== undefined ? x.s : x.state)]; }); })
        .catch(function () { return []; });
      Promise.all([pStat, pHist]).then(function (a) {
        var hist = a[1].filter(function (q) { return !isNaN(q[0]) && !isNaN(q[1]) && q[1] > 0; });
        var t0 = hist.length ? hist[0][0] : Infinity;
        var all = a[0].filter(function (q) { return !isNaN(q[0]) && !isNaN(q[1]) && q[1] > 0 && q[0] < t0 - 864e5; }).concat(hist).sort(function (x, y) { return x[0] - y[0]; });
        var dedup = []; all.forEach(function (q) { if (!dedup.length || dedup[dedup.length - 1][1] !== q[1]) dedup.push(q); });
        self._pts = dedup; self.drawHist();
      });
    }
    antigos() {
      return (this.c.historico || []).map(function (h) {
        var d = String(h.data || ''), t = Date.parse(d.length === 7 ? d + '-15' : d);
        return [t, Number(h.valor), true, h.nota || ''];
      }).filter(function (q) { return !isNaN(q[0]) && !isNaN(q[1]); }).sort(function (a, b) { return a[0] - b[0]; });
    }
    drawHist() {
      var reg = this._pts || [], old = this.antigos(), box = this.r.querySelector('[data-v=graf]');
      var pts = old.concat(reg.filter(function (q) { return !old.length || q[0] > old[old.length - 1][0]; }));
      this.set('n', pts.length ? pts.length + (pts.length > 1 ? ' registos' : ' registo') : '');
      if (pts.length < 2 && reg.length) pts = reg;
      var dif = this.r.querySelector('[data-v=dif]');
      if (reg.length > 1) {
        var d = reg[reg.length - 1][1] - reg[0][1], dias = Math.round((reg[reg.length - 1][0] - reg[0][0]) / 864e5);
        dif.innerHTML = (d <= 0 ? '−' : '+') + fmtN(Math.abs(d), 1) + ' pp em <b>' + dias + ' dias</b>';
      } else dif.textContent = '';
      if (pts.length < 2) { box.innerHTML = '<p class="none">' + (pts.length ? 'Ainda só há um registo. A evolução aparece a partir do segundo.' : 'Escreve o valor do evDash e carrega em Guardar.') + '</p>'; return; }
      var t0 = pts[0][0], t1 = pts[pts.length - 1][0], lo = Math.min.apply(null, pts.map(function (q) { return q[1]; })) - 1, hi = Math.max.apply(null, pts.map(function (q) { return q[1]; })) + 1;
      var idx = {}; pts.forEach(function (q, k) { idx[q[0]] = k; }); var X = function (t) { return pts.length < 2 ? 150 : idx[t] / (pts.length - 1) * 292 + 4; }, Y = function (v) { return 50 - (v - lo) / (hi - lo) * 44; };
      var d2 = pts.map(function (q, i) { return (i ? 'L' : 'M') + X(q[0]).toFixed(1) + ' ' + Y(q[1]).toFixed(1); }).join(' ');
      var dots = pts.map(function (q) { return q[2] ? '<circle cx="' + X(q[0]).toFixed(1) + '" cy="' + Y(q[1]).toFixed(1) + '" r="3" fill="#08121B" stroke="#8D99A6" stroke-width="1.5" vector-effect="non-scaling-stroke"/>' : '<circle cx="' + X(q[0]).toFixed(1) + '" cy="' + Y(q[1]).toFixed(1) + '" r="3.5" fill="#8DC63F"/>'; }).join('');
      var mes = function (t) { var d = new Date(t); return d.toLocaleDateString('pt-PT', { month: 'short' }).replace('.', '') + ' ' + String(d.getFullYear()).slice(2); };
      var lbl = pts.map(function (q, k) { var x = X(q[0]) / 300 * 100, al = k === 0 ? 'left' : k === pts.length - 1 ? 'right' : 'center', tr = k === 0 ? '0' : k === pts.length - 1 ? '-100%' : '-50%';
        return '<span style="position:absolute;left:' + x + '%;transform:translateX(' + tr + ');text-align:' + al + ';white-space:nowrap"><b style="color:' + (q[2] ? '#aab6c0' : '#8DC63F') + ';font-weight:600">' + fmtN(q[1], q[1] % 1 ? 1 : 0) + '%</b> · ' + mes(q[0]) + (q[3] ? '<br><i style="font-style:normal;color:#6f7c88">' + q[3] + '</i>' : '') + '</span>'; }).join('');
      box.innerHTML = '<svg viewBox="0 0 300 54" preserveAspectRatio="none"><path pathLength="1" d="' + d2 + '" fill="none" stroke="#8DC63F" stroke-width="2" vector-effect="non-scaling-stroke" opacity=".85"/>' + dots + '</svg>' +
        '<div style="position:relative;height:' + (pts.some(function (q) { return q[3]; }) ? 30 : 16) + 'px;font-size:.62rem;color:#8D99A6;margin-top:4px">' + lbl + '</div>' +
        (old.length ? '<p style="font-size:.64rem;color:#6f7c88;margin-top:4px">○ registos antigos (anotados à mão) · ● guardados no cartão</p>' : '');
    }
  }
  if (!customElements.get('eniro-soh-card')) customElements.define('eniro-soh-card', ENiroSoH);


  /* ---------- Cartão de grupo: blocos das abas Sensores e Controlos ---------- */
  var GIC = {
    bateria: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 11v2M7 10v4M11 10v4"/>',
    estrada: '<path d="M5 21 9 3M19 21 15 3M12 6v2M12 11v2M12 16v2"/>',
    raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    ficha: '<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>',
    b12: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V5M17 7V5M7 13h3M15.5 11.5v3M14 13h3"/>',
    alerta: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
    contador: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h2M11 12h2M15 12h2"/>',
    medidor: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1"/>',
    folha: '<path d="M5 19c10 0 14-6 14-15C9 4 5 9 5 19zM5 19l6-6"/>',
    reciclar: '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/>',
    cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    pneu: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5"/>',
    carro: '<path d="M4 15l2-6h12l2 6v4H4zM7 19v2M17 19v2M4 15h16"/>',
    lua: '<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>',
    agenda: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    ventoinha: '<path d="M12 12c0-4 1-8 4-8 2 0 3 2 1.5 4S12 12 12 12zM12 12c4 0 8 1 8 4 0 2-2 3-4 1.5S12 12 12 12zM12 12c0 4-1 8-4 8-2 0-3-2-1.5-4S12 12 12 12zM12 12c-4 0-8-1-8-4 0-2 2-3 4-1.5S12 12 12 12z"/>',
    coracao: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/><path d="M8 12h2l1-2 2 4 1-2h2"/>',
    grafico: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    mapa: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  var GCSS = `
:host{display:block}
*{box-sizing:border-box}
ha-card{overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.08);background:radial-gradient(22rem 12rem at 15% 0,rgba(26,158,134,.13),transparent 70%),#08121B;color:#F2F5F7;font-family:var(--ha-font-family-body,system-ui,sans-serif)}
.w{padding:16px 16px 16px;display:flex;flex-direction:column;gap:12px}
p{margin:0}
.hd{display:flex;align-items:center;gap:10px;padding:2px 4px}
.hd svg{width:20px;height:20px;fill:none;stroke:#8DC63F;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.hd b{font-size:1.02rem;font-weight:600}
.hd small{margin-left:auto;font-size:.7rem;color:#6f7c88}
.g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.it{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:#141F29;border:1px solid rgba(255,255,255,.07);min-width:0;cursor:pointer;transition:border-color .2s,background .2s}
.it:hover{border-color:rgba(255,255,255,.18)}
.it.full{grid-column:1/-1}
.ic{width:36px;height:36px;flex:none;border-radius:12px;display:grid;place-items:center;background:rgba(141,198,63,.12)}
.ic svg{width:20px;height:20px;fill:none;stroke:#8DC63F;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.tx{min-width:0;flex:1}
.tx p{font-size:.72rem;color:#8D99A6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx b{display:block;font-size:1rem;font-weight:600;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.tx b i{font-style:normal;font-size:.72rem;font-weight:500;color:#aab6c0;margin-left:3px}
.it.al{border-color:rgba(245,166,35,.55);background:linear-gradient(160deg,rgba(245,166,35,.13),#141F29 60%)}
.it.al .ic{background:rgba(245,166,35,.14)}.it.al .ic svg{stroke:#F5A623}.it.al b{color:#F5A623}
.it.off .ic{background:rgba(255,255,255,.06)}.it.off .ic svg{stroke:#6f7c88}
.it.ac .ic{background:rgba(95,227,208,.14)}.it.ac .ic svg{stroke:#5FE3D0}
/* interruptor */
.sw{width:44px;height:26px;flex:none;border-radius:13px;background:rgba(255,255,255,.14);position:relative;transition:background .25s}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#c9d3da;transition:transform .25s,background .25s}
.on .sw{background:rgba(141,198,63,.45)}.on .sw::after{transform:translateX(18px);background:#8DC63F}
/* limite */
.lim{flex-direction:column;align-items:stretch;cursor:default}
.lim .row{display:flex;align-items:center;gap:12px}
.lim .val{margin-left:auto;font-size:1.3rem;font-weight:600;font-variant-numeric:tabular-nums}
.lim input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:10px;margin:4px 0 2px;border-radius:5px;background:linear-gradient(90deg,#8DC63F var(--p,50%),rgba(255,255,255,.12) var(--p,50%));outline:none;cursor:pointer}
.lim input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#F2F5F7;border:3px solid #8DC63F;box-shadow:0 0 10px rgba(141,198,63,.6)}
.lim input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#F2F5F7;border:3px solid #8DC63F}
.lim .ticks{display:flex;justify-content:space-between;font-size:.66rem;color:#6f7c88}
.lim .ticks span.s{color:#8DC63F;font-weight:600}
/* clima */
.cl{flex-direction:column;align-items:stretch;cursor:default}
.cl .row{display:flex;align-items:center;gap:12px}
.tmp{display:flex;align-items:center;justify-content:space-between;gap:10px;background:rgba(255,255,255,.05);border-radius:14px;padding:6px}
.tmp button{width:40px;height:40px;border-radius:12px;border:0;background:rgba(255,255,255,.08);color:#F2F5F7;font-size:1.3rem;cursor:pointer}
.tmp button:hover{background:rgba(255,255,255,.14)}
.tmp b{font-size:1.6rem;font-weight:600;font-variant-numeric:tabular-nums}
.tmp b i{font-style:normal;font-size:.6em;color:#aab6c0}
.cl .sw{margin-left:auto}
.cl.on .ic{background:rgba(239,83,80,.16)}.cl.on .ic svg{stroke:#ef6b5a}
/* gráfico */
.gr{flex-direction:column;align-items:stretch;cursor:default}
.gr svg.ch{width:100%;height:110px;display:block}
.gr .lg{display:flex;gap:14px;font-size:.7rem;color:#8D99A6}
.gr .lg i{display:inline-block;width:10px;height:3px;border-radius:2px;margin-right:5px;vertical-align:middle}
.gr .ax{display:flex;justify-content:space-between;font-size:.66rem;color:#6f7c88}
.pend{opacity:.55;pointer-events:none}
@media (prefers-reduced-motion:no-preference){
.intro .hd{animation:gUp .5s ease both}
.intro .it{animation:gUp .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(.08s + var(--n,0) * .07s)}
.intro .ic svg{animation:gIc .7s ease both;animation-delay:calc(.25s + var(--n,0) * .07s)}
.intro .gr svg.ch path.ln{animation:gWipe 1.6s ease-out .4s both}
@keyframes gWipe{from{clip-path:inset(-10px 100% -10px -10px)}to{clip-path:inset(-10px -10px -10px -10px)}}
.intro .gr svg.ch path.ar{animation:gFade 1s ease 1.2s both}
.intro .sw::after{transition:none}
}
@keyframes gUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes gIc{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.12);opacity:1}100%{transform:none}}
@keyframes gDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes gFade{from{opacity:0}}`;

  class ENiroGrupo extends HTMLElement {
    setConfig(c) {
      if (!c || !c.items) throw new Error('eniro-grupo-card: falta "items"');
      this.c = c;
      this.r = this.shadowRoot || this.attachShadow({ mode: 'open' });
      var html = '<style>' + GCSS + '</style><ha-card><div class="w"><div class="hd"><svg viewBox="0 0 24 24" aria-hidden="true">' + (GIC[c.icon] || GIC.carro) + '</svg><b>' + (c.title || '') + '</b>' + (c.subtitle ? '<small>' + c.subtitle + '</small>' : '') + '</div><div class="g">';
      c.items.forEach(function (it, i) {
        var t = it.type || 'valor', ic = '<div class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">' + (GIC[it.icon] || GIC.carro) + '</svg></div>';
        var full = it.full || t === 'limite' || t === 'clima' || t === 'grafico' ? ' full' : '';
        var st = ' style="--n:' + i + '"';
        if (t === 'limite') html += '<div class="it lim full"' + st + ' data-i="' + i + '"><div class="row">' + ic + '<div class="tx"><p>' + it.name + '</p><b data-s="' + i + '"></b></div><span class="val" data-v="' + i + '">—</span></div><input type="range" min="' + (it.min || 50) + '" max="' + (it.max || 100) + '" step="' + (it.step || 10) + '" aria-label="' + it.name + '"><div class="ticks" data-t="' + i + '"></div></div>';
        else if (t === 'clima') html += '<div class="it cl full"' + st + ' data-i="' + i + '"><div class="row">' + ic + '<div class="tx"><p>' + it.name + '</p><b data-v="' + i + '">—</b></div><span class="sw" role="switch" tabindex="0"></span></div><div class="tmp"><button type="button" data-d="-1" aria-label="Baixar">−</button><b><span data-tt="' + i + '">—</span><i> °C</i></b><button type="button" data-d="1" aria-label="Subir">+</button></div></div>';
        else if (t === 'grafico') html += '<div class="it gr full"' + st + ' data-i="' + i + '"><div class="lg"><span><i style="background:#8DC63F"></i>Bateria %</span><span><i style="background:#5FE3D0"></i>Potência kW</span><span style="margin-left:auto">' + (it.hours || 72) + ' h</span></div><svg class="ch" viewBox="0 0 300 110" preserveAspectRatio="none" data-ch="' + i + '"></svg><div class="ax" data-ax="' + i + '"></div></div>';
        else html += '<div class="it' + full + '"' + st + ' data-i="' + i + '">' + ic + '<div class="tx"><p>' + it.name + '</p><b data-v="' + i + '">—</b></div>' + (t === 'interruptor' ? '<span class="sw" role="switch" tabindex="0"></span>' : '') + '</div>';
      });
      this.r.innerHTML = html + '</div></div></ha-card>';
      if (!this._intro) { this._intro = 'run'; var gw = this.r.querySelector('.w'), me = this; gw.classList.add('intro'); setTimeout(function () { gw.classList.remove('intro'); me._intro = 'done'; }, 4000); }
      var self = this;
      this.r.querySelectorAll('.it').forEach(function (el) {
        var i = +el.getAttribute('data-i'), it = c.items[i], t = it.type || 'valor';
        if (t === 'limite') {
          var rg = el.querySelector('input');
          rg.addEventListener('input', function () { self.paintRange(rg); el.querySelector('[data-v="' + i + '"]').textContent = rg.value + '%'; });
          rg.addEventListener('change', function () { self.call('number', 'set_value', { entity_id: it.entity, value: Number(rg.value) }, el); });
        } else if (t === 'interruptor') {
          el.addEventListener('click', function () { self.call('switch', el.classList.contains('on') ? 'turn_off' : 'turn_on', { entity_id: it.entity }, el); });
        } else if (t === 'clima') {
          el.querySelector('.sw').addEventListener('click', function () {
            var sw = it.switch || it.entity.replace('climate.', 'switch.').replace('_climate_control', '_climate');
            self.call('switch', el.classList.contains('on') ? 'turn_off' : 'turn_on', { entity_id: sw }, el);
          });
          el.querySelectorAll('button').forEach(function (bt) {
            bt.addEventListener('click', function () {
              var st = self._h.states[it.entity]; if (!st) return;
              var cur = Number(st.attributes.temperature) || 20, nv = Math.max(it.min || 14, Math.min(it.max || 30, cur + Number(bt.getAttribute('data-d')) * (it.step || 0.5)));
              el.querySelector('[data-tt="' + i + '"]').textContent = fmtN(nv, 1);
              clearTimeout(self._ct); self._ct = setTimeout(function () { self.call('climate', 'set_temperature', { entity_id: it.entity, temperature: nv }, el); }, 900);
            });
          });
        } else if (t !== 'grafico') {
          el.addEventListener('click', function () { if (!it.entity) return; var ev = new Event('hass-more-info', { bubbles: true, composed: true }); ev.detail = { entityId: it.entity }; self.dispatchEvent(ev); });
        }
      });
      if (this._h) this.u();
    }
    set hass(h) { this._h = h; if (this.r) this.u(); }
    getCardSize() { return Math.ceil((this.c.items || []).length / 2) + 1; }
    getGridOptions() { return { columns: 12, min_columns: 6 }; }
    call(dom, svc, data, el) {
      var self = this; el.classList.add('pend');
      this._h.callService(dom, svc, data).then(function () { setTimeout(function () { el.classList.remove('pend'); }, 1200); }).catch(function () { el.classList.remove('pend'); self.u(); });
    }
    paintRange(rg) { var p = (rg.value - rg.min) / (rg.max - rg.min) * 100; rg.style.setProperty('--p', p + '%'); }
    calmo() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    cresce(rg) {
      var el = rg.closest('.it'), alvo = (rg.value - rg.min) / (rg.max - rg.min) * 100, t0 = null;
      if (this.calmo()) { rg.style.setProperty('--p', alvo + '%'); return; }
      el._crescendo = true; rg.style.setProperty('--p', '0%');
      var passo = function (t) { if (t0 == null) t0 = t + 300; var k = Math.max(0, Math.min(1, (t - t0) / 1200)), e = 1 - Math.pow(1 - k, 3);
        rg.style.setProperty('--p', (alvo * e) + '%'); if (k < 1) requestAnimationFrame(passo); else el._crescendo = false; };
      requestAnimationFrame(passo);
    }
    conta(b, f) {
      var el = b.closest('.it'), dec = (f.t.split(',')[1] || '').length, alvo = Number(f.t.replace(/\./g, '').replace(',', '.')), t0 = null;
      var escreve = function (txt) { b.innerHTML = ''; b.appendChild(document.createTextNode(txt)); if (f.u) { var ii = document.createElement('i'); ii.textContent = f.u; b.appendChild(ii); } };
      if (this.calmo() || isNaN(alvo)) { escreve(f.t); return; }
      el._contando = true;
      var passo = function (t) { if (t0 == null) t0 = t + 200; var k = Math.max(0, Math.min(1, (t - t0) / 1300)), e = 1 - Math.pow(1 - k, 3);
        escreve(k < 1 ? fmtN(alvo * e, dec) : f.t); if (k < 1) requestAnimationFrame(passo); else el._contando = false; };
      requestAnimationFrame(passo);
    }
    fmt(it, st) {
      var v = st.state, a = st.attributes || {}, u = a.unit_of_measurement || '', n = Number(v), t = it.type || 'valor';
      if (v === 'unavailable' || v === 'unknown') return { t: it.vazio || 'Sem dados' , off: true };
      if (t === 'estado') {
        var on = ['on', 'open', 'true', 'unlocked'].indexOf(v) > -1;
        var txt = it.textos ? it.textos[on ? 0 : 1] : (on ? 'Sim' : 'Não');
        return { t: txt, al: on && it.alerta !== false, ac: on && it.alerta === false, off: !on && it.alerta === false };
      }
      if (t === 'trinco') return { t: v === 'locked' ? 'Trancado' : v === 'unlocked' ? 'Destrancado' : v, al: v === 'unlocked' };
      if (t === 'hora') return { t: String(v).slice(0, 5) };
      if (isNaN(n)) return { t: v };
      if (it.converter === 'kwh' && /^wh$/i.test(u)) { n = n / 1000; u = 'kWh'; }
      var d = it.decimais != null ? it.decimais : (Math.abs(n) >= 100 ? 0 : 1);
      if (u === '%' && it.decimais == null) d = 0;
      var al = (it.abaixo != null && n < it.abaixo) || (it.acima != null && n > it.acima);
      return { t: fmtN(n, d), u: u, al: al };
    }
    u() {
      var self = this, h = this._h;
      this.c.items.forEach(function (it, i) {
        var el = self.r.querySelector('.it[data-i="' + i + '"]'); if (!el || el.classList.contains('pend')) return;
        var t = it.type || 'valor', st = it.entity && h.states[it.entity];
        if (t === 'grafico') { self.chart(it, i); return; }
        if (!st) { var b0 = el.querySelector('[data-v="' + i + '"]'); if (b0) b0.textContent = '—'; return; }
        if (t === 'limite') {
          var rg = el.querySelector('input'); rg.value = st.state;
          if (self._intro === 'run' && !el._contado) { el._contado = true; self.cresce(rg); } else if (!el._crescendo) self.paintRange(rg);
          el.querySelector('[data-v="' + i + '"]').textContent = Math.round(Number(st.state)) + '%';
          el.querySelector('[data-s="' + i + '"]').textContent = it.nota || '';
          var tk = [], stp = Number(rg.step) * ((Number(rg.max) - Number(rg.min)) / Number(rg.step) > 6 ? 2 : 1); for (var x = Number(rg.min); x <= Number(rg.max); x += stp) tk.push('<span' + (x === Math.round(Number(st.state)) ? ' class="s"' : '') + '>' + x + '%</span>');
          el.querySelector('[data-t="' + i + '"]').innerHTML = tk.join('');
          return;
        }
        if (t === 'interruptor') { var on = st.state === 'on'; el.classList.toggle('on', on); el.classList.toggle('off', !on); el.querySelector('[data-v="' + i + '"]').textContent = on ? 'Ligado' : 'Desligado'; return; }
        if (t === 'clima') {
          var sw = h.states[it.switch || it.entity.replace('climate.', 'switch.').replace('_climate_control', '_climate')];
          var con = (sw && sw.state === 'on') || (st.state !== 'off' && st.state !== 'unavailable');
          el.classList.toggle('on', con);
          el.querySelector('[data-v="' + i + '"]').textContent = con ? 'Ligada' : 'Desligada';
          el.querySelector('[data-tt="' + i + '"]').textContent = fmtN(Number(st.attributes.temperature) || 0, 1);
          return;
        }
        var f = self.fmt(it, st), b = el.querySelector('[data-v="' + i + '"]');
        el.classList.toggle('al', !!f.al); el.classList.toggle('ac', !!f.ac); el.classList.toggle('off', !!f.off);
        if (self._intro === 'run' && !el._contado && /^[\d.,]+$/.test(f.t)) { el._contado = true; self.conta(b, f); return; }
        if (el._contando) return;
        b.innerHTML = ''; b.appendChild(document.createTextNode(f.t)); if (f.u) { var ii = document.createElement('i'); ii.textContent = f.u; b.appendChild(ii); }
        el.classList.toggle('al', !!f.al); el.classList.toggle('ac', !!f.ac); el.classList.toggle('off', !!f.off);
      });
    }
    chart(it, i) {
      var self = this;
      if (this._gq && Date.now() - this._gq < 6e5) { this.drawChart(it, i); return; }
      if (!this._h.callWS) return;
      this._gq = Date.now();
      var hrs = it.hours || 72, end = new Date(), start = new Date(end - hrs * 36e5), ids = [it.entity, it.entity2].filter(Boolean);
      this._h.callWS({ type: 'history/history_during_period', start_time: start.toISOString(), end_time: end.toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false }).then(function (res) {
        var rd = function (id) { return ((res && res[id]) || []).map(function (x) { return [x.lu !== undefined ? x.lu * 1000 : Date.parse(x.last_changed), Number(x.s !== undefined ? x.s : x.state)]; }).filter(function (q) { return !isNaN(q[0]) && !isNaN(q[1]); }); };
        self._g1 = rd(it.entity); self._g2 = it.entity2 ? rd(it.entity2) : []; self.drawChart(it, i);
      }).catch(function () {});
    }
    drawChart(it, i) {
      var svg = this.r.querySelector('[data-ch="' + i + '"]'); if (!svg) return;
      var hrs = it.hours || 72, now = Date.now(), t0 = now - hrs * 36e5;
      var X = function (t) { return Math.max(0, (t - t0) / (hrs * 36e5) * 300); };
      var cur = this._h.states[it.entity], s1 = (this._g1 || []).slice(); if (cur && !isNaN(Number(cur.state))) s1.push([now, Number(cur.state)]);
      var path = function (pts, Y) { var d = '', py = null; pts.forEach(function (p, k) { var x = X(p[0]).toFixed(1), y = Y(p[1]).toFixed(1); d += k ? ' L' + x + ' ' + py + ' L' + x + ' ' + y : 'M' + x + ' ' + y; py = y; }); return d; };
      var Y1 = function (v) { return 104 - v / 100 * 96; };
      var pmax = Math.max(8, Math.max.apply(null, (this._g2 || []).map(function (p) { return p[1]; }).concat([0])) * 1.15);
      var Y2 = function (v) { return 104 - v / pmax * 60; };
      var grid = [25, 50, 75].map(function (g) { return '<line x1="0" x2="300" y1="' + Y1(g) + '" y2="' + Y1(g) + '" stroke="rgba(255,255,255,.06)"/>'; }).join('');
      var d1 = s1.length ? path(s1, Y1) : '', d2 = (this._g2 || []).length ? path(this._g2, Y2) : '';
      svg.innerHTML = '<defs><linearGradient id="gg' + i + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DC63F" stop-opacity=".3"/><stop offset="1" stop-color="#8DC63F" stop-opacity="0"/></linearGradient></defs>' + grid +
        (d1 ? '<path class="ar" d="' + d1 + ' L' + X(s1[s1.length - 1][0]).toFixed(1) + ' 110 L' + X(s1[0][0]).toFixed(1) + ' 110 Z" fill="url(#gg' + i + ')"/><path class="ln" pathLength="1" d="' + d1 + '" fill="none" stroke="#8DC63F" stroke-width="2" vector-effect="non-scaling-stroke"/>' : '') +
        (d2 ? '<path class="ln" pathLength="1" d="' + d2 + '" fill="none" stroke="#5FE3D0" stroke-width="2" vector-effect="non-scaling-stroke"/>' : '');
      var dias = function (t) { return new Date(t).toLocaleDateString('pt-PT', { weekday: 'short' }); };
      this.r.querySelector('[data-ax="' + i + '"]').innerHTML = '<span>' + dias(t0) + '</span><span>' + dias(t0 + hrs * 18e5) + '</span><span>agora</span>';
    }
  }
  if (!customElements.get('eniro-grupo-card')) customElements.define('eniro-grupo-card', ENiroGrupo);

  window.customCards = window.customCards || [];
  window.customCards.push({ type: 'eniro-card', name: 'Cartão e-Niro', description: 'Estado do Kia e-Niro, em português' });
  window.customCards.push({ type: 'eniro-grupo-card', name: 'Grupo e-Niro', description: 'Bloco de sensores ou controlos no estilo e-Niro' });
  window.customCards.push({ type: 'eniro-soh-card', name: 'SoH e-Niro', description: 'Saúde da bateria medida no evDash, guardada à mão' });
  window.customCards.push({ type: 'eniro-seguranca-card', name: 'Segurança e-Niro', description: 'Portas, mala, capô, pneus e trinco do e-Niro, vistos de cima' });
})();
