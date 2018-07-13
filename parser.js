var app = angular.module("appX", ['ngSanitize']);
app.controller("appCtrl", function($scope, $sanitize, $http, $q) {
  

  $scope.parse = function() {
    var arr =  $scope.sqltext.split('\n');
 
    var strRes = 'StringBuilder sql = new StringBuilder(); \n';
    
    for (var i in arr) {
      var linha = arr[i];
      strRes += 'sql.append("\\n ' + linha + '"); \n';
    }

    $scope.result = $sanitize(strRes);
  }

  $scope.copyAll = function () {
    if (!navigator.clipboard) {
      $scope.fallbackCopyTextToClipboard($scope.result);
      return;
    }

    navigator.clipboard.writeText($scope.result).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  $scope.fallbackCopyTextToClipboard = function (text) {

    let target = document.getElementById('result');
    let range; 
    let selection;
    
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(target);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  }

});
