var POS = (function(App, Backbone, Marionette, $, _) {

    App.SettingsApp.Controller = Marionette.Controller.extend({

        initialize: function () {

            this.settingsRegion = new Marionette.Region({
                el: '#wc-pos-settings'
            });

            // store form state
            var SettingsModel = Backbone.Model.extend({
                url: ajaxurl,
                defaults: { action: 'wc_pos_save_admin_settings' }
            });
            this.settingsCollection = new Backbone.Collection( App.bootstrap, {
                model: SettingsModel
            });

            this._showTabs();
            this._showSettings({ tab: 'general' });

        },

        _showTabs: function () {
            var view = new App.SettingsApp.Views.Tabs();

            // tab clicked
            this.listenTo(view, 'settings:tab:clicked', function (tab) {
                this._showSettings({ tab: tab });
            }, this);

        },

        _showSettings: function (options) {
            _.defaults( options, { col: this.settingsCollection } );
            var view = new App.SettingsApp.Views.Settings(options);

            // tab clicked
            this.listenTo(view, 'settings:form:submit', function (model) {
                this._saveSettings(model);
            });

            this.settingsRegion.show(view);

        },

        _saveSettings: function (model) {
            model.save( [], { data: model.toJSON(), emulateHTTP: true, emulateJSON: true } );
        }

    });

    return App;

})(POS || {}, Backbone, Marionette, jQuery, _);