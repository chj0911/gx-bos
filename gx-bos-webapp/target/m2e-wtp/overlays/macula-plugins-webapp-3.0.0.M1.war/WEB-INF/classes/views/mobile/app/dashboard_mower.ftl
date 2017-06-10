<@layout.mower_mobile title="Home">
<header>
	<div class="weui-row">
		<div class="weui-col-33"><a href="javascript:history.go(-1)"><i class="icon"></i></a></div>
		<div class="weui-col-33" id="detail_title">首页</div>
		<div class="weui-col-33" id="ligin_icon"><a href="login.html">登录</a></div>
	</div>
</header>

<div class="content-padded">
	<div class="weui_cells weui_cells_form">
	    <div class="weui_cell">
	        <div class="weui_cell_hd"><label class="weui_label">qq</label></div>
	        <div class="weui_cell_bd weui_cell_primary">
	            <input class="weui_input" type="tel" placeholder="请输入qq号">
	        </div>
	    </div>
	    <div class="weui_cell weui_vcode">
	        <div class="weui_cell_hd"><label class="weui_label">验证码</label></div>
	        <div class="weui_cell_bd weui_cell_primary">
	            <input class="weui_input" type="number" placeholder="请输入验证码">
	        </div>
	        <div class="weui_cell_ft">
	            <img src="images/vcode.jpg">
	        </div>
	    </div>
	    <div class="weui_cell weui_cell_switch">
	        <div class="weui_cell_hd weui_cell_primary">接受通知</div>
	        <div class="weui_cell_ft">
	            <input class="weui_switch" type="checkbox">
	        </div>
	    </div>
	    <div class="weui_cell">
	        <div class="weui_cell_hd"><label for="" class="weui_label">日期</label></div>
	        <div class="weui_cell_bd weui_cell_primary">
	            <input class="weui_input" type="date" value="">
	        </div>
	    </div>
	    <div class="weui_cell">
	        <div class="weui_cell_hd"><label for="" class="weui_label">时间</label></div>
	        <div class="weui_cell_bd weui_cell_primary">
	            <input class="weui_input" type="datetime-local" value="" placeholder="">
	        </div>
	    </div>
	    <div class="weui_cell weui_cell_select">
	        <div class="weui_cell_bd weui_cell_primary">
	            <select class="weui_select" name="select1">
	            <option selected="" value="0">选择</option>
	            <option value="1">微信号</option>
	            <option value="2">QQ号</option>
	            <option value="3">Email</option>
	          </select>
	        </div>
	    </div>
	</div>
	<div class="weui_cells_title">文本域</div>
	<div class="weui_cells weui_cells_form">
	    <div class="weui_cell">
	        <div class="weui_cell_bd weui_cell_primary">
	            <textarea class="weui_textarea" placeholder="请输入评论" rows="3"></textarea>
	            <div class="weui_textarea_counter"><span>0</span>/200</div>
	        </div>
	    </div>
	</div>
</div>

<div class="weui_tabbar">
	<a href="index.html" class="weui_tabbar_item" id="index_icon">
	  	<div class="weui_tabbar_icon">
	    	<i class="icon icon-sy"></i>
	  	</div>
	  	<p class="weui_tabbar_label">首页</p>
	</a>
	<a href="p2plist.html" class="weui_tabbar_item weui_bar_item_on" id="list_icon">
	  	<div class="weui_tabbar_icon">
	    	<i class="icon icon-tz"></i>
	  	</div>
	  	<p class="weui_tabbar_label">产品</p>
	</a>
	<a href="eventsList.html" class="weui_tabbar_item" id="events_icon">
	  	<div class="weui_tabbar_icon">
	    	<i class="icon icon-hd"></i>
	 	</div>
	  	<p class="weui_tabbar_label">发现</p>
	</a>
	<a href="wealth.html" class="weui_tabbar_item" id="wealth_icon">
	  	<div class="weui_tabbar_icon">
	    	<i class="icon icon-cf"></i>
	  	</div>
	  	<p class="weui_tabbar_label">我</p>
	</a>
</div>
</@layout.mower_mobile>