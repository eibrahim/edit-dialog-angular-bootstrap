#Edit Dialog for Bootstrap and Angular

NOTE: I haven't done a lot of open source but would like to do more, so if you find this useful, please let me know at http://twitter.com/eibrahim or at http://www.emadibrahim.com - thanks.
##Demo
There is no live demo, but you can see the example in the examples folder or take a look at this screenshot http://grab.by/mSMq
##Installation

`bower install edit-dialog-angular-bootstrap`

##Setup

* add references to angular, angular-resource, bootstrap, ui-bootstrap
* link to css

`<script type="text/javascript" src="components/edit_dialog/edit_dialog.js"></script>`

* see example in the examples folder

##Use

Add a dependency in your app on edit-dialog, ui-bootstrap and ngResource
`var demoApp = angular.module("EditDialogDemo", ['ui.bootstrap', 'edit-dialog', 'ngResource']);`

Simply create a dialog option and open the dialog passing in a template:

        var dialog_options = {
            backdrop: true,
            keyboard: true,
            resolve: {
                item: function () {
                    return item;
                },
                items: function () {
                    return $scope.items;
                }
            }
        };
        var d = $dialog.dialog(dialog_options);
        d.open('/my-edit.template', "EditDialogCtrl").then(function (result) {
        });

The resolve method on the options object will inject an item and an items array.  This is intended to work with ngResource so it assumes that the item is of type $resource and has the methods $save, $update and $delete.

Now the template can really be anything you want, but if you are using bootstrap, it will probably look something like this:

    <script type="text/ng-template" id="/my-edit.template">

        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" ng-click="close()" aria-hidden="true">&times;</button>
            <h1 ng-show="isNew">New Item</h1>

            <h1 ng-hide="isNew">Edit Item</h1>
        </div>
        <div class="modal-body">
            <form class="form-horizontal" ng-submit="" ng-disabled="settings.saving" name='formAddEditItem'>

                <fieldset>
                    <div class="control-group">
                        <label class="control-label" for="name">Name</label>

                        <div class="controls">
                            <input class="input-xlarge" id="name" type="text" ng-model="model.name"
                                   autofocus="{{settings.focus}}" ng-disabled="settings.saving" ng-required="true">
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer">
            <i class='halflings-icon refresh' ng-show="settings.saving"></i>
            <input type="submit" class="btn btn-primary" ng-disabled="settings.saving || formAddEditItem.$invalid"
                   value="Save" ng-click="save()"/>
            <confirm-button ng-hide="isNew" confirm='delete()' class='pull-left' ng-disabled="settings.saving"></confirm-button>
        </div>
    </script>


## confirmButton directive
Notice the confirm-button directive, this is a cool way to delete an object when editing it.  It displays a confirmation popover too.

It will look something like this http://grab.by/mSMq

You can use it anywhere though.  Simply give it the method to call when delete is confirmed.  For example, if you have a method in your scope called deleteMyItem then you will add the delete button like this

Default button using trash icon

        `<confirm-button confirm='deleteMyItem()'></confirm-button>`

Customize icon using any of the bootstrap icons

        `<confirm-button confirm='deleteMyItem()' icont='icon-ban-circle'></confirm-button>`

This will give you an instant delete button with a confirmation popover.



