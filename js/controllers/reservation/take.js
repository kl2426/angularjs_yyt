'use strict';

/**
 * 预约 取号
 */
app.controller('reservationTakeCtrl', function($scope,$interval) {
	
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
