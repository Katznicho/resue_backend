<?php

namespace App\Traits;

use FFMpeg\FFProbe;


trait DataTrait
{

    function getFrameRate($path)
{
    $ffprobe = FFProbe::create();
    $stream = $ffprobe->streams($path)->videos()->first();
    return $stream->getFrameRate();
}

function getDuration($path)
{
    $ffprobe = FFProbe::create();
    $format = $ffprobe->format($path);
    return $format->get('duration');
}

function getUploadRate($path, $startTime, $endTime, $fileSize)
{
    $duration = $endTime - $startTime;
    $size = filesize($path) - $fileSize;
    return $size / $duration;
}
}

