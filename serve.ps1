# Lightweight static file server for the ATIL local rebuild
# Serves the folder this script lives in, on http://localhost:4173/
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.json' = 'application/json'
  '.txt'  = 'text/plain; charset=utf-8'
  '.woff' = 'font/woff'
  '.woff2'= 'font/woff2'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try { $listener.Start() } catch { Write-Host "FATAL: could not start: $_"; exit 1 }
Write-Host "Serving $root at http://localhost:$port/"

function Resolve-LocalFile([string]$urlPath) {
  if ($urlPath -eq '/' -or $urlPath -eq '') { $urlPath = '/index.html' }
  $safe = $urlPath.TrimStart('/') -replace '/', '\'
  if ($safe -match '\.\.') { return $null }
  $candidates = @(
    (Join-Path $root $safe),
    (Join-Path $root ($safe + '.html')),
    (Join-Path $root ($safe + '\index.html'))
  )
  foreach ($c in $candidates) {
    if (Test-Path $c -PathType Leaf) { return $c }
  }
  return $null
}

while ($listener.IsListening) {
  try {
    $ctx  = $listener.GetContext()
    $resp = $ctx.Response
    $path = $ctx.Request.Url.AbsolutePath

    # Strip cache-busting querystrings already handled by AbsolutePath.
    $file = Resolve-LocalFile $path
    if (-not $file) {
      $file = Join-Path $root '404.html'
      $resp.StatusCode = 404
    }

    $ext  = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
    if ($mime.ContainsKey($ext)) { $resp.ContentType = $mime[$ext] }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $resp.ContentLength64 = $bytes.Length
    $resp.Headers.Add('Cache-Control', 'no-cache')
    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
    $resp.OutputStream.Close()
  } catch {
    # keep serving on individual request errors (e.g. client disconnects)
    try { if ($resp) { $resp.OutputStream.Close() } } catch {}
  }
}
