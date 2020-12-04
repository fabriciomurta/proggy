#!/bin/bash

cdout=true
if [ ! -d test ]; then
 cd ..
 cdout=false
fi

if [ ! -d test ]; then
 echo "Directory already removed."
 exit 1
fi

cd npmpk
rm proggy-0.1.0.tgz
npm pack
cd ..

rm -rf test
mkdir test
cd test
npm init --yes
npm install ../npmpk/proggy-0.1.0.tgz

node node_modules/proggy/proggy

if ${cdout}; then
 cd ..
fi
