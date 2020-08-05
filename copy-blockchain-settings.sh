path="./resources/constants"

if [[ -d $path ]]
then
    echo "Copy blockchain settings into web ui project..."
    if [[ ! -d ./src/app/constants ]]
    then
        mkdir ./src/app/constants
    fi
    cp -r $path/* ./src/app/constants/
fi
echo "finished copying blockchain settings"
