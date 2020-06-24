Powershell.exe -executionpolicy remotesigned -File ^
Deploy1.ps1 ^
    --location "westus2" ^
    --subscriptionID "{put your subscriptionID for deployment}" ^
    --CertificateEamil "{put you real email address}"