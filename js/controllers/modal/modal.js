'use strict';

/**
 * 消息提示弹窗
 */
app.controller('modalMsgCtrl', function($scope,$interval,$modal,$modalInstance,items) {
	
	$scope.items = items;
	//   弹窗信息
	$scope.modal_data = {
		title:'提示信息：',
		msg:'密码错误'
	}
	//   当前页面返回秒数
	$scope.countdown_time = 1000;
	//开始定义定时器
	var tm=$scope.items.scope.setglobaldata.gettimer($scope.items.key);
	if(tm.Key!=$scope.items.key){
		tm.Key=$scope.items.key;
		tm.keyctrl=$scope.items.keyctrl;
		tm.fnAutoRefresh=function(){
			console.log("开始调用定时器");
			tm.interval = $interval(function() {
				if($scope.countdown_time > 0){
					$scope.countdown_time = $scope.countdown_time - 1;
				}else{
					$interval.cancel(tm.interval);
					tm.interval = null;
					//   关闭弹窗
					tm.fnStopAutoRefreshfn(tm);
					$scope.ok();
					//
					$scope.countdown_time = 5;
				}
			}, 1000);
		};
		tm.fnStopAutoRefresh=function(){
			//$scope.countdown_time = 5;
			console.log("进入取消方法");
			if(tm.interval != null) {
				$interval.cancel(tm.interval);
				tm.interval = null;
				console.log("进入取消成功");
			}
			tm.interval=null;
		};
		$scope.items.scope.setglobaldata.addtimer(tm);
	}
	//结束定义定时器
	
	tm.fnAutoRefreshfn(tm);
	
	
	//
	$scope.ok = function() {
		$modalInstance.close('ok');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	
});



/**
 * 系统错误
 */
app.controller('modalErrorCtrl', function($scope,$interval,$modal,$modalInstance,items,$timeout) {
	
	$scope.items = items;
	//   弹窗信息
	$scope.modal_data = {
		title:'',
		msg:'系统错误'
	}
	//   当前页面返回秒数
	$scope.countdown_time = 60;
	//开始定义定时器
	var tm=$scope.items.scope.setglobaldata.gettimer($scope.items.key);
	if(tm.Key!=$scope.items.key){
		tm.Key=$scope.items.key;
		tm.keyctrl=$scope.items.keyctrl;
		tm.fnAutoRefresh=function(){
			console.log("开始调用定时器");
			tm.interval = $interval(function() {
				if($scope.countdown_time > 0){
					$scope.countdown_time = $scope.countdown_time - 1;
				}else{
					$interval.cancel(tm.interval);
					tm.interval = null;
					tm.fnStopAutoRefreshfn(tm);
					//   停止声音
					$scope.items.scope.audio_list.allStop();
					//   关闭弹窗
					$scope.ok();
					//
					$scope.countdown_time = 60;
				}
			}, 1000);
		};
		tm.fnStopAutoRefresh=function(){
			//$scope.countdown_time = 5;
			console.log("进入取消方法");
			if(tm.interval != null) {
				$interval.cancel(tm.interval);
				tm.interval = null;
				console.log("进入取消成功");
			}
			tm.interval=null;
		};
		$scope.items.scope.setglobaldata.addtimer(tm);
	}
	//结束定义定时器
	
	tm.fnAutoRefreshfn(tm);
	
	
	//
	$scope.ok = function() {
		$modalInstance.close('ok');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	
	var run = function(){
		//   播放声音
		$timeout(function(){
			$scope.items.scope.audio_list.allStop();
			$scope.items.scope.audio_list.play('audio_011');
		},1000);
	}
	run();
	
});



/**
 * 插卡弹窗
 */
app.controller('modalCardInCtrl', function($scope,$interval,$modal,$modalInstance,items) {
	
	$scope.items = items;
	
	//   
	
	//
	$scope.ok = function() {
		$modalInstance.close('ok');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	
});



/**
 * 退卡弹窗
 */
app.controller('modalCardOutCtrl', function($scope,$interval,$modal,$modalInstance,items) {
	
	$scope.items = items;
	
	//   当前页面返回秒数
	$scope.countdown_time = 10;
	
	//   
	//开始定义定时器
	var tm=$scope.items.scope.setglobaldata.gettimer("modal_card_out");
	if(tm.Key!="modal_card_out"){
		tm.Key="modal_card_out";
		tm.keyctrl="app.index";
		tm.fnAutoRefresh=function(){
			console.log("开始调用定时器");
			tm.interval = $interval(function() {
				if($scope.countdown_time > 0){
					$scope.countdown_time = $scope.countdown_time - 1;
				}else{
					$interval.cancel(tm.interval);
					tm.interval = null;
					//$scope.countdown_time = 20;
					$scope.cancel();
					//   返回上一级
					$scope.items.scope.locationBk('app.index');
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
		$scope.items.scope.setglobaldata.addtimer(tm);
	}
	//结束定义定时器
	
	tm.fnAutoRefreshfn(tm);
	
	//
	$scope.ok = function() {
		$modalInstance.close('ok');
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	
	var run = function(){
		//   播放声音
		$scope.items.scope.audio_list.allStop();
		$scope.items.scope.audio_list.play('audio_010');
	}
	run();
	
	
});