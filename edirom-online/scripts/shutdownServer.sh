#!/bin/bash

CALLDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$CALLDIR/../chrome/jetty"

java -jar -DSTOP.PORT=19100 -DSTOP.KEY=blaise start.jar --stop
