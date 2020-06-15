window.addEventListener('load',function(){
	//主頁輪播圖
	var font_left=document.querySelector('.font_left');
	var font_right=document.querySelector('.font_right');
	var pic=document.querySelector('.pic');
	pic.addEventListener('mouseover',function(){
		font_left.style.display='block';
		font_right.style.display='block';
	})
	pic.addEventListener('mouseout',function(){
		font_left.style.display='none';
		font_right.style.display='none';
	})
	var picUL=document.querySelector('.pic_ul');
	var cirOL=document.querySelector('.focus_circle').querySelector('ol');
	var num=0;	//num和circle用於後面輪播圖
	var circle=0;
	//	這裡是動畫移動函數
	var PicWidth=picUL.parentElement.offsetWidth;
	//	PicWidth是一張圖片的寬度
	function MoveTo(obj,target){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			if(obj.offsetLeft==target)
			{
				clearInterval(obj.timer);
			}
			var pxx=(target-obj.offsetLeft)/10;
			pxx=pxx>0?Math.ceil(pxx):Math.floor(pxx);
			obj.style.left=obj.offsetLeft+pxx+'px';
		},15)
	}
	//	這裡是自動創建輪播圖下面的圓圈,小li
	for(var i=0;i<picUL.children.length;i++)
	{	//創建小li,順便創建自定義屬性索引號,方便輪播
		var li=document.createElement('li');
		li.setAttribute('index',i);
		//把小li放進去
		cirOL.appendChild(li);
		//	給每個小圓圈註冊事件,排他思想
		li.addEventListener('click',function(){
			for(var i=0;i<cirOL.children.length;i++)
			{
				cirOL.children[i].className='';
			}
			this.className='cur_circle';
			var index=this.getAttribute('index');
			num=index;
			circle=num;
			MoveTo(picUL,-index*PicWidth);
		})
	}
	//下面克隆第一張圖片,這樣無縫滾動
	cirOL.children[0].className='cur_circle';
	var firstChild=picUL.children[0].cloneNode(true);
	picUL.appendChild(firstChild);
	//	點擊右邊滾動輪播圖
	font_right.addEventListener('click',function(){
		if(num==picUL.children.length-1)
		{
			picUL.style.left=0;
			num=0;
		}
		num++;
		MoveTo(picUL,-PicWidth*num);
		circle++;
		/*排他思想,清楚所有圓圈,留下自己*/
		for(var i=0;i<cirOL.children.length;i++)
		{
			cirOL.children[i].className='';
		}
		if(circle>=picUL.children.length-1)
		{
			circle=0;
		}
		cirOL.children[circle].className='cur_circle';
	})
	font_left.addEventListener('click',function(){
		if(num==0)
		{
			num=picUL.children.length-1;
			picUL.style.left=-num*PicWidth+'px';
		}
		num--;
		MoveTo(picUL,PicWidth*num*-1);
		circle--;
		if(circle<0)
		{
			circle=cirOL.children.length-1;
		}
		for(var i=0;i<cirOL.children.length;i++)
		{
			cirOL.children[i].className='';
		}
		cirOL.children[circle].className='cur_circle';
	})
	
	/*	AuctionShow下劃線實現
	
	*/
	var pmH3_alis=document.querySelectorAll('.a1')
	var pmname_alis=document.querySelectorAll('.a2');
	console.log(pmH3_alis);
	console.log(pmname_alis);
	
	//pmH3_alis[1].style.textDecoration='underline';
	for(var i=0;i<pmH3_alis.length;i++)
	{
		pmH3_alis[i].setAttribute('index',i);
		pmname_alis[i].setAttribute('index',i);
		pmH3_alis[i].addEventListener('mouseenter',function(){
			var index=this.getAttribute('index');
			this.style.textDecoration='underline';
			pmname_alis[index].style.textDecoration='underline';
		})
		pmname_alis[i].addEventListener('mouseenter',function(){
			var index=this.getAttribute('index');
			this.style.textDecoration='underline';
			pmH3_alis[index].style.textDecoration='underline';
			
		})
	}
	for(i=0;i<pmH3_alis.length;i++)
	{
		pmH3_alis[i].addEventListener('mouseleave',function(){
			var index=this.getAttribute('index');
			this.style.textDecoration='none';
			pmname_alis[index].style.textDecoration='none';
		})
		pmname_alis[i].addEventListener('mouseleave',function(){
			var index=this.getAttribute('index');
			pmH3_alis[index].style.textDecoration='none';
			this.style.textDecoration='none';
		})
	}
	/*
		拍賣最後一張图片的hover
	*/
	var last_show=document.querySelector('.last_Show');
	var span=last_show.querySelector('span');
	var Last_S_a=last_show.querySelector('.in_circle');
	/*
	last_show.addEventListener('mousemove',function(){
		span.style.color='white';
		Last_S_a.style.color='white';
	})
	last_show.addEventListener('mouseout',function(){
		span.style.color='black';
		Last_S_a.style.color='black';
	})*/
	/*封装实现hover变色函数*/
	function ChangeColor(bgDiv,txt,txt2){
		bgDiv.addEventListener('mousemove',function(){
			txt.style.color='white';
			if(txt2!=null)
			{
				txt2.style.color='white';
			}
		})
		bgDiv.addEventListener('mouseout',function(){
			txt.style.color='black';
			if(txt2!=null)
			{
				txt2.style.color='black';
			}
		})
	}
	ChangeColor(last_show,span,Last_S_a);
	//btn_sign的动画
	var btn_sign=document.querySelector('.btn_sign');
	ChangeColor(btn_sign,btn_sign);
	//浏览所有专题对动画
	var story_d=document.querySelector('.story_d');
	var storyA=document.querySelector('.storyA');
	ChangeColor(story_d,storyA);
	//浏览所有拍卖部门的动画
	var liulan=document.querySelector('.liulan');
	var Dep_H3_a=document.querySelector('.Dep_H3_a');
	ChangeColor(liulan,Dep_H3_a);
	//学习佳士得网上课程的动画
	var learn=document.querySelector('.learn');
	var learn_p=document.querySelector('.learn_p');
	ChangeColor(learn,learn_p);
	
	/*熱門拍品的輪播動畫*/
	var numl=0;
	var hotLeftSpan=document.querySelector('.hot_left');
	var hotRightSpan=document.querySelector('.hot_right');
	var hot_div=document.querySelector('.hot_div');
	var hot_ul=document.querySelector('.hot_div_ul');
	var hotDiv_Width=hot_div.offsetWidth;
	//console.log('HotDivWidth:'+hotDiv_Width);	返回960
	function Go_to(obj,target){
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			if(obj.offsetLeft==target){
				clearInterval(obj.timer);
			}
			var psx=(target-obj.offsetLeft)/10;
			psx=psx>0?Math.ceil(psx):Math.floor(psx);
			obj.style.left=obj.offsetLeft+psx+'px';
			
		},15)
	}
	
	hotRightSpan.addEventListener('click',function(){
		if(numl==3)
		{
			hot_ul.style.left=0;
			numl=0;
		}
		numl++;
		console.log(numl);
		Go_to(hot_ul,-hotDiv_Width*numl);
	})
	
	hotLeftSpan.addEventListener('click',function(){
		if(numl==0)
		{
			
			hot_ul.style.left=3*-hotDiv_Width+'px';
			numl=3;
		}
		numl--;
		Go_to(hot_ul,-hotDiv_Width*numl);
		
	})
})

