'use strict';

/**
 * 预约
 */
app.controller('reservationCtrl', function($scope,$interval) {
	
	//   当前页面返回秒数
	$scope.countdown_time = 30;
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationCtrl");
	if(tm.Key!="reservationCtrl"){
		tm.Key="reservationCtrl";
		tm.keyctrl="app.reservation";
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
 * 预约挂号
 */
app.controller('reservationDepartmentCtrl', function($scope,$interval) {
	
	//   当前页面返回秒数
	$scope.countdown_time = 30;
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationDepartmentCtrl");
	if(tm.Key!="reservationDepartmentCtrl"){
		tm.Key="reservationDepartmentCtrl";
		tm.keyctrl="app.reservation.department";
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
		$scope.audio_list.play('audio_005');
	}
	run();
	
});




/**
 * 预约挂号  科室
 */
app.controller('reservationDepartmentRegisteredCtrl', function($scope,$interval) {
	
	//   当前页面返回秒数
	$scope.countdown_time = 30;
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationDepartmentCtrl");
	if(tm.Key!="reservationDepartmentCtrl"){
		tm.Key="reservationDepartmentCtrl";
		tm.keyctrl="app.reservation.department.registered";
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
		$scope.audio_list.play('audio_005');
	}
	run();
	
});



/**
 * 预约挂号  科室
 */
app.controller('reservationDepartmentRegisteredDepCtrl', function($scope,$interval,$timeout) {
	
	//   状态  1, 确认挂号。2，系统正在处理。3，打印凭条。4，挂号成功
	$scope.status = 1;
	
	
	//   当前页面返回秒数
	$scope.countdown_time = 60;
	
	//
	$scope.form_data = {
		
	}
	
	
	//开始定义定时器
	var tm=$scope.setglobaldata.gettimer("reservationDepartmentRegisteredDepCtrl");
	if(tm.Key!="reservationDepartmentRegisteredDepCtrl"){
		tm.Key="reservationDepartmentRegisteredDepCtrl";
		tm.keyctrl="app.reservation.department.registered.dep";
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
	
	
	//  1 确认
	$scope.statusFn1 = function(){
		//   提交挂号信息
		
		//  
		tm.fnStopAutoRefreshfn(tm);
		$scope.countdown_time = 60;
		$scope.status = 2;
		
		//
		$timeout(function(){
			$scope.statusFn2();
		},2000);
	}
	
	//  系统正在处理中
	$scope.statusFn2 = function(){
		//   验证返回信息
		
		//  
		$scope.status = 3;
		
		//
		$timeout(function(){
			$scope.statusFn3();
		},2000);
	}
	
	
	//  正在打印凭条
	$scope.statusFn3 = function(){
		//   打印条码
		
		//  
		$scope.status = 4;
		
		//
		$timeout(function(){
			$scope.statusFn4();
		},2000);
	}
	
	
	//  挂号成功
	$scope.statusFn4 = function(){
		//   
		tm.fnStopAutoRefreshfn(tm);
		$scope.countdown_time = 60;
		tm.fnAutoRefreshfn(tm);
	}
	
});