'use strict';
var editDialogModule = angular.module('edit-dialog',['ui.bootstrap.dialog']);
editDialogModule.controller('EditDialogCtrl', function ($scope, dialog, item, items) {
    $scope.model = angular.copy(item);
    $scope.isNew = $scope.model.id === undefined;

    $scope.settings = {
        focus: true,
        saving: false
    };

    $scope.close = function () {
        return dialog.close(true);
    };

    $scope["delete"] = function () {
        return $scope.model.$delete(function () {
            if (items) items.splice(items.indexOf(item), 1);
            return dialog.close(true);
        });
    };

    var errorSaving = function (error) {
        $scope.settings.saving = false;
    };

    var successSaving = function () {
        $scope.settings.saving = false;
        dialog.close(true);
    }

    $scope.save = function () {
        $scope.settings.saving = true;
        if ($scope.isNew)
            $scope.model.$save(function (o) {
                if (items) items.push(o);
                successSaving();
            }, errorSaving);
        else
            $scope.model.$update(function () {
                if (items) items[items.indexOf(item)] = $scope.model;
                successSaving();
            }, errorSaving);
    };
});

//confirm button directive
angular.module('edit-dialog')
    .directive('confirmButton', function ($log, $compile) {
        return {
            restrict: "E",
            replace: false,
            transclude: true,
            template: "<a id=\"{{my_id}}\" class=\"btn btn-danger confirmation-popover-button\" ng-click=\"show()\" >\n  <i class=\"icon {{icon || 'icon-trash'}}\"></i>\n</a>",
            scope: {
                confirm: '&',
                icon: '@'
            },
            link: function (scope, elm, attrs) {
                scope.my_count = Date.now();
                scope.my_id = "my-confirm-button-" + scope.my_count;
                scope.click = function () {
                    scope.confirm();
                    elm.popover('destroy');
                };
                scope.cancel = function () {
                    return elm.popover('hide');
                };
                scope.show = function () {
                    $(".confirmation-popover-button").each(function (i, e) {
                        if ($(e).attr("id") !== scope.my_id) {
                            $(e).popover('hide');
                        }
                    });
                    return elm.popover("toggle");
                };
                return elm.popover({
                    title: "Are you sure?",
                    html: true,
                    placement: 'left',
                    trigger: "manual",
                    content: "<div id='my-confirmation-popover" + scope.my_count + "' class='btn-toolbar'>\n  <button ng-click='cancel()' class='btn btn-link'>No</button>\n  <button class='btn btn-danger' ng-click='click()'>Yes</button>\n</div>"
                }).on("shown", function () {
                        var html = $("#my-confirmation-popover" + scope.my_count).contents();
                        return $compile(html)(scope);
                    });
            }
        };
    });

