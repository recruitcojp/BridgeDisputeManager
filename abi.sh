#!/bin/bash
abiPath="../v1-contracts/artifacts/contracts/tunnel/PolygonChildCheckPointManager.sol/" #Rewrite it according to your composition.
abiName="PolygonChildCheckPointManager.json"
saveAbiPath="./abi/"

abi=$(cat ${abiPath}${abiName} | jq '.abi')
echo $abi > ${saveAbiPath}${abiName}
