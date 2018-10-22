goog.provide('ga_gl_style_service');
(function() {
  var module = angular.module('ga_gl_style_service', []);

  module.provider('gaGLStyle', function() {
    this.$get = function($http, $q, $window) {
      var GLStyle = function() {
        this.styleJSONCache = null;

        this.spriteJSONCache = null;

        this.filters = [];

        this.edits = [];

        this.get = function(styleUrl) {
          var that = this;
          var defer = $q.defer();
          $http.
              get(styleUrl, {
                cache: true
              }).
              then(
                  function(response) {
                    that.styleJSONCache = response.data;
                    // load sprite
                    var spriteUrl = that.styleJSONCache.sprite + '.json';
                    $http.
                        get(spriteUrl, {
                          cache: true
                        }).
                        then(
                            function(res) {
                              that.spriteJSONCache = res.data;
                              defer.resolve({
                                styleJSON: that.styleJSONCache,
                                spriteJSON: that.spriteJSONCache
                              });
                            },
                            function(reason) {
                              that.spriteJSON = null;
                              $window.console.error(
                                  'Unable to load ' +
                        spriteUrl +
                        ' because ' +
                        reason
                              );
                              // failing to load sprite is ok for now...
                              defer.resolve({
                                styleJSON: that.styleJSONCache,
                                spriteJSON: that.spriteJSONCache
                              });
                            }
                        );
                  },
                  function(reason) {
                    that.styleJSONCache = null;
                    that.spriteJSONCache = null;
                    var msg =
                  'Unable to load the style from ' +
                  styleUrl +
                  ' because ' +
                  reason;
                    $window.console.error(msg);
                    defer.reject(msg);
                  }
              );
          return defer.promise;
        };

        this.cloneStyle = function() {
          var newStyleJSON = {};
          angular.copy(this.styleJSONCache, newStyleJSON);
          return newStyleJSON;
        };

        // Hide / show layers base on layers props
        // [[propertyName, comparator, propertyValue], ...]
        this.filter = function(filters) {
          var that = this;
          var layers = [];
          var newStyleJSON = this.cloneStyle();
          this.filters = this.filters.concat(filters);
          newStyleJSON.layers.forEach(function(layer) {
            var addLayer = true;
            that.filters.forEach(function(filter) {
              var propertyName = filter[0];
              var comparator = filter[1];
              var propertyValue = filter[2];
              var layerProperty = layer[propertyName];
              if (layerProperty) {
                if (comparator === '==') {
                  addLayer = addLayer && layerProperty !== propertyValue;
                } else if (comparator === '!=') {
                  addLayer = addLayer && layerProperty === propertyValue;
                }
              }
            });
            if (addLayer) layers.push(layer);
          });
          newStyleJSON.layers = layers;
          return newStyleJSON;
        };

        this.edit = function(edits) {
          var newStyleJSON = this.cloneStyle();
          this.edits = this.edits.concat(edits);
          // TODO apply filters and edits logic here and return a new object
          return newStyleJSON;
        };

        // Remove all filters and edits
        this.reset = function() {
          this.filters = [];
          this.edits = [];
          return this.styleJSONCache;
        };
      };
      return new GLStyle();
    };
  });
})();
