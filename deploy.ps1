<#
PowerShell deploy helper for the portfolio-website repo.
Run this from the repo root in PowerShell.
#>
param(
    [string]$CommitMessage = "Prepare GitHub Pages deploy",
    [string]$Branch = "main"
)

Write-Host "Staging changes..."
git add .

Write-Host "Committing changes..."
try {
    git commit -m "$CommitMessage"
} catch {
    Write-Host "No changes to commit or commit failed: $_"
}

Write-Host "Pushing to origin/$Branch..."
git push origin $Branch

Write-Host "If GitHub Pages is enabled, the deploy workflow should run shortly."
