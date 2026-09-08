# Lanzador ADITMEX: sirve app/dist por http local (127.0.0.1) y abre Chrome en modo app.
# Necesario porque file:// bloquea <script type="module"> y CSS por CORS -- pantalla en blanco.
$distPath = "D:\srv\Aditmex\adtmex_ventas\app\dist"
$port = 4173
$url = "http://127.0.0.1:$port/index.html"

$listening = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $listening) {
    $python = (Get-Command python -ErrorAction SilentlyContinue).Source
    if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue).Source }
    Start-Process -FilePath $python -ArgumentList "-m", "http.server", "$port", "--bind", "127.0.0.1" `
        -WorkingDirectory $distPath -WindowStyle Hidden
    Start-Sleep -Milliseconds 700
}

Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList `
    "--app=$url", "--start-maximized", "--user-data-dir=`"$env:LOCALAPPDATA\ADITMEX-App`""
