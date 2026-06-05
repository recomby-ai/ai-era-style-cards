# AI 时代色卡

**AI 时代色卡**是一个开源的 poster 视觉风格参考库，用可视化色卡的方式展示不同海报风格在 AI 教育、智能体、数据网络、未来课堂等主题下的视觉差异。

English version: [README.md](README.md)

## 项目内容

- 140 种 poster / 海报视觉风格
- 24 张风格对比色卡图
- 默认网页预览使用压缩缩略图，点击图片可打开原始 PNG
- 每张色卡展示 2 到 6 种风格
- 每种风格包含多个小样，用于观察色彩、构图、字体气质和视觉语言
- 静态网页展示，可直接用于 GitHub Pages

## 在线预览

打开 [index.html](index.html) 即可本地预览。发布到 GitHub Pages 后，它会成为一个可浏览的风格库。

## 适合用途

- AI 时代视觉风格参考
- PPT、课程封面、活动海报风格选择
- Canva、GPT Image、Midjourney、设计课程的风格词库
- AI 教育课程的视觉系统探索
- poster 视觉风格对比和灵感收集

## 目录结构

```text
.
├── README.md
├── README.zh.md
├── index.html
├── styles.css
├── app.js
├── assets/cards/
│   ├── batch01.png
│   └── ...
├── assets/thumbs/
│   ├── batch01.jpg
│   └── ...
├── data/
│   └── batches.json
├── docs/
│   ├── style-index.zh.md
│   └── style-index.en.md
```

## 风格范围

本项目目前覆盖参考清单前 9 类，共 140 种风格：

1. 现代主义与经典设计流派
2. 当代互联网与科技视觉风格
3. 复古与怀旧风格
4. 东方美学与自然风格
5. 艺术与印刷质感风格
6. 强视觉冲击与青年潮流风格
7. 排版主导型海报风格
8. 主题场景型海报风格
9. 视觉材料与色彩导向风格

完整批次索引见：[中文风格索引](docs/style-index.zh.md)

## 说明

这些图像由 AI 图像模型生成，适合用于视觉风格研究、灵感收集和设计方向讨论。图中的小字和标题不应直接用于正式出版物；如果要制作正式设计稿，建议保留图像风格，重新排版真实文字。

## 许可

- 代码：MIT License
- 图片与文档：Creative Commons Attribution 4.0 International，见 [LICENSE-ASSETS.md](LICENSE-ASSETS.md)
