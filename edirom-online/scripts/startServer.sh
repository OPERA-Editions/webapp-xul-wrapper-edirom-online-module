#!/bin/bash

CALLDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$CALLDIR/../chrome/jetty"

java -jar -Djava.awt.headless=true -DSTOP.PORT=19100 -DSTOP.KEY=blaise -XX:+HeapDumpOnOutOfMemoryError -Xmx1024m start.jar
