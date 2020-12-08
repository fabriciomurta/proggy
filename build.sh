#!/bin/bash

# Updated comprehensive list of RIds:
# https://github.com/dotnet/runtime/blob/master/src/libraries/pkg/Microsoft.NETCore.Platforms/runtime.json

# Available runtime identifiers in official .NET SDK are listed at:
# https://github.com/dotnet/installer#build-status
ridlist=(
 linux-x64
 osx-x64
 win-x64
 win-x86
)

# Use runtime ids specified in commandline if provided.
if [ ! -z "${1}" ]; then
 ridlist=()
 for par in "${@}"; do
  ridlist+=("${par}")
 done
fi

deploy_root="npmpk/platforms"
project_dir="./proggy"

echo "Building project for the following runtime application hosts: ${ridlist[@]}"

for rid in "${ridlist[@]}"; do
 echo "Building for runtime application host: ${rid}..."
 deploy_dest="${deploy_root}/${rid}"

 result="$(
  dotnet publish \
   "${project_dir}" \
   --runtime ${rid} \
   -p:PublishSingleFile=true \
   -p:PublishTrimmed=true \
   --configuration Release \
   --output "${deploy_dest}" \
   --nologo \
   2>&1)"
 retstat="${?}"

 if [ "${retstat}" -ne 0 ]; then
  echo "*** Build failed.

Build output:
-----
${result}
-----

Aborting build process."
  exit 1
 else
  echo "Build succeeded. Output files to: ${deploy_dest}"
 fi
done

echo "Built project to all supported platforms."