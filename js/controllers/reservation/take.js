'use strict';

/**
 * 预约 取号
 */
app.controller('reservationTakeCtrl', function($scope,$interval,$timeout,$filter) {
	
	//   当前页面返回秒数
	$scope.countdown_time = 3000;
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationTakeCtrl");
	if(tm.Key!="reservationTakeCtrl"){
		tm.Key="reservationTakeCtrl";
		tm.keyctrl="app.reservation.take";
		tm.fnAutoRefresh=function(){
			console.log("开始调用定时器");
			tm.interval = $interval(function() {
				if($scope.countdown_time > 0){
					$scope.countdown_time = $scope.countdown_time - 1;
				}else{
					$interval.cancel(tm.interval);
					tm.interval = null;
					//$scope.countdown_time = 20;
					//   返回上一级
					$scope.locationBk();
				}
			}, 1000);
		};
		tm.fnStopAutoRefresh=function(){
			$scope.countdown_time = 60;
			console.log("进入取消方法");
			if(tm.interval != null) {
				$interval.cancel(tm.interval);
				tm.interval = null;
				console.log("进入取消成功");
			}
			tm.interval=null;
		};
		$scope.setglobaldata.addtimer(tm);
	}
	//结束定义定时器
	
	tm.fnAutoRefreshfn(tm);
	
	
	
	/**
	 * 表格1
	 */
	$scope.table_data = {
		form:{
			fucecode:"",
			fuceismenu:"",
			fucename:"",
			fuceparentcode:"0",
			ownerType:0,
			page:1,
			pageSize:10,
			sortname:"a.FUCECREATETIME",
			sortorder:"desc"
		},
		//   表格数据
		table_res:{
			code:"0001",
			message:"ok",
			rows:[
				{"order":"1","title":"呼吸内科1","type":"专家","date":"2017年10月20日 下午","state":"未取号",checked:false},
				{"order":"1","title":"呼吸内科1","type":"专家","date":"2017年10月20日 下午","state":"未取号"},
				{"order":"1","title":"呼吸内科1","type":"专家","date":"2017年10月20日 下午","state":"未取号"},
				{"order":"1","title":"呼吸内科1","type":"专家","date":"2017年10月20日 下午","state":"未取号"},
				{"order":"1","title":"呼吸内科1","type":"专家","date":"2017年10月20日 下午","state":"未取号"},
			],
			total:2,
			//
			maxSize:5
		},
		//   翻页
		pageChanged:function(){
			//  查询
			findFunctionList($scope.table_data.form);
		},
		//   每页显示多少条
		selectChanged:function(){
			findFunctionList($scope.table_data.form);
		}
	}
	
	
	//   取号
	$scope.outMark = function(){
		var items = $scope.table_data.table_res.rows;
		for(var i in items){
			if(items[i].checked && items[i].checked == true){
				$timeout(function(){
					//  打印凭条
					var printTemplate = "挂号凭证\n\n" +
										"打印时间：" + $filter('date')($scope.app.server_time, 'yyyy-MM-dd HH:mm:ss') + "\n\n" + 
										"姓名：张三\n\n" +
										"卡号12345789\n\n" +
										"挂号信息：\n\n" + 
										"科室：" + items[i].title + "\n\n" + 
										"医生类别：" + items[i].type + "\n\n" + 
										"序号：" + items[i].roder + "\n\n" + 
										"就诊日期和时段：" + items[i].date;
										//alert('打印')
										//alert(printTemplate)
					if(window.terminal){
						//  打印
						var res_state = window.terminal.PrintReceipt(printTemplate,'5','');
						alert(res_state);
						if(res_state == '0'){
							//  正常打印  设置
							//  灯光提示
							window.terminal && window.terminal.JSOpenTwinkleLED('1');
							//  5秒关闭
							$timeout(function(){window.terminal && window.terminal.JSCloseTwinkleLED('1');},5000);
						}else{
							//  打印异常
						}
					}
				},200);
			}
		}
	}
	
	
	
	var run = function(){
		//   播放声音
		$scope.audio_list.play('audio_001');
	}
	run();
	
	
});




/**
 * 预约 取消预约
 */
app.controller('reservationCancelCtrl', function($scope,$interval) {
	
	//   当前页面返回秒数
	$scope.countdown_time = 3000;
	
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationCancelCtrl");
	if(tm.Key!="reservationCancelCtrl"){
		tm.Key="reservationCancelCtrl";
		tm.keyctrl="app.reservation.cancel";
		tm.fnAutoRefresh=function(){
			console.log("开始调用定时器");
			tm.interval = $interval(function() {
				if($scope.countdown_time > 0){
					$scope.countdown_time = $scope.countdown_time - 1;
				}else{
					$interval.cancel(tm.interval);
					tm.interval = null;
					//$scope.countdown_time = 20;
					//   返回上一级
					$scope.locationBk();
				}
			}, 1000);
		};
		tm.fnStopAutoRefresh=function(){
			$scope.countdown_time = 60;
			console.log("进入取消方法");
			if(tm.interval != null) {
				$interval.cancel(tm.interval);
				tm.interval = null;
				console.log("进入取消成功");
			}
			tm.interval=null;
		};
		$scope.setglobaldata.addtimer(tm);
	}
	//结束定义定时器
	
	tm.fnAutoRefreshfn(tm);
	
	
	
	var run = function(){
		//   播放声音
		$scope.audio_list.play('audio_001');
	}
	run();
	
	
});
