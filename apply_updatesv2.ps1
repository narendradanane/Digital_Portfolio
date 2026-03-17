# apply_updates.ps1 — Apply fixes to index.html

$file = "index.html"
$content = Get-Content $file -Raw

# Fix 1: Windows Temp Cleaner icon
$content = $content -replace '<div class="pc-icon"><i class="devicon-powershell-plain colored"></i></div>', '<div class="pc-icon"><i class="fas fa-terminal"></i></div>'

# Fix 2: DevOps Home Lab — add icon top-left + 03 top-right (matching proj-card style)
$old = '<div class="homelab-card">
    <div class="hl-left">
      <div class="sec-label purple" style="margin-bottom:.8rem">Home Lab</div>'

$new = '<div class="homelab-card" style="position:relative">
    <div class="pc-icon" style="position:absolute;top:1.5rem;left:1.8rem"><i class="fas fa-cubes"></i></div>
    <span class="pc-number" style="position:absolute;top:1.2rem;right:1.8rem">03</span>
    <div class="hl-left" style="margin-top:3.5rem">
      <div class="sec-label purple" style="margin-bottom:.8rem">Home Lab</div>'

$content = $content.Replace($old, $new)

Set-Content $file $content -NoNewline
Write-Host "✅ Done! index.html updated successfully." -ForegroundColor Green
