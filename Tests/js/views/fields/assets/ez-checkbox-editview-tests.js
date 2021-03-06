/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-checkbox-editview-tests', function (Y) {
    var viewTest, registerTest, getFieldTest;

    viewTest = new Y.Test.Case({
        name: "eZ Checkbox View test",

        _getFieldDefinition: function (required, defaultValue) {
            return {
                isRequired: required,
                defaultValue: defaultValue
            };
        },

        setUp: function () {
            this.field = {};
            this.jsonContent = {};
            this.jsonContentType = {};
            this.jsonVersion = {};
            this.content = new Y.Mock();
            this.contentType = new Y.Mock();
            this.version = new Y.Mock();
            Y.Mock.expect(this.content, {
                method: 'toJSON',
                returns: this.jsonContent
            });
            Y.Mock.expect(this.contentType, {
                method: 'toJSON',
                returns: this.jsonContentType
            });
            Y.Mock.expect(this.version, {
                method: 'toJSON',
                returns: this.jsonVersion
            });

            this.view = new Y.eZ.CheckboxEditView({
                container: '.container',
                field: this.field,
                content: this.content,
                version: this.version,
                contentType: this.contentType
            });
        },

        tearDown: function () {
            this.view.destroy();
        },

        _testAvailableVariables: function (required, defaultValue, expectRequired, expectDefaultValue) {
            var fieldDefinition = this._getFieldDefinition(required, defaultValue),
                that = this;

            this.view.set('fieldDefinition', fieldDefinition);

            this.view.template = function (variables) {
                Y.Assert.isObject(variables, "The template should receive some variables");
                Y.Assert.areEqual(7, Y.Object.keys(variables).length, "The template should receive 7 variables");

                Y.Assert.areSame(
                     that.jsonContent, variables.content,
                    "The content should be available in the field edit view template"
                );
                Y.Assert.areSame(
                     that.jsonVersion, variables.version,
                    "The version should be available in the field edit view template"
                );
                Y.Assert.areSame(
                    that.jsonContentType, variables.contentType,
                    "The contentType should be available in the field edit view template"
                );
                Y.Assert.areSame(
                    fieldDefinition, variables.fieldDefinition,
                    "The fieldDefinition should be available in the field edit view template"
                );
                Y.Assert.areSame(
                    that.field, variables.field,
                    "The field should be available in the field edit view template"
                );

                Y.Assert.areSame(expectRequired, variables.isRequired);
                Y.Assert.areSame(expectDefaultValue, variables.defaultValue);

                return '';
            };
            this.view.render();
        },

        "Test not required field and false default value": function () {
            this._testAvailableVariables(false, false, false, false);
        },

        "Test required field and false default value": function () {
            this._testAvailableVariables(true, false, true, false);
        },

        "Test not required field and true default value": function () {
            this._testAvailableVariables(false, true, false, true);
        },

        "Test required field and true default value": function () {
            this._testAvailableVariables(true, true, true, true);
        }
    });

    Y.Test.Runner.setName("eZ Checkbox Edit View tests");
    Y.Test.Runner.add(viewTest);

    getFieldTest = new Y.Test.Case(
        Y.merge(Y.eZ.Test.GetFieldTests, {
            fieldDefinition: {isRequired: false},
            ViewConstructor: Y.eZ.CheckboxEditView,
            newValue: true,
        })
    );
    Y.Test.Runner.add(getFieldTest);

    registerTest = new Y.Test.Case(Y.eZ.EditViewRegisterTest);
    registerTest.name = "Checkbox Edit View registration test";
    registerTest.viewType = Y.eZ.CheckboxEditView;
    registerTest.viewKey = "ezboolean";

    Y.Test.Runner.add(registerTest);

}, '', {requires: ['test', 'getfield-tests', 'editviewregister-tests', 'ez-checkbox-editview']});
