#!/bin/bash -
map="$1"
dimensions=$(identify -format "%w %h" $map)
width=$(echo $dimensions | awk '{print $1}')
height=$(echo $dimensions | awk '{print $2}')
zoom="0"

tiles="$(dirname $map)/tiles"
rm -rf $tiles
mkdir $tiles

echo "Generating tiles of $map ($width x $height)..."
echo "  level 0: full size"
convert $map -crop 256x256 -set filename:tile "%[fx:page.x/256]-%[fx:page.y/256]" -background none -extent 256x256 "$tiles/0-%[filename:tile].png"
while [ $width -gt 256 -o $height -gt 256 ]; do
	width=$(($width/2))
	height=$(($height/2))
	zoom=$(($zoom+1))
	echo "  level $zoom: $width x $height"
	convert $map -resize ${width}x${height} -crop 256x256 -set filename:tile "%[fx:page.x/256]-%[fx:page.y/256]" -background none -extent 256x256 "$tiles/$zoom-%[filename:tile].png"
done