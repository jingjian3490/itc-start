<?php

/**
 * @file
 * Fix subtitles for CapCut.
 * Run with: ddev drush scr scripts/fix_subs.php
 */

// -----------------------------------------------------------
// 关键点：在 DDEV 容器内部，项目根目录永远是 /var/www/html
// 不要在意您在 WSL 或 Windows 里看到的是什么路径
// -----------------------------------------------------------
$directory = '/var/www/html';

echo "--------------------------------------------------\n";
echo "🔍 (容器内) 正在扫描目录: $directory\n";

// 检查目录是否存在，防止报错
if (!is_dir($directory)) {
  echo "❌ 严重错误: 容器内找不到 /var/www/html 目录。\n";
  echo "   请确认您是在 DDEV 环境下运行此脚本。\n";
  return;
}

$files = glob($directory . '/*.srt');

// 排除掉 output_ 开头的文件
$files = array_filter($files, function($f) {
  return !strpos(basename($f), 'output_');
});

if (empty($files)) {
  echo "❌  在 $directory 未找到 .srt 文件。\n";
  echo "   请确认 video.srt 是否真的在项目根目录下。\n";
  // 调试：列出当前有什么文件，帮您确认位置对不对
  echo "   当前目录下的文件有: " . implode(", ", array_slice(scandir($directory), 0, 10)) . "...\n";
  return;
}

$filepath = reset($files);
$filename = basename($filepath);

echo "📂 正在读取文件: $filename\n";

$content = file_get_contents($filepath);
$content = str_replace("\r\n", "\n", $content);

// 正则匹配：序号 -> 时间 -> 英文 -> 中文
$pattern = '/(\d+)\n(\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3})\n(.+?)\n(.+?)(?=\n\n|$)/s';

preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

$total_count = count($matches);

if ($total_count === 0) {
  echo "⚠️  未识别到有效字幕。请检查格式。\n";
  return;
}

echo "📊 共识别到 {$total_count} 条双语字幕。\n";

$english_parts = [];
$chinese_parts = [];

foreach ($matches as $index => $match) {
  $timecode = trim($match[2]);
  $eng_text = trim($match[3]);
  $chn_text = trim($match[4]);

  // 英文部分 ID: 1 ~ N
  $eng_id = $index + 1;
  $english_parts[] = "$eng_id\n$timecode\n$eng_text";

  // 中文部分 ID: N+1 ~ 2N
  $chn_id = $eng_id + $total_count;
  $chinese_parts[] = "$chn_id\n$timecode\n$chn_text";
}

$output_content = implode("\n\n", $english_parts) . "\n\n" . implode("\n\n", $chinese_parts);

$output_file = $directory . '/output_' . $filename;
file_put_contents($output_file, $output_content);

echo "✅ 处理完成！\n";
echo "   输出文件 (WSL路径): /var/www/itc-start/output_$filename\n";
echo "--------------------------------------------------\n";
