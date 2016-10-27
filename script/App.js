var myApp = angular.module("myApp", []);

var myCtrl = myApp.controller("myCtrl",["$scope", function($scope) {
    $scope.mobilephone = "2244109571";
}]);

myApp.directive("phoneformat", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attr, formatCtrl) {
            
            var phoneFormat = function (value) {
                var numbers = value && value.replace(/-/g,"");
                if (/^\d{10}$/.test(numbers)) {
                    var matches = numbers && numbers.match(/^(\d{3})(\d{3})(\d{4})$/);
                
                    if (matches) {
                        return matches[1] + "-" + matches[2] + "-" + matches[3];
                    }
                }
                
                return undefined;
            }
          formatCtrl.$formatters.push(phoneFormat);
            
            element.bind("blur", function () {
                var value = phoneFormat(element.val());
                var isValid = !!value;
                if (isValid) {
                    formatCtrl.$setViewValue(value);
                    formatCtrl.$render();
                }
                
                formatCtrl.$setValidity("telephone", isValid);
                scope.$apply();
            });
        }
    };
});

