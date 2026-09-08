# Instalador ADITMEX -- copia la app a %LOCALAPPDATA%\ADITMEX (sin admin) y crea accesos directos.
$ErrorActionPreference = "Stop"
$payloadDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$installDir = Join-Path $env:LOCALAPPDATA "ADITMEX"

New-Item -ItemType Directory -Force -Path $installDir | Out-Null
$distTarget = Join-Path $installDir "dist"
if (Test-Path $distTarget) { Remove-Item $distTarget -Recurse -Force }
Expand-Archive -Path (Join-Path $payloadDir "dist.zip") -DestinationPath $installDir -Force
Copy-Item -Path (Join-Path $payloadDir "launch-aditmex.ps1") -Destination $installDir -Force
Copy-Item -Path (Join-Path $payloadDir "icon.ico") -Destination $installDir -Force

$launcher = Join-Path $installDir "launch-aditmex.ps1"
$icon = Join-Path $installDir "icon.ico"
$target = "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe"
$args = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$launcher`""

$sh = New-Object -ComObject WScript.Shell
$shortcutPaths = @(
    (Join-Path ([Environment]::GetFolderPath("Desktop")) "ADITMEX.lnk"),
    (Join-Path ([Environment]::GetFolderPath("StartMenu")) "Programs\ADITMEX.lnk")
)
foreach ($p in $shortcutPaths) {
    $lnk = $sh.CreateShortcut($p)
    $lnk.TargetPath = $target
    $lnk.Arguments = $args
    $lnk.WorkingDirectory = $installDir
    $lnk.IconLocation = "$icon,0"
    $lnk.Save()
}

Add-Type -AssemblyName System.Windows.Forms | Out-Null
[System.Windows.Forms.MessageBox]::Show("ADITMEX instalado. Acceso directo creado en Escritorio y Menu Inicio.", "ADITMEX", "OK", "Information") | Out-Null
