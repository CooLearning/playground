#!/bin/bash

VERSION=$1

function archiveRelease () {
  cd dist && zip ../coolearning-playground-v$VERSION.zip ./*
}

archiveRelease
