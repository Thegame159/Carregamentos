#!/bin/sh
# Instala no servidor a atualização automática dos cartões do e-Niro.
# Corre uma vez: curl -fsSL https://raw.githubusercontent.com/Thegame159/carregamentos/main/homeassistant/instalar.sh | sudo sh
set -e
D=/opt/homeassistant/www/eniro
mkdir -p "$D"

cat > /usr/local/bin/eniro-sync <<'SYNC'
#!/bin/sh
# Vai buscar o eniro-card.js ao GitHub e só o troca se mudou e parecer válido.
D=/opt/homeassistant/www/eniro
T=$(mktemp)
if curl -fsSL --max-time 60 "https://raw.githubusercontent.com/Thegame159/carregamentos/main/homeassistant/eniro-card.js?t=$(date +%s)" -o "$T" \
   && grep -q "customElements.define('eniro-card'" "$T" \
   && ! cmp -s "$T" "$D/eniro-card.js"; then
  install -m 644 "$T" "$D/eniro-card.js"
  sha256sum "$D/eniro-card.js" | cut -c1-12 > "$D/versao.txt"
  logger -t eniro-sync "cartao atualizado para $(cat "$D/versao.txt")"
fi
rm -f "$T"
[ -f "$D/versao.txt" ] || { sha256sum "$D/eniro-card.js" | cut -c1-12 > "$D/versao.txt"; }
SYNC
chmod 755 /usr/local/bin/eniro-sync

# Carregador: o Home Assistant carrega sempre a versão mais recente, sem mexer nos Recursos nem Ctrl+F5
cat > "$D/loader.js" <<'LOADER'
fetch('/local/eniro/versao.txt', { cache: 'no-store' })
  .then(function (r) { return r.ok ? r.text() : String(Date.now()); })
  .catch(function () { return String(Date.now()); })
  .then(function (v) { return import('/local/eniro/eniro-card.js?v=' + v.trim()); });
LOADER
chmod 644 "$D/loader.js"

echo '*/5 * * * * root /usr/local/bin/eniro-sync' > /etc/cron.d/eniro-sync
chmod 644 /etc/cron.d/eniro-sync

/usr/local/bin/eniro-sync
echo "Pronto. Versao do cartao: $(cat "$D/versao.txt")"
