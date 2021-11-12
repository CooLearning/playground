#!/bin/bash

NEXT_VERSION=$1

function update_json () {
    new_json="$(jq -r '.version = "'$NEXT_VERSION'"' $path)"
    echo "$new_json" > $path
}

path='package.json'

update_json
