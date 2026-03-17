# apply_updates.ps1 — Apply 2 fixes to index.html

$file = "index.html"
$content = Get-Content $file -Raw

# Fix 1: Windows Temp Cleaner icon
$content = $content -replace '<div class="pc-icon"><i class="devicon-powershell-plain colored"></i></div>', '<div class="pc-icon"><i class="fas fa-terminal"></i></div>'

# Fix 2: DevOps Home Lab — add icon + 03 number
$old = '<div class="homelab-card">
    <div class="hl-left">
      <div class="sec-label purple" style="margin-bottom:.8rem">Home Lab</div>'

$new = '<div class="homelab-card">
    <div class="hl-left">
      <div class="pc-header" style="margin-bottom:.8rem">
        <div class="pc-icon"><i class="fas fa-server"></i></div>
        <span class="pc-number">03</span>
      </div>
      <div class="sec-label purple" style="margin-bottom:.8rem">Home Lab</div>'

$content = $content.Replace($old, $new)

Set-Content $file $content -NoNewline
Write-Host "✅ Done! index.html updated successfully." -ForegroundColor Green
