'use strict';

/* Controllers */

angular.module('app')
	.controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'opCookie', 'httpService', 'globalFn', '$interval', '$state','$rootScope','$modal',
		function($scope, $translate, $localStorage, $window, opCookie, httpService, globalFn, $interval, $state,$rootScope,$modal) {
			// add 'ie' classes to html
			var isIE = !!navigator.userAgent.match(/MSIE/i);
			isIE && angular.element($window.document.body).addClass('ie');
			isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

			// config
			$scope.app = {
				name: '医疗自助终端',
				version: '1.3.3',
				// for chart colors
				color: {
					primary: '#7266ba',
					info: '#23b7e5',
					success: '#27c24c',
					warning: '#fad733',
					danger: '#f05050',
					light: '#e8eff0',
					dark: '#3a3f51',
					black: '#1c2b36'
				},
				settings: {
					themeID: 1,
					navbarHeaderColor: 'bg-black',
					navbarCollapseColor: 'bg-white-only',
					asideColor: 'bg-black',
					headerFixed: true,
					asideFixed: false,
					asideFolded: false,
					asideDock: false,
					container: false
				},
				//   nav
				nav: [],
				//   机器登录信息
				device_info: {},
				//   用户登录信息
				user_info: {},
				//   服务器时间
				server_time: 1507615982000,
				server_time_week: '星期一'
			}

			// save settings to local storage
			if(angular.isDefined($localStorage.settings)) {
				$scope.app.settings = $localStorage.settings;
			} else {
				$localStorage.settings = $scope.app.settings;
			}
			$scope.$watch('app.settings', function() {
				if($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
					// aside dock and fixed must set the header fixed.
					$scope.app.settings.headerFixed = true;
				}
				// save to local storage
				$localStorage.settings = $scope.app.settings;
			}, true);

			// angular translate
			$scope.lang = {
				isopen: false
			};
			$scope.langs = {
				en: 'English',
				de_DE: 'German',
				it_IT: 'Italian'
			};
			$scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
			$scope.setLang = function(langKey, $event) {
				// set the current lang
				$scope.selectLang = $scope.langs[langKey];
				// You can change the language during runtime
				$translate.use(langKey);
				$scope.lang.isopen = !$scope.lang.isopen;
			};

			function isSmartDevice($window) {
				// Adapted from http://www.detectmobilebrowsers.com
				var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
				// Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
				return(/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
			}

			//   取nav
			$scope.getNav = function() {
				if(opCookie.getCookie('access_token')) {
					//
					httpService.ajaxPost(httpService.API.origin + '/Rest/function/createIndexTree', undefined, 10000, {
							parentcode: '0'
						})
						.then(function(data) {
							console.log(data)
							if(data.status == 200) {
								var temp_nav = data.data;
								//   组合code
								if(temp_nav.length > 0) {
									globalFn.dg_tree(temp_nav, function(item) {
										item.fucecode_router = item.fucecode.split('-').join('.').toLowerCase();
									})
									$scope.app.nav = temp_nav;
								} else {
									$scope.app.nav = [];
								}
							} else {
								//$scope.authError = 'Email or Password not right';
							}
						}, function(x) {
							console.log(x)
							$scope.authError = 'Server Error';
						});
				}
			}

			//   取用户信息
			$scope.getUserInfo = function() {
				if(opCookie.getCookie('access_token')) {
					//
					httpService.ajaxPost(httpService.API.origin + '/Rest/frmuser/getCurrLoginUser', undefined, 10000, {
							parentcode: '0'
						})
						.then(function(data) {
							console.log(data)
							if(data.status == 200) {
								$scope.app.device_info = data.data;
								opCookie.setCookie('device_info', escape(JSON.stringify($scope.app.device_info)), 24 * 60 * 60);
							} else {
								//$scope.authError = 'Email or Password not right';
							}
						});
				}
			}

			//   取服务器时间
			var weekday = new Array(7);
			weekday[0] = "星期天";
			weekday[1] = "星期一";
			weekday[2] = "星期二";
			weekday[3] = "星期三";
			weekday[4] = "星期四";
			weekday[5] = "星期五";
			weekday[6] = "星期六";
			var getServerTime = function() {
				$scope.app.server_time = Date.parse(new Date());
				$interval(function() {
					$scope.app.server_time = $scope.app.server_time + 1000;
					$scope.app.server_time_week = weekday[new Date($scope.app.server_time).getDay()];
				}, 1000);
			}

			//   返回上一级
			$scope.locationBk = function(str) {
				var route = $state.current.name;
				var route_url = route.substr(0, route.lastIndexOf('.'));
				if(str) {
					route_url = str;
				}
				$state.go(route_url == 'app' ? 'app.index' : route_url);
			}
			
			


			//   插卡回调
			terminal_device.in_out_card.cb_in_card = function(i) {
				//   打开 插卡弹窗
				var modalInstance = $modal.open({
					templateUrl: 'tpl/modal/modal_in_card.html',
					controller: 'modalCardInCtrl',
					windowClass:'g-modal-none',
					animation:false,
					backdrop:false,
					resolve: {
						items: function() {
							return {};
						}
					}
				});
		
				modalInstance.result.then(function(selectedItem) {
					console.log(selectedItem)
					//   返回首页
					$scope.locationBk('app.index');
				}, function() {
					//$log.info('Modal dismissed at: ' + new Date());
				});
			}

			//   插卡完成回调 写用户信息
			terminal_device.in_out_card.cb_in_ok_card = function(str) {
				//   写用户信息
				var user_info = JSON.parse(str);
				$scope.app.user_info = user_info;
				$scope.$apply();
				//   返回上一页

			}

			//   退卡完成回调 请除用户信息 返回首页
			terminal_device.in_out_card.cb_out_ok_card = function(str) {
				//   写用户信息
				$scope.app.user_info = {};
				$scope.$apply();
				
				//   打开 退卡弹窗
				var modalInstance = $modal.open({
					templateUrl: 'tpl/modal/modal_out_card.html',
					controller: 'modalCardOutCtrl',
					windowClass:'g-modal-none',
					animation:false,
					backdrop:false,
					resolve: {
						items: function() {
							return {'scope':$scope};
						}
					}
				});
		
				modalInstance.result.then(function(selectedItem) {
					console.log(selectedItem)
					//   返回首页
					$scope.locationBk('app.index');
				}, function() {
					//$log.info('Modal dismissed at: ' + new Date());
				});
				
			}
			
			
			//  =========================  提示音  =============================
			$scope.audio_list = {
				audio:[
					{"id":"audio_001","name":"请选择您要办理的业务","src":"img/mp3/请选择您要办理的业务.ogg"},
					{"id":"audio_002","name":"请插入您的诊疗卡","src":"img/mp3/请插入您的诊疗卡.ogg"},
					{"id":"audio_003","name":"请将您的身份证放到对应区域以便读取您的证件信息","src":"img/mp3/请将您的身份证放到对应区域以便读取您的证件信息.ogg"},
					{"id":"audio_004","name":"请选择您要挂号的科室","src":"img/mp3/请选择您要挂号的科室.ogg"},
					{"id":"audio_005","name":"请选择您要预约的日期","src":"img/mp3/请选择您要预约的日期.ogg"},
					{"id":"audio_006","name":"请确认您要办理的业务","src":"img/mp3/请确认您要办理的业务.ogg"},
					{"id":"audio_007","name":"请投币，本机只接收100元面额纸币","src":"img/mp3/请投币，本机只接收100元面额纸币.ogg"},
					{"id":"audio_008","name":"系统正在处理中，请稍候","src":"img/mp3/系统正在处理中，请稍候.ogg"},
					{"id":"audio_009","name":"请取走您的凭条","src":"img/mp3/请取走您的凭条.ogg"},
					{"id":"audio_010","name":"请取走您的诊疗卡","src":"img/mp3/请取走您的诊疗卡.ogg"},
				],
				//  播放
				play:function(dom_id){
					if(dom_id){$('#' + dom_id)[0].play();}
				},
				//  暂停
				pause:function(dom_id){
					if(dom_id){$('#' + dom_id)[0].pause();}
				},
				//  停止
				stop:function(dom_id){
					if(dom_id){$('#' + dom_id)[0].pause();}
					if(dom_id){$('#' + dom_id)[0].currentTime = 0.0;}
				},
				//  全部停止
				allStop:function(){
					$('ul[audio-list] audio').each(function(){
						this.pause();
						this.currentTime = 0.0;
					});
				}
			};
			//  =========================  /提示音  =============================
			

			//  ========================= 定时器 =============================
			$scope.setglobaldata = {
				timedatalist: [], //定时器数组
				timer: { //定时器模板对象
					interval: null,
					Key: "", //定义的名称
					keyctrl: "", //定义所属的控制器
					fnStopAutoRefresh: function() {}, //定义开关的关闭
					fnAutoRefresh: function() {}, //定义开关的打开
					fnStopAutoRefreshfn: function(tm, fn) {
						tm.fnStopAutoRefresh();
					}, //定义开关的关闭方法
					fnAutoRefreshfn: function(tm) {
						if(tm.keyctrl != $state.current.name) {
							tm.fnStopAutoRefresh();
						} else {
							if(tm.interval == null) {
								tm.fnAutoRefresh();
							}
						}
					}
				},
				addtimer: function(t) { //将数据加入到定时器数组
					var isadd = true;
					for(var i = 0; i < $scope.setglobaldata.timedatalist.length; i++) {
						if($scope.setglobaldata.timedatalist[i].Key == t.key) {
							$scope.setglobaldata.timedatalist[i].fnStopAutoRefresh(); //先关闭定时器
							$scope.setglobaldata.timedatalist.splice(i, 1); //移除对象
						}
					}
					if(isadd) {
						$scope.setglobaldata.timedatalist.push(t);
					}
				},
				gettimer: function(key) { //获取对象
					var temp_timer = null;
					for(var i = 0; i < $scope.setglobaldata.timedatalist.length; i++) {
						if($scope.setglobaldata.timedatalist[i].Key == key) {
							//temp_timer = $scope.setglobaldata.timedatalist[i];
							$scope.setglobaldata.timedatalist[i].fnStopAutoRefresh(); //先关闭定时器
							$scope.setglobaldata.timedatalist.splice(i, 1); //移除对象
							break;
						}
					}
					//return temp_timer ? temp_timer : angular.copy($scope.setglobaldata.timer);
					return angular.copy($scope.setglobaldata.timer);
				}
			};
			//console.log($state.current.name);
			//   监听离开页面取消定时器
			$rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
					for(var indextm = 0; indextm < $scope.setglobaldata.timedatalist.length; indextm++) {
						if($scope.setglobaldata.timedatalist[indextm].keyctrl == toState.name) {
							$scope.setglobaldata.timedatalist[indextm].fnAutoRefresh();
						} else {
							$scope.setglobaldata.timedatalist[indextm].fnStopAutoRefresh();
						}
					}
					//   停止语音
					$scope.audio_list.allStop();
				}
			);
			//  ========================= /定时器 =============================

			//   run
			var run = function() {
				//   取nav菜单
				$scope.getNav();
				//   取用户信息
				$scope.getUserInfo();
				//   取服务器时间
				getServerTime();
			}
			run();

		}
	]);