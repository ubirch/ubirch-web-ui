bxcsetfile="./resources/blockchain-settings.json"

if [[ -f $bxcsetfile ]]
then
    echo "Copy blockchain settings into web ui project..."
    if [[ ! -d ./src/assets/constants ]]
    then
        mkdir ./src/assets/constants
    fi
    cp $bxcsetfile ./src/assets/constants/
fi
echo "finished copying blockchain settings"
