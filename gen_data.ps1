$root = Join-Path $PSScriptRoot '摄影作品'
$cats = @{
    '人物'='people'
    '人文'='humanities'
    '城市'='city'
    '动物'='animal'
    '自然'='nature'
}
$catNames = @{
    '人物'='人物肖像'
    '人文'='人文纪实'
    '城市'='城市光影'
    '动物'='野生动物'
    '自然'='自然风光'
}
$titles = @('定格瞬间','光影交错','静谧时刻','灵魂之窗','故事讲述','自然之美','城市脉搏','生命灵动','岁月痕迹','温柔目光','清晨微光','黄昏剪影','夜色迷离','阳光倾泻','风中摇曳','雨后清新','雪中傲立','阳光下的微笑','静谧如诗','瞬间永恒')
$descs = @('镜头捕捉下的真实瞬间，每一张照片都承载着独特的情感与故事。','光影交织中展现最真实的质感，让时间在这一刻停留。','用快门记录下那些转瞬即逝的美好，成为永恒的回忆。','自然光线与人像姿态的完美融合，展现最动人的画面。','每一帧都是独立的故事，邀请观者进入这个视觉世界。','细致的构图与恰到好处的光线，营造出独特的氛围感。','通过镜头语言传递情感，让观者产生共鸣。','精心捕捉的瞬间，展现出被摄对象最自然的状态。','光影的节奏与色彩的韵律，构成这一幅视觉诗篇。','在平凡中发现不凡，用镜头记录生活中的每一个感动。')
$id = 1
$results = @()
foreach ($catDir in $cats.Keys) {
    $catEn = $cats[$catDir]
    $catCN = $catNames[$catDir]
    $dirPath = Join-Path $root $catDir
    if (Test-Path $dirPath) {
        $files = Get-ChildItem $dirPath -File | Sort-Object Name
        foreach ($f in $files) {
            $titleIdx = ($id - 1) % $titles.Count
            $descIdx = ($id - 1) % $descs.Count
            $title = $catCN + ' · ' + $titles[$titleIdx]
            $url = '摄影作品/' + $catDir + '/' + $f.Name
            $date = $f.LastWriteTime.ToString('yyyy-MM-dd')
            $results += [PSCustomObject]@{id=$id;title=$title;category=$catEn;description=$descs[$descIdx];image=$url;date=$date}
            $id++
        }
    }
}
$lines = @('const defaultPhotos = [')
foreach ($p in $results) {
    $lines += '  {'
    $lines += "    id: $($p.id),"
    $lines += "    title: '$($p.title)',"
    $lines += "    category: '$($p.category)',"
    $lines += "    description: '$($p.description)',"
    $lines += "    image: '$($p.image)',"
    $lines += "    date: '$($p.date)',"
    $lines += '  },'
}
$lines += '];'
$outPath = Join-Path $PSScriptRoot 'photos_gen.js'
$lines | Out-File -FilePath $outPath -Encoding utf8
Write-Host "Generated $($results.Count) photos"
