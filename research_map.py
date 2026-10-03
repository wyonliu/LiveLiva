# -*- coding: utf-8 -*-
from pathlib import Path
from html import escape
R=Path(__file__).parent
for zh in (False,True):
 def t(en,cn):return cn if zh else en
 pieces=[]
 def text(x,y,s,size=14,color='#34465f',anchor='start',weight='400',spacing='0'):
  pieces.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}" letter-spacing="{spacing}">{escape(s)}</text>')
 def rect(x,y,w,h,fill='#fff',stroke='#d5dce6'):
  pieces.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{fill}" stroke="{stroke}"/>')
 def path(d,dashed=False,color='#8291a6'):
  dash=' stroke-dasharray="5 5"' if dashed else ''
  pieces.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="1.4"{dash} marker-end="url(#arrow)"/>')
 text(30,32,t('PEOPLE, AGENTS & WORLDS','人、智能体与世界'),10,'#62748d',spacing='1.6')
 text(30,65,t('People & personal context','人与个人情境'),16,'#172b46',weight='500')
 text(780,65,t('Creators, culture & source material','创作者、文化与来源素材'),16,'#172b46',weight='500')
 path('M167 79V111');text(181,99,t('intent & permission','意图与授权'),11,'#7a8898')
 path('M989 79V111');text(1003,99,t('author & edit','创作与编辑'),11,'#7a8898')
 for x,fill,stroke in [(30,'#edf2fb','#bccbe3'),(426,'#142840','#142840'),(822,'#f0f3ec','#c9d5bc')]:rect(x,120,328,157,fill,stroke)
 text(50,149,'NUWA / '+t('PERSONAL AGENTS','女娲'),10,'#5274a7',spacing='1.4')
 text(50,184,t('Understand. Remember. Act.','理解、记忆与行动'),23,'#182f52',weight='500')
 text(50,213,t('Human model · identity · skills','人本模型·身份·技能'),13,'#5b7193')
 text(50,249,t('Produces an action proposal','提出行动方案'),12,'#5b7193')
 text(446,149,'FUXI / '+t('PERSISTENT WORLD','伏羲'),10,'#a9c5ea',spacing='1.4')
 text(446,184,t('Maintain shared reality.','维护共同世界的事实'),23,'#ffffff',weight='500')
 text(446,213,t('Rules · state · rights · events','规则·状态·权益·事件'),13,'#b2c5de')
 text(446,249,t('Confirms outcomes and records history','确认结果，记录实际经历'),12,'#b2c5de')
 text(842,149,'PANGU / '+t('WORLD CREATION','盘古'),10,'#6a7f53',spacing='1.4')
 text(842,184,t('Create. Test. Publish.','创作、测试与发行'),23,'#30432b',weight='500')
 text(842,213,t('Scenes · characters · rules','场景·角色·规则'),13,'#6e7f5c')
 text(842,249,t('Produces a versioned world package','生成版本化的世界包'),12,'#6e7f5c')
 path('M358 177H420');text(390,166,t('action','行动'),10,'#5c6f8a','middle')
 path('M426 236H364');text(390,258,t('outcome','结果'),10,'#5c6f8a','middle')
 path('M822 177H760');text(788,166,t('publish','发行'),10,'#5c6f8a','middle')
 path('M754 236H816');text(788,258,t('feedback','反馈'),10,'#5c6f8a','middle')
 rect(426,325,328,76,'#fff','#b9cce8');text(590,350,t('WORLD MODELS','世界模型'),10,'#537aaa','middle',spacing='1.5')
 text(590,379,t('State + action → predicted consequence','状态＋行动→预测后果'),15,'#284774','middle')
 path('M427 365H192V283',True);text(190,326,t('planning','辅助规划'),11,'#5a7397','middle')
 path('M754 365H990V283',True);text(990,326,t('simulated playtests','模拟试玩'),11,'#5a7397','middle')
 path('M590 277V319',True);text(603,305,t('observed transitions','实际状态转移'),10,'#5a7397')
 path('M426 265H387V424H143V483',True)
 text(157,416,t('permitted outcomes','获准结果'),10,'#5a7397')
 pieces.append('<path d="M30 440H1150" stroke="#dce2e9"/>')
 text(30,466,t('LEARNING RESEARCH / SEPARATE FROM LIVE EXECUTION','学习研究／与实时执行隔离'),10,'#62748d',spacing='1.5')
 labels=[(30,t('Eligible experience','获准经历'),t('Consent · provenance · outcomes','授权·来源·结果')),(328,t('Continual learning / RSI','持续学习／RSI'),t('Skills · methods · descendants','技能·方法·后代版本')),(626,t('Independent evaluation','独立评测'),t('Held-out tasks · equal budget','独立任务·等预算')),(924,t('Controlled release','受控发布'),t('Promote or roll back','晋级或回退'))]
 for x,title,desc in labels:
  rect(x,489,226,72,'#f4f6f9','#d6dde7');text(x+14,518,title,15,'#2d4466',weight='500');text(x+14,543,desc,11,'#5c6f8a')
 for a,b in [(256,322),(554,620),(852,918)]:path(f'M{a} 525H{b}',True)
 path('M1038 562V590H14V197H24',True);text(585,609,t('Evaluated upgrades return to the relevant component; the agent path is shown.','经评测的升级返回对应组件；图示为智能体升级路径。'),11,'#607da5','middle')
 s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1180 625" role="img" aria-labelledby="title desc"><title id="title">LiveLiva — '+t('system architecture','系统架构')+'</title><desc id="desc">'+t('Nuwa proposes actions; Fuxi confirms outcomes; Pangu publishes worlds. World models assist planning and playtests. Independent research evaluates upgrades.','女娲提议行动，伏羲确认结果，盘古发行世界；世界模型辅助规划和试玩；独立研究评测升级。')+'</desc><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="#8291a6"/></marker></defs><rect width="1180" height="625" fill="#fbfcfe"/><g font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">'+''.join(pieces)+'</g></svg>'

 # hyphenated paths are the canonical public URLs.
 (R/f'research-map-{"CN" if zh else "EN"}.svg').write_text(s)
