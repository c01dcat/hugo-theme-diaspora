---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
year: "{{ dateFormat "2006" .Date }}"
month: "{{ dateFormat "2006/01" .Date }}"
cover: //via.placeholder.com/1920x1080
bgm: /mp3/Everglow.mp3
bgmAutoplay: true
tags:
categories:
---