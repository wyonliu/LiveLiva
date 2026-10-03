(() => {
 'use strict';
 const zh=document.documentElement.lang.startsWith('zh');
 const t=(en,cn)=>zh?cn:en;
 const button=document.getElementById('change-world');
 const permission=document.getElementById('memory-permission');
 const image=document.getElementById('active-scene');
 if(!button||!permission||!image)return;
 let second=false;
 const put=(id,value)=>{document.getElementById(id).textContent=value;};
 function update(){
  image.src=second?image.dataset.explore:image.dataset.craft;
  image.alt=second?t('Exploration world illustration','探索世界示意图'):t('Craft world illustration','手艺世界示意图');
  put('scene-label',second?t('B / THE EXPLORATION WORLD','B／探索世界'):t('A / THE CRAFT WORLD','A／手艺世界'));
  put('scene-title',second?t('A new world. The same companion.','新的世界，同一个伙伴。'):t('Learn through doing.','从共同参与中学习。'));
  put('scene-description',second?t('Another author sets the rules. You and your friend enter with Liva; the earlier shared event remains in your history.','另一位作者设定规则。你和朋友与Liva一起进入，先前共同经历仍保留在历史中。'):t('You and a friend assemble a coastal town. Liva joins the task and keeps a record of your shared experience.','你和朋友一起搭建海岸城镇，Liva参与其中，保留这次共同经历。'));
  put('identity-result',second?t('Same Liva and shared history. Your friend joins by their own choice.','同一个Liva与共同历史；朋友自主选择加入。'):t('Liva stays with you; your friend remains a real participant.','Liva持续陪伴；朋友仍是真实参与者。'));
  put('memory-result',permission.checked?(second?t('Allowed: Liva may suggest the quieter exploration route.','已授权：Liva可以建议较安静的探索路线。'):t('Allowed: Liva may suggest a quieter corner of the workshop.','已授权：Liva可以建议工坊中较安静的位置。')):t('Not authorized: this preference is not used for suggestions.','未授权：不使用这条偏好作建议。'));
  put('ability-result',second?t('Spatial reasoning is permitted for this puzzle. Tools and construction powers do not transfer.','当地规则允许用空间推理分析机关；建造工具与能力不会自动带入。'):t('Reason about how pieces fit, under this creator’s construction rules.','依照作者设定的建造规则，判断构件如何组合。'));
  button.textContent=second?t('Return to the craft world ↗','返回手艺世界 ↗'):t('Enter another author’s world ↗','进入另一位作者的世界 ↗');
  button.setAttribute('aria-pressed',String(second));
 }
 button.addEventListener('click',()=>{second=!second;update();document.dispatchEvent(new Event('liva:experience')); });
 permission.addEventListener('change',()=>{update();document.dispatchEvent(new Event('liva:experience'));});
 update();
})();
