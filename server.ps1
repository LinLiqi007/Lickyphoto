$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8081/')
$listener.Start()
Write-Host 'Server running at http://localhost:8081/'

$rootDir = 'c:\Users\14737\Documents\trae_projects\photo'
$dataDir = Join-Path $rootDir 'data'

function Read-RequestBody($ctx) {
  $len = $ctx.Request.ContentLength64
  if ($len -gt 0) {
    $buf = New-Object byte[] $len
    $ctx.Request.InputStream.Read($buf, 0, $len) | Out-Null
    return [System.Text.Encoding]::UTF8.GetString($buf)
  }
  return ''
}

function Send-Json($ctx, $json, $status = 200) {
  $ctx.Response.StatusCode = $status
  $ctx.Response.AddHeader('Access-Control-Allow-Origin', '*')
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $ctx.Response.ContentType = 'application/json; charset=utf-8'
  $ctx.Response.ContentLength64 = $bytes.Length
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
}

function Send-Text($ctx, $text, $mime, $status = 200) {
  $ctx.Response.StatusCode = $status
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
  $ctx.Response.ContentType = $mime
  $ctx.Response.ContentLength64 = $bytes.Length
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.AbsolutePath
    $method = $ctx.Request.HttpMethod

    # === API endpoints ===
    if ($path.StartsWith('/api/')) {
      # CORS preflight
      if ($method -eq 'OPTIONS') {
        $ctx.Response.AddHeader('Access-Control-Allow-Origin', '*')
        $ctx.Response.AddHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        $ctx.Response.AddHeader('Access-Control-Allow-Headers', 'Content-Type')
        $ctx.Response.StatusCode = 200
        $ctx.Response.Close()
        continue
      }

      $fileMap = @{
        '/api/photos'   = 'photos.json'
        '/api/likes'     = 'likes.json'
        '/api/messages'  = 'messages.json'
        '/api/featured'  = 'featured.json'
        '/api/password'  = 'password.json'
        '/api/comments'  = 'comments.json'
      }

      $fileName = $fileMap[$path]
      if (-not $fileName) {
        Send-Json $ctx '{"error":"not found"}' 404
        $ctx.Response.Close()
        continue
      }

      $filePath = Join-Path $dataDir $fileName

      if ($method -eq 'GET') {
        if (Test-Path $filePath) {
          $json = [System.IO.File]::ReadAllText($filePath)
          Send-Json $ctx $json
        } else {
          Send-Json $ctx '[]'
        }
      }
      elseif ($method -eq 'POST') {
        $body = Read-RequestBody $ctx
        try {
          $null = ConvertFrom-Json $body
          [System.IO.File]::WriteAllText($filePath, $body, [System.Text.Encoding]::UTF8)
          Send-Json $ctx '{"ok":true}'
        } catch {
          Send-Json $ctx '{"error":"invalid json"}' 400
        }
      }
      else {
        Send-Json $ctx '{"error":"method not allowed"}' 405
      }
      $ctx.Response.Close()
      continue
    }

    # === Static files ===
    if ($path -eq '/') { $path = '/index.html' }

    $file = Join-Path $rootDir $path.TrimStart('/')

    if (Test-Path $file -PathType Leaf) {
      $buf = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file)
      $mime = switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css'  { 'text/css; charset=utf-8' }
        '.js'   { 'application/javascript; charset=utf-8' }
        '.json' { 'application/json' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.webp' { 'image/webp' }
        '.gif'  { 'image/gif' }
        '.svg'  { 'image/svg+xml' }
        '.ico'  { 'image/x-icon' }
        default { 'application/octet-stream' }
      }
      $ctx.Response.ContentType = $mime
      $ctx.Response.ContentLength64 = $buf.Length
      $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $ctx.Response.Close()
  } catch {
    Write-Host "Error: $_"
    try { $ctx.Response.Close() } catch {}
  }
}
