/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-xmltext-editview', function (Y) {
    "use strict";
    /**
     * Provides the field edit view for the XmlText (ezxmltext) fields
     *
     * @module ez-xmltext-editview
     */

    Y.namespace('eZ');

    var FIELDTYPE_IDENTIFIER = 'ezxmltext';

    /**
     * Xml Text edit view
     *
     * @namespace eZ
     * @class XmlTextEditView
     * @constructor
     * @extends eZ.FieldEditView
     */
    Y.eZ.XmlTextEditView = Y.Base.create('xmlTextEditView', Y.eZ.FieldEditView, [], {
        events: {
            '.ez-xmltext-input-ui textarea': {
                'blur': 'validate',
                'valuechange': 'validate'
            }
        },

        /**
         * Validates the current input of the xml text
         *
         * @method validate
         */
        validate: function () {
            if ( this._getInputValidity().valueMissing ) {
                this.set('errorStatus', 'This field is required');
            } else {
                this.set('errorStatus', false);
            }
        },

        /**
         * Defines the variables to be imported in the field edit template for xml
         * text.
         *
         * @protected
         * @method _variables
         * @return {Object} containing isRequired entry
         */
        _variables: function () {
            return {
                "isRequired": this.get('fieldDefinition').isRequired
            };
        },

        /**
         * Returns the input validity state object for the input generated by
         * the text block template
         *
         * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
         *
         * @protected
         * @method _getInputValidity
         * @return {ValidityState}
         */
        _getInputValidity: function () {
            return this._getTextareaNode().get('validity');
        },

        /**
         * Returns the field value suitable for the REST API based on the
         * current input.
         *
         * @method _getFieldValue
         * @protected
         * @return String
         */
        _getFieldValue: function () {
            return {xml: this._getTextareaNode().get('value')};
        },

        /**
         * Returns the textarea Node used for the user input
         *
         * @private
         * @method _getTextareaNode
         * @return {Y.Node}
         */
        _getTextareaNode: function () {
            return this.get('container').one('.ez-xmltext-input-ui textarea');
        },
    });

    Y.eZ.FieldEditView.registerFieldEditView(
        FIELDTYPE_IDENTIFIER, Y.eZ.XmlTextEditView
    );
});
