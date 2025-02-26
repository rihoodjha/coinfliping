($env:CI = "true") -and (npm test)
$buildResult = Invoke-Expression "npm run build"
if ($buildResult -match "fail") {
    Write-Output "Build failed with result: $buildResult"
    git reset --hard
    exit 1
}
else {
    firebase deploy --project coinflipgame-50514

    $testResult = Invoke-Expression "npx cypress run --record --key cd7ee507-0ac6-4474-893e-c6e307aa3669 --quiet"

    if ($testResult -match "fail") {
   
        Write-Output "Test failed with result: $testResult" 
        Write-Output "Reseting the deployment"
        npm reset --hard
        ($env:CI = "true") -and (npm test)
        $buildResult = Invoke-Expression "npm run build"
        if ($buildResult -match "fail") {
            Write-Output "Build failed with result: $buildResult"
            exit 1
            }
            else {
                firebase deploy --project coinflipgame-50514
                 $testResult = Invoke-Expression "npx cypress run --record --key cd7ee507-0ac6-4474-893e-c6e307aa3669 --quiet"
                if ($testResult -match "fail") {
                    Write-Output "Test failed with result: $testResult"
                    exit 1
                }
            }

    }
    else {
        Write-Output "Test passed"
    }
    Write-Output "Build passed"
}
