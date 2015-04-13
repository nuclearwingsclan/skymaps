<?php

	include('/var/www/html/database.php');
	as_database_connect();

	$updates = array();
	$workdir = '/var/www/html/maps/';
	$query = "SELECT * FROM `as_maps_index`";
	$data = as_database_query($query);
	while ($map = mysql_fetch_assoc($data)) {
		$update = $map['update'];
		$date = explode('-', $map['date']);

		$meta = array(
			'caption' => $map['caption'],
			'navigator' => $map['navigator'],
			'date' => $date[2].'.'.$date[1].'.'.$date[0],
			'size' => array('width' => (int)$map['w'], 'height' => (int)$map['h'])
		);
		if(($map['goX'] != 0) || ($map['goY'] != 0)) {
			$meta['center'] = array('x' => (int)$map['goX'], 'y' => (int)$map['goY']);
		}

		$objects = array();
		$query = "SELECT * FROM (SELECT * FROM (SELECT * FROM `as_maps_objects` WHERE `region` = '".$map['region']."' AND `map` = '".$map['map']."' AND `type` != 'exithole' ORDER BY `id` DESC) AS `deep` GROUP BY `sid` ORDER BY `sid` DESC) AS `published` WHERE `published` = 1  ORDER BY `sid` DESC";
		$data1 = as_database_query($query);
		while ($object = mysql_fetch_assoc($data1))
		{
			if ($object['update'] > $update) {
				$update = $object['update'];
			}

			if ($object['type'] == 'drop') {
				$meta['drop'] = array_map('trim', explode(',', $object['var1']));
				continue;
			}

			$line = array(
				'type' => $object['type'],
				'x' => (int)$object['var1'],
				'y' => (int)$object['var2']
			);

			if (!((($object['type'] == 'hole') || ($object['type'] == 'blackhole') || ($object['type'] == 'maphole') || ($object['type'] == 'station') || ($object['type'] == 'instance') || ($object['type'] == 'riba')) && ($object['var9'] != '')))
			{
				if ($object['type'] == 'boss') {
					$line['caption'] = $object['var3'];
					$line['class'] = $object['var4'];
					if ($object['var5']) $line['mode'] = $object['var5'];
				}
				else if ($object['type'] == 'label') {
					$line['text'] = $object['var3'];
					if ($object['var4']) $line['link'] = $object['var4'];
				}
				else if ($object['type'] == 'riba') {
					$line['type'] = 'fish';
					if ($object['var3']) $line['list'] = array_map('trim', explode(',', $object['var3']));
				}
				else if ($object['type'] == 'quest') {
					$line['caption'] = $object['var3'];
					if ($object['var4']) $line['link'] = $object['var4'];
					if ($object['var5']) $line['tip'] = $object['var5'];
				}
				else if ($object['type'] == 'flager') {
					$line['easy'] = $object['var3'];
					$line['hard'] = $object['var4'];
					if ($object['var5']) $line['link'] = $object['var5'];
				}
				else if ($object['type'] == 'factory') {
					$line['caption'] = $object['var3'];
					if ($object['var4']) $line['production'] = array_map('trim', explode('_', $object['var4']));
					if ($object['var6']) $line['link'] = $object['var6'];
				}
				else if ($object['type'] == 'master') {
					if ($object['var3']) $line['list'] = array_map('trim', explode(',', $object['var3']));
					if ($object['var4']) $line['link'] = $object['var4'];
				}
				else if ($object['type'] == 'npc') {
					$line['caption'] = $object['var3'];
					$line['npc'] = $object['var4'];
				}

			} else if (($object['type'] != 'station') && ($object['type'] != 'instance')) {
				$query = "SELECT * FROM `as_maps_objects` WHERE `sid` = '".$object['var9']."' ORDER BY `update` DESC LIMIT 0,1";
				$data2 = as_database_query($query);
				if ($exit = mysql_fetch_assoc($data2))
				{
					if ($object['type'] != 'blackhole')
					{
						$line['region'] = $exit['region'];
						$line['map'] = $exit['map'];
						$query = "SELECT * FROM `as_maps_index` WHERE `region` = '".$exit['region']."' AND `map` = '".$exit['map']."'";
						$data2 = as_database_query($query);
						if ($map1 = mysql_fetch_assoc($data2)) {
							$line['caption'] = $map1['caption'];
						} else {
							$line['caption'] = 'Неизвестность';
						}
					}
					$line['goto'] = array(
						'x' => (int)$exit['var1'],
						'y' => (int)$exit['var2']
					);

					if ($object['type'] == 'blackhole') $line['type'] = 'wormhole';
				}
				else
				{
					$line = array();
				}
			}
			else if ($object['type'] == 'station')
			{
				$line['caption'] = $object['var3'];

				$items = array();
				$streams = explode(',',$object['var9']);
				foreach ($streams as $stream)
				{
					$tags = explode('_',$stream);
					$query = "SELECT * FROM `as_maps_objects` WHERE `sid` = '".$tags[0]."' ORDER BY `update` DESC LIMIT 0,1";
					$data2 = as_database_query($query);
					if($target = mysql_fetch_assoc($data2))
					{
						if(count($tags) == 1) { $caption = $target['var3']; }
						else if(count($tags) == 2) { $caption = html_entity_decode($tags[1]); }
						$item = array();
						$item['caption'] = $caption;
						$item['region'] = $target['region'];
						$item['map'] = $target['map'];
						$item['x'] = (int)$target['var1'];
						$item['y'] = (int)$target['var2'];
						$items[] = $item;
					}
				}
				$line['list'] = $items;
			}
			else if ($object['type'] == 'instance')
			{
				$items = array();
				$streams = explode(',',$object['var9']);

				if (count($streams) > 1)
				{
					$line['caption'] = $object['var3'];
					foreach ($streams as $stream)
					{
						$tags = explode('_',$stream);
						$query = "SELECT * FROM `as_maps_index` WHERE `id` = '".$tags[0]."'";
						$data2 = as_database_query($query);
						if ($target = mysql_fetch_assoc($data2))
						{
							if (count($tags) == 1) { $caption = $target['caption']; }
							else if (count($tags) == 2) { $caption = html_entity_decode($tags[1]); }

							$item = array();
							$item['caption'] = $caption;
							$item['region'] = $target['region'];
							$item['map'] = $target['map'];
							$item['goX'] = (int)$target['goX'];
							$item['goY'] = (int)$target['goY'];
							$items[] = $item;
						}
					}
					$line['list'] = $items;
				}
				else
				{
					$tags = explode('_',$streams[0]);
					$query = "SELECT * FROM `as_maps_index` WHERE `id` = '".$tags[0]."'";
					$data2 = as_database_query($query);
					if ($target = mysql_fetch_assoc($data2))
					{
						if (count($tags) == 1) { $caption = $target['caption']; }
						else if (count($tags) == 2) { $caption = $tags[1]; }

						$line['region'] = $target['region'];
						$line['map'] = $target['map'];
						$line['caption'] = $caption;
						$line['goX'] = (int)$target['goX'];
						$line['goY'] = (int)$target['goY'];
					}
				}
			}

			$geojson = array(
				'type' => 'Feature',
				'geometry' => array(
					'type' => 'Point',
					'coordinates' => [$line['x'], -($line['y'])]
				),
				'properties' => $line
			);

			$objects[] = $geojson;
		}
		$mapdata = array(
			'meta' => $meta,
			'objects' => $objects
		);

		$file = $workdir.$map['region'].'/'.$map['map'].'/mapdata.json';
		file_put_contents($file, json_encode($mapdata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

		$query = "UPDATE `as_maps_index` SET `update` = '".$update."' WHERE `id` = '".$map['id']."'";
		as_database_query($query);
		$updates[] = $map['region'].'/'.$map['map'].'_'.$update;
	}
	file_put_contents($workdir.'updates.txt', implode('&',$updates));

	as_database_disconnect();
	echo '0';

?>
