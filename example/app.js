var demoApp = angular.module("EditDialogDemo", ['ui.bootstrap', 'edit-dialog', 'ngResource']);

demoApp.controller("DemoController", function ($scope, $dialog, $resource) {
    var count = 1;
    var fakeResource = function () {
        return {
            $save: function (success, error) {
                this.id = count++;
                success(this);
            },
            $update: function (success, error) {
                success(this);
            },
            $delete: function (success) {
                success();
            }
        };
    };
    var api = {
        Item: fakeResource,
        Task: $resource('/api/tasks/:id', {id: '@id'})
    }
    var item1 = new fakeResource();
    angular.extend(item1, {id: count++, name: 'Item one'});
    var item2 = new fakeResource();
    angular.extend(item2, {id: count++, name: 'Item two'});

    $scope.items = [item1, item2];

    $scope.createNewItem = function () {
        var dialog_options = {
            backdrop: true,
            keyboard: true
        };
        dialog_options.resolve = {
            item: function () {
                return new api.Item();
            },
            items: function () {
                return $scope.items;
            }
        };
        var d = $dialog.dialog(dialog_options);
        d.open('/my-edit.template', "EditDialogCtrl").then(function (result) {
        });
    }
    $scope.editItem = function (i) {
        var dialog_options = {
            backdrop: true,
            keyboard: true,
            resolve: {
                item: function () {
                    return i;
                },
                items: function () {
                    return $scope.items;
                }
            }
        };
        var d = $dialog.dialog(dialog_options);
        d.open('/my-edit.template', "EditDialogCtrl").then(function (result) {
        });
    }
})
;