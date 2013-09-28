angular.module('baseline.about', ['ui.router']).config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('about', {
      url: '/about',
      controller: 'AboutCtrl',
      templateUrl: 'about/about.tpl.html'
    });
  }
]).controller('AboutCtrl', [
  '$scope',
  function ($scope) {
  }
]);
angular.module('baseline', [
  'templates-app',
  'templates-common',
  'baseline.about',
  'ui.router'
]).config([
  '$urlRouterProvider',
  '$locationProvider',
  function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  }
]).controller('AppCtrl', [
  '$scope',
  '$location',
  '$rootScope',
  function ($scope, $location, $rootScope, pendingServerInteractions, security) {
    $scope.dummy = 'baseline';
  }
]);
angular.module('templates-app', ['about/about.tpl.html']);
angular.module('about/about.tpl.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('about/about.tpl.html', '<div>\n' + '  <p class="lead">\n' + '    This is the about page.\n' + '  </p>\n' + '</div>\n' + '');
  }
]);
angular.module('templates-common', []);
(function (r, t, e) {
  'use strict';
  function n(r, t) {
    return P(new (P(function () {
    }, { prototype: r }))(), t);
  }
  function a(r) {
    return y(arguments, function (t) {
      t !== r && y(t, function (t, e) {
        r.hasOwnProperty(e) || (r[e] = t);
      });
    }), r;
  }
  function o(r, t) {
    var e = [];
    for (var n in r.path)
      if ('' !== r.path[n]) {
        if (!t.path[n])
          break;
        e.push(r.path[n]);
      }
    return e;
  }
  function i(r, t, e, n) {
    var a, i = o(e, n), u = {}, s = [];
    for (var l in i)
      if (i[l].params && i[l].params.length) {
        a = i[l].params;
        for (var c in a)
          s.indexOf(a[c]) >= 0 || (s.push(a[c]), u[a[c]] = r[a[c]]);
      }
    return P({}, u, t);
  }
  function u(r, t) {
    var n = 1, o = 2, i = {}, u = [], s = i, l = P(r.when(i), {
        $$promises: i,
        $$values: i
      });
    this.study = function (i) {
      function c(r, e) {
        if (v[e] !== o) {
          if (p.push(e), v[e] === n)
            throw p.splice(0, p.indexOf(e)), Error('Cyclic dependency: ' + p.join(' -> '));
          if (v[e] = n, b(r))
            h.push(e, [function () {
                return t.get(e);
              }], u);
          else {
            var a = t.annotate(r);
            y(a, function (r) {
              r !== e && i.hasOwnProperty(r) && c(i[r], r);
            }), h.push(e, r, a);
          }
          p.pop(), v[e] = o;
        }
      }
      function f(r) {
        return E(r) && r.then && r.$$promises;
      }
      if (!E(i))
        throw Error('\'invocables\' must be an object');
      var h = [], p = [], v = {};
      return y(i, c), i = p = v = null, function (n, o, i) {
        function u() {
          --w || (b || a(d, o.$$values), $.$$values = d, $.$$promises = !0, v.resolve(d));
        }
        function c(r) {
          $.$$failure = r, v.reject(r);
        }
        function p(e, a, o) {
          function s(r) {
            f.reject(r), c(r);
          }
          function l() {
            if (!g($.$$failure))
              try {
                f.resolve(t.invoke(a, i, d)), f.promise.then(function (r) {
                  d[e] = r, u();
                }, s);
              } catch (r) {
                s(r);
              }
          }
          var f = r.defer(), h = 0;
          o.forEach(function (r) {
            m.hasOwnProperty(r) && !n.hasOwnProperty(r) && (h++, m[r].then(function (t) {
              d[r] = t, --h || l();
            }, s));
          }), h || l(), m[e] = f.promise;
        }
        if (f(n) && i === e && (i = o, o = n, n = null), n) {
          if (!E(n))
            throw Error('\'locals\' must be an object');
        } else
          n = s;
        if (o) {
          if (!f(o))
            throw Error('\'parent\' must be a promise returned by $resolve.resolve()');
        } else
          o = l;
        var v = r.defer(), $ = v.promise, m = $.$$promises = {}, d = P({}, n), w = 1 + h.length / 3, b = !1;
        if (g(o.$$failure))
          return c(o.$$failure), $;
        o.$$values ? (b = a(d, o.$$values), u()) : (P(m, o.$$promises), o.then(u, c));
        for (var x = 0, y = h.length; y > x; x += 3)
          n.hasOwnProperty(h[x]) ? u() : p(h[x], h[x + 1], h[x + 2]);
        return $;
      };
    }, this.resolve = function (r, t, e, n) {
      return this.study(r)(t, e, n);
    };
  }
  function s(r, t, e) {
    this.fromConfig = function (r, t, e) {
      return g(r.template) ? this.fromString(r.template, t) : g(r.templateUrl) ? this.fromUrl(r.templateUrl, t) : g(r.templateProvider) ? this.fromProvider(r.templateProvider, t, e) : null;
    }, this.fromString = function (r, t) {
      return w(r) ? r(t) : r;
    }, this.fromUrl = function (e, n) {
      return w(e) && (e = e(n)), null == e ? null : r.get(e, { cache: t }).then(function (r) {
        return r.data;
      });
    }, this.fromProvider = function (r, t, n) {
      return e.invoke(r, null, n || { params: t });
    };
  }
  function l(r) {
    function t(t) {
      if (!/^\w+(-+\w+)*$/.test(t))
        throw Error('Invalid parameter name \'' + t + '\' in pattern \'' + r + '\'');
      if (o[t])
        throw Error('Duplicate parameter name \'' + t + '\' in pattern \'' + r + '\'');
      o[t] = !0, l.push(t);
    }
    function e(r) {
      return r.replace(/[\\\[\]\^$*+?.()|{}]/g, '\\$&');
    }
    var n, a = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, o = {}, i = '^', u = 0, s = this.segments = [], l = this.params = [];
    this.source = r;
    for (var c, f, h; (n = a.exec(r)) && (c = n[2] || n[3], f = n[4] || ('*' == n[1] ? '.*' : '[^/]*'), h = r.substring(u, n.index), !(h.indexOf('?') >= 0));)
      i += e(h) + '(' + f + ')', t(c), s.push(h), u = a.lastIndex;
    h = r.substring(u);
    var p = h.indexOf('?');
    if (p >= 0) {
      var v = this.sourceSearch = h.substring(p);
      h = h.substring(0, p), this.sourcePath = r.substring(0, u + p), y(v.substring(1).split(/[&?]/), t);
    } else
      this.sourcePath = r, this.sourceSearch = '';
    i += e(h) + '$', s.push(h), this.regexp = RegExp(i), this.prefix = s[0];
  }
  function c() {
    this.compile = function (r) {
      return new l(r);
    }, this.isMatcher = function (r) {
      return E(r) && w(r.exec) && w(r.format) && w(r.concat);
    }, this.$get = function () {
      return this;
    };
  }
  function f(r) {
    function t(r) {
      var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(r.source);
      return null != t ? t[1].replace(/\\(.)/g, '$1') : '';
    }
    function e(r, t) {
      return r.replace(/\$(\$|\d{1,2})/, function (r, e) {
        return t['$' === e ? 0 : Number(e)];
      });
    }
    function n(r, t, e) {
      if (!e)
        return !1;
      var n = r.invoke(t, t, { $match: e });
      return g(n) ? n : !0;
    }
    var a = [], o = null;
    this.rule = function (r) {
      if (!w(r))
        throw Error('\'rule\' must be a function');
      return a.push(r), this;
    }, this.otherwise = function (r) {
      if (b(r)) {
        var t = r;
        r = function () {
          return t;
        };
      } else if (!w(r))
        throw Error('\'rule\' must be a function');
      return o = r, this;
    }, this.when = function (a, o) {
      var i, u = b(o);
      if (b(a) && (a = r.compile(a)), !u && !w(o) && !x(o))
        throw Error('invalid \'handler\' in when()');
      var s = {
          matcher: function (t, e) {
            return u && (i = r.compile(e), e = [
              '$match',
              function (r) {
                return i.format(r);
              }
            ]), P(function (r, a) {
              return n(r, e, t.exec(a.path(), a.search()));
            }, { prefix: b(t.prefix) ? t.prefix : '' });
          },
          regex: function (r, a) {
            if (r.global || r.sticky)
              throw Error('when() RegExp must not be global or sticky');
            return u && (i = a, a = [
              '$match',
              function (r) {
                return e(i, r);
              }
            ]), P(function (t, e) {
              return n(t, a, r.exec(e.path()));
            }, { prefix: t(r) });
          }
        }, l = {
          matcher: r.isMatcher(a),
          regex: a instanceof RegExp
        };
      for (var c in l)
        if (l[c])
          return this.rule(s[c](a, o));
      throw Error('invalid \'what\' in when()');
    }, this.$get = [
      '$location',
      '$rootScope',
      '$injector',
      function (r, t, e) {
        function n() {
          function t(t) {
            var n = t(e, r);
            return n ? (b(n) && r.replace().url(n), !0) : !1;
          }
          var n, i = a.length;
          for (n = 0; i > n; n++)
            if (t(a[n]))
              return;
          o && t(o);
        }
        return t.$on('$locationChangeSuccess', n), {};
      }
    ];
  }
  function h(r, a, o) {
    function u(r, t) {
      var n = b(r), a = n ? r : r.name, o = 0 === a.indexOf('.') || 0 === a.indexOf('^');
      if (o) {
        if (!t)
          throw Error('No reference point given for path \'' + a + '\'');
        for (var i = a.split('.'), u = 0, s = i.length, l = t; s > u; u++)
          if ('' !== i[u] || 0 !== u) {
            if ('^' !== i[u])
              break;
            if (!l.parent)
              throw Error('Path \'' + a + '\' not valid for state \'' + t.name + '\'');
            l = l.parent;
          } else
            l = t;
        i = i.slice(u).join('.'), a = l.name + (l.name && i ? '.' : '') + i;
      }
      var c = m[a];
      return !c || !n && (n || c !== r && c.self !== r) ? e : c;
    }
    function s(t) {
      t = n(t, {
        self: t,
        resolve: t.resolve || {},
        toString: function () {
          return this.name;
        }
      });
      var e = t.name;
      if (!b(e) || e.indexOf('@') >= 0)
        throw Error('State must have a valid name');
      if (m[e])
        throw Error('State \'' + e + '\'\' is already defined');
      for (var a in d)
        t[a] = d[a](t);
      return m[e] = t, !t['abstract'] && t.url && r.when(t.url, [
        '$match',
        '$stateParams',
        function (r, e) {
          $.$current.navigable == t && h(r, e) || $.transitionTo(t, r, !1);
        }
      ]), t;
    }
    function l(r, t) {
      return E(r) ? t = r : t.name = r, s(t), this;
    }
    function c(r, t, a, s, l, c, m) {
      function d(r, e, n, o, i) {
        var u = n ? e : p(r.params, e), s = { $stateParams: u };
        i.resolve = l.resolve(r.resolve, s, i.resolve, r);
        var c = [i.resolve.then(function (r) {
              i.globals = r;
            })];
        return o && c.push(o), y(r.views, function (t, e) {
          var n = t.resolve && t.resolve !== r.resolve ? t.resolve : {};
          n.$template = [function () {
              return a.load(e, {
                view: t,
                locals: s,
                params: u,
                notify: !1
              }) || '';
            }], c.push(l.resolve(n, s, i.resolve, r).then(function (n) {
            n.$$controller = t.controller, n.$$state = r, i[e] = n;
          }));
        }), t.all(c).then(function () {
          return i;
        });
      }
      var w = t.reject(Error('transition superseded')), b = t.reject(Error('transition prevented'));
      return v.locals = {
        resolve: null,
        globals: { $stateParams: {} }
      }, $ = {
        params: {},
        current: v.self,
        $current: v,
        transition: null
      }, $.go = function (r, t, e) {
        return this.transitionTo(r, t, P({
          inherit: !0,
          relative: $.$current
        }, e));
      }, $.transitionTo = function (e, a, o) {
        g(o) || (o = o === !0 || o === !1 ? { location: o } : {}), a = a || {}, o = P({
          location: !0,
          inherit: !1,
          relative: null
        }, o);
        var l = u(e, o.relative);
        if (!g(l))
          throw Error('No such state ' + l);
        if (l['abstract'])
          throw Error('Cannot transition to abstract state \'' + e + '\'');
        o.inherit && (a = i(c, a || {}, $.$current, l)), e = l;
        var p, E, x = e.path, y = $.$current, C = $.params, S = y.path, O = v.locals, k = [];
        for (p = 0, E = x[p]; E && E === S[p] && h(a, C, E.ownParams); p++, E = x[p])
          O = k[p] = E.locals;
        if (e === y && O === y.locals)
          return $.transition = null, t.when($.current);
        a = f(e.params, a || {});
        var R = r.$broadcast('$stateChangeStart', e.self, a, y.self, C);
        if (R.defaultPrevented)
          return b;
        for (var I = t.when(O), M = p; x.length > M; M++, E = x[M])
          O = k[M] = n(O), I = d(E, a, E === e, I, O);
        var U = $.transition = I.then(function () {
            var t, n, i;
            if ($.transition !== U)
              return w;
            for (t = S.length - 1; t >= p; t--)
              i = S[t], i.self.onExit && s.invoke(i.self.onExit, i.self, i.locals.globals), i.locals = null;
            for (t = p; x.length > t; t++)
              n = x[t], n.locals = k[t], n.self.onEnter && s.invoke(n.self.onEnter, n.self, n.locals.globals);
            $.$current = e, $.current = e.self, $.params = a, j($.params, c), $.transition = null;
            var u = e.navigable;
            return o.location && u && m.url(u.url.format(u.locals.globals.$stateParams)), r.$broadcast('$stateChangeSuccess', e.self, a, y.self, C), $.current;
          }, function (n) {
            return $.transition !== U ? w : ($.transition = null, r.$broadcast('$stateChangeError', e.self, a, y.self, C, n), t.reject(n));
          });
        return U;
      }, $.is = function (r) {
        var t = u(r);
        return g(t) ? $.$current === t : e;
      }, $.includes = function (r) {
        var t = u(r);
        return g(t) ? g($.$current.includes[t.name]) : e;
      }, $.href = function (r, t, e) {
        e = P({
          lossy: !0,
          inherit: !1,
          relative: $.$current
        }, e || {});
        var n = u(r, e.relative);
        if (!g(n))
          return null;
        t = i(c, t || {}, $.$current, n);
        var a = n && e.lossy ? n.navigable : n, s = a && a.url ? a.url.format(f(n.params, t || {})) : null;
        return !o.html5Mode() && s ? '#' + s : s;
      }, $.get = function (r) {
        var t = u(r);
        return t && t.self ? t.self : null;
      }, $;
    }
    function f(r, t) {
      var e = {};
      return y(r, function (r) {
        var n = t[r];
        e[r] = null != n ? n + '' : null;
      }), e;
    }
    function h(r, t, e) {
      if (!e) {
        e = [];
        for (var n in r)
          e.push(n);
      }
      for (var a = 0; e.length > a; a++) {
        var o = e[a];
        if (r[o] != t[o])
          return !1;
      }
      return !0;
    }
    function p(r, t) {
      var e = {};
      return y(r, function (r) {
        e[r] = t[r];
      }), e;
    }
    var v, $, m = {}, d = {
        parent: function (r) {
          if (g(r.parent) && r.parent)
            return u(r.parent);
          var t = /^(.+)\.[^.]+$/.exec(r.name);
          return t ? u(t[1]) : v;
        },
        data: function (r) {
          return r.parent && r.parent.data && (r.data = r.self.data = t.extend({}, r.parent.data, r.data)), r.data;
        },
        url: function (r) {
          var t = r.url;
          if (b(t))
            return '^' == t.charAt(0) ? a.compile(t.substring(1)) : (r.parent.navigable || v).url.concat(t);
          if (a.isMatcher(t) || null == t)
            return t;
          throw Error('Invalid url \'' + t + '\' in state \'' + r + '\'');
        },
        navigable: function (r) {
          return r.url ? r : r.parent ? r.parent.navigable : null;
        },
        params: function (r) {
          if (!r.params)
            return r.url ? r.url.parameters() : r.parent.params;
          if (!x(r.params))
            throw Error('Invalid params in state \'' + r + '\'');
          if (r.url)
            throw Error('Both params and url specicified in state \'' + r + '\'');
          return r.params;
        },
        views: function (r) {
          var t = {};
          return y(g(r.views) ? r.views : { '': r }, function (e, n) {
            0 > n.indexOf('@') && (n += '@' + r.parent.name), t[n] = e;
          }), t;
        },
        ownParams: function (r) {
          if (!r.parent)
            return r.params;
          var t = {};
          y(r.params, function (r) {
            t[r] = !0;
          }), y(r.parent.params, function (e) {
            if (!t[e])
              throw Error('Missing required parameter \'' + e + '\' in state \'' + r.name + '\'');
            t[e] = !1;
          });
          var e = [];
          return y(t, function (r, t) {
            r && e.push(t);
          }), e;
        },
        path: function (r) {
          return r.parent ? r.parent.path.concat(r) : [];
        },
        includes: function (r) {
          var t = r.parent ? P({}, r.parent.includes) : {};
          return t[r.name] = !0, t;
        }
      };
    v = s({
      name: '',
      url: '^',
      views: null,
      'abstract': !0
    }), v.navigable = null, this.state = l, this.$get = c, c.$inject = [
      '$rootScope',
      '$q',
      '$view',
      '$injector',
      '$resolve',
      '$stateParams',
      '$location',
      '$urlRouter'
    ];
  }
  function p() {
    function r(r, t) {
      return {
        load: function (e, n) {
          var a, o = {
              template: null,
              controller: null,
              view: null,
              locals: null,
              notify: !0,
              async: !0,
              params: {}
            };
          return n = P(o, n), n.view && (a = t.fromConfig(n.view, n.params, n.locals)), a && n.notify && r.$broadcast('$viewContentLoading', n), a;
        }
      };
    }
    this.$get = r, r.$inject = [
      '$rootScope',
      '$templateFactory'
    ];
  }
  function v(r, e, n, a, o) {
    var i;
    try {
      i = a.get('$animator');
    } catch (u) {
    }
    var s = !1, l = {
        restrict: 'ECA',
        terminal: !0,
        transclude: !0,
        compile: function (a, u, c) {
          return function (a, u, f) {
            function h(t) {
              var i = r.$current && r.$current.locals[$];
              if (i !== v) {
                var s = w(d && t);
                if (s.remove(u), p && (p.$destroy(), p = null), !i)
                  return v = null, E.state = null, s.restore(c(a), u);
                v = i, E.state = i.$$state;
                var l = e(s.populate(i.$template, u));
                if (p = a.$new(), i.$$controller) {
                  i.$scope = p;
                  var f = n(i.$$controller, i);
                  u.children().data('$ngControllerController', f);
                }
                l(p), p.$emit('$viewContentLoaded'), m && p.$eval(m), o();
              }
            }
            var p, v, $ = f[l.name] || f.name || '', m = f.onload || '', d = g(i) && i(a, f), w = function (r) {
                return {
                  'true': {
                    remove: function (r) {
                      d.leave(r.contents(), r);
                    },
                    restore: function (r, t) {
                      d.enter(r, t);
                    },
                    populate: function (r, e) {
                      var n = t.element('<div></div>').html(r).contents();
                      return d.enter(n, e), n;
                    }
                  },
                  'false': {
                    remove: function (r) {
                      r.html('');
                    },
                    restore: function (r, t) {
                      t.append(r);
                    },
                    populate: function (r, t) {
                      return t.html(r), t.contents();
                    }
                  }
                }['' + r];
              };
            u.append(c(a));
            var b = u.parent().inheritedData('$uiView');
            0 > $.indexOf('@') && ($ = $ + '@' + (b ? b.state.name : ''));
            var E = {
                name: $,
                state: null
              };
            u.data('$uiView', E);
            var x = function () {
              if (!s) {
                s = !0;
                try {
                  h(!0);
                } catch (r) {
                  throw s = !1, r;
                }
                s = !1;
              }
            };
            a.$on('$stateChangeSuccess', x), a.$on('$viewContentLoading', x), h(!1);
          };
        }
      };
    return l;
  }
  function $(r) {
    var t = r.match(/^([^(]+?)\s*(\((.*)\))?$/);
    if (!t || 4 !== t.length)
      throw Error('Invalid state ref \'' + r + '\'');
    return {
      state: t[1],
      paramExpr: t[3] || null
    };
  }
  function m(r) {
    return {
      restrict: 'A',
      link: function (t, n, a) {
        var o = $(a.uiSref), i = null, u = r.$current, s = 'FORM' === n[0].nodeName, l = s ? 'action' : 'href', c = !0, f = n.parent().inheritedData('$uiView');
        f && f.state && f.state.name && (u = f.state);
        var h = function (t) {
          if (t && (i = t), c) {
            var a = r.href(o.state, i, { relative: u });
            return a ? (n[0][l] = a, e) : (c = !1, !1);
          }
        };
        o.paramExpr && (t.$watch(o.paramExpr, function (r, t) {
          r !== t && h(r);
        }, !0), i = t.$eval(o.paramExpr)), h(), s || n.bind('click', function (e) {
          1 != e.which || e.ctrlKey || e.metaKey || e.shiftKey || (r.go(o.state, i, { relative: u }), t.$apply(), e.preventDefault());
        });
      }
    };
  }
  function d(r, t) {
    function a(r) {
      this.locals = r.locals.globals, this.params = this.locals.$stateParams;
    }
    function o() {
      this.locals = null, this.params = null;
    }
    function i(e, i) {
      if (null != i.redirectTo) {
        var u, l = i.redirectTo;
        if (b(l))
          u = l;
        else {
          if (!w(l))
            throw Error('Invalid \'redirectTo\' in when()');
          u = function (r, t) {
            return l(r, t.path(), t.search());
          };
        }
        t.when(e, u);
      } else
        r.state(n(i, {
          parent: null,
          name: 'route:' + encodeURIComponent(e),
          url: e,
          onEnter: a,
          onExit: o
        }));
      return s.push(i), this;
    }
    function u(r, t, n) {
      function a(r) {
        return '' !== r.name ? r : e;
      }
      var o = {
          routes: s,
          params: n,
          current: e
        };
      return t.$on('$stateChangeStart', function (r, e, n, o) {
        t.$broadcast('$routeChangeStart', a(e), a(o));
      }), t.$on('$stateChangeSuccess', function (r, e, n, i) {
        o.current = a(e), t.$broadcast('$routeChangeSuccess', a(e), a(i)), j(n, o.params);
      }), t.$on('$stateChangeError', function (r, e, n, o, i, u) {
        t.$broadcast('$routeChangeError', a(e), a(o), u);
      }), o;
    }
    var s = [];
    a.$inject = ['$$state'], this.when = i, this.$get = u, u.$inject = [
      '$state',
      '$rootScope',
      '$routeParams'
    ];
  }
  var g = t.isDefined, w = t.isFunction, b = t.isString, E = t.isObject, x = t.isArray, y = t.forEach, P = t.extend, j = t.copy;
  t.module('ui.router.util', ['ng']), t.module('ui.router.router', ['ui.router.util']), t.module('ui.router.state', [
    'ui.router.router',
    'ui.router.util'
  ]), t.module('ui.router', ['ui.router.state']), t.module('ui.router.compat', ['ui.router']), u.$inject = [
    '$q',
    '$injector'
  ], t.module('ui.router.util').service('$resolve', u), s.$inject = [
    '$http',
    '$templateCache',
    '$injector'
  ], t.module('ui.router.util').service('$templateFactory', s), l.prototype.concat = function (r) {
    return new l(this.sourcePath + r + this.sourceSearch);
  }, l.prototype.toString = function () {
    return this.source;
  }, l.prototype.exec = function (r, t) {
    var e = this.regexp.exec(r);
    if (!e)
      return null;
    var n, a = this.params, o = a.length, i = this.segments.length - 1, u = {};
    if (i !== e.length - 1)
      throw Error('Unbalanced capture group in route \'' + this.source + '\'');
    for (n = 0; i > n; n++)
      u[a[n]] = e[n + 1];
    for (; o > n; n++)
      u[a[n]] = t[a[n]];
    return u;
  }, l.prototype.parameters = function () {
    return this.params;
  }, l.prototype.format = function (r) {
    var t = this.segments, e = this.params;
    if (!r)
      return t.join('');
    var n, a, o, i = t.length - 1, u = e.length, s = t[0];
    for (n = 0; i > n; n++)
      o = r[e[n]], null != o && (s += encodeURIComponent(o)), s += t[n + 1];
    for (; u > n; n++)
      o = r[e[n]], null != o && (s += (a ? '&' : '?') + e[n] + '=' + encodeURIComponent(o), a = !0);
    return s;
  }, t.module('ui.router.util').provider('$urlMatcherFactory', c), f.$inject = ['$urlMatcherFactoryProvider'], t.module('ui.router.router').provider('$urlRouter', f), h.$inject = [
    '$urlRouterProvider',
    '$urlMatcherFactoryProvider',
    '$locationProvider'
  ], t.module('ui.router.state').value('$stateParams', {}).provider('$state', h), p.$inject = [], t.module('ui.router.state').provider('$view', p), v.$inject = [
    '$state',
    '$compile',
    '$controller',
    '$injector',
    '$anchorScroll'
  ], t.module('ui.router.state').directive('uiView', v), m.$inject = ['$state'], t.module('ui.router.state').directive('uiSref', m), d.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ], t.module('ui.router.compat').provider('$route', d).directive('ngView', v);
}(window, window.angular));
;
(function () {
  function n(n, t, e) {
    e = (e || 0) - 1;
    for (var r = n ? n.length : 0; ++e < r;)
      if (n[e] === t)
        return e;
    return -1;
  }
  function t(t, e) {
    var r = typeof e;
    if (t = t.k, 'boolean' == r || null == e)
      return t[e] ? 0 : -1;
    'number' != r && 'string' != r && (r = 'object');
    var u = 'number' == r ? e : b + e;
    return t = (t = t[r]) && t[u], 'object' == r ? t && -1 < n(t, e) ? 0 : -1 : t ? 0 : -1;
  }
  function e(n) {
    var t = this.k, e = typeof n;
    if ('boolean' == e || null == n)
      t[n] = !0;
    else {
      'number' != e && 'string' != e && (e = 'object');
      var r = 'number' == e ? n : b + n, t = t[e] || (t[e] = {});
      'object' == e ? (t[r] || (t[r] = [])).push(n) : t[r] = !0;
    }
  }
  function r(n) {
    return n.charCodeAt(0);
  }
  function u(n, t) {
    var e = n.l, r = t.l;
    if (e !== r) {
      if (e > r || typeof e == 'undefined')
        return 1;
      if (e < r || typeof r == 'undefined')
        return -1;
    }
    return n.m - t.m;
  }
  function o(n) {
    var t = -1, r = n.length, u = n[0], o = n[0 | r / 2], a = n[r - 1];
    if (u && typeof u == 'object' && o && typeof o == 'object' && a && typeof a == 'object')
      return !1;
    for (u = f(), u['false'] = u['null'] = u['true'] = u.undefined = !1, o = f(), o.b = n, o.k = u, o.push = e; ++t < r;)
      o.push(n[t]);
    return o;
  }
  function a(n) {
    return '\\' + U[n];
  }
  function i() {
    return g.pop() || [];
  }
  function f() {
    return y.pop() || {
      b: null,
      k: null,
      configurable: !1,
      l: null,
      enumerable: !1,
      'false': !1,
      m: 0,
      leading: !1,
      maxWait: 0,
      'null': !1,
      number: null,
      z: null,
      push: null,
      string: null,
      trailing: !1,
      'true': !1,
      undefined: !1,
      n: null,
      writable: !1
    };
  }
  function l() {
  }
  function c(n) {
    n.length = 0, g.length < d && g.push(n);
  }
  function p(n) {
    var t = n.k;
    t && p(t), n.b = n.k = n.l = n.object = n.number = n.string = n.n = null, y.length < d && y.push(n);
  }
  function s(n, t, e) {
    t || (t = 0), typeof e == 'undefined' && (e = n ? n.length : 0);
    var r = -1;
    e = e - t || 0;
    for (var u = Array(0 > e ? 0 : e); ++r < e;)
      u[r] = n[t + r];
    return u;
  }
  function v(e) {
    function g(n) {
      if (!n || _e.call(n) != q)
        return !1;
      var t = n.valueOf, e = typeof t == 'function' && (e = se(t)) && se(e);
      return e ? n == e || se(n) == e : lt(n);
    }
    function y(n, t, e) {
      if (!n || !M[typeof n])
        return n;
      t = t && typeof e == 'undefined' ? t : nt(t, e, 3);
      for (var r = -1, u = M[typeof n] && We(n), o = u ? u.length : 0; ++r < o && (e = u[r], false !== t(n[e], e, n)););
      return n;
    }
    function d(n, t, e) {
      var r;
      if (!n || !M[typeof n])
        return n;
      t = t && typeof e == 'undefined' ? t : nt(t, e, 3);
      for (r in n)
        if (false === t(n[r], r, n))
          break;
      return n;
    }
    function U(n, t, e) {
      var r, u = n, o = u;
      if (!u)
        return o;
      for (var a = arguments, i = 0, f = typeof e == 'number' ? 2 : a.length; ++i < f;)
        if ((u = a[i]) && M[typeof u])
          for (var l = -1, c = M[typeof u] && We(u), p = c ? c.length : 0; ++l < p;)
            r = c[l], 'undefined' == typeof o[r] && (o[r] = u[r]);
      return o;
    }
    function G(n, t, e) {
      var r, u = n, o = u;
      if (!u)
        return o;
      var a = arguments, i = 0, f = typeof e == 'number' ? 2 : a.length;
      if (3 < f && 'function' == typeof a[f - 2])
        var l = nt(a[--f - 1], a[f--], 2);
      else
        2 < f && 'function' == typeof a[f - 1] && (l = a[--f]);
      for (; ++i < f;)
        if ((u = a[i]) && M[typeof u])
          for (var c = -1, p = M[typeof u] && We(u), s = p ? p.length : 0; ++c < s;)
            r = p[c], o[r] = l ? l(o[r], u[r]) : u[r];
      return o;
    }
    function H(n) {
      var t, e = [];
      if (!n || !M[typeof n])
        return e;
      for (t in n)
        ve.call(n, t) && e.push(t);
      return e;
    }
    function Q(n) {
      return n && typeof n == 'object' && !ze(n) && ve.call(n, '__wrapped__') ? n : new Y(n);
    }
    function Y(n, t) {
      this.__chain__ = !!t, this.__wrapped__ = n;
    }
    function Z(n, t, e, r, u) {
      var o = n;
      if (e) {
        if (o = e(o), typeof o != 'undefined')
          return o;
        o = n;
      }
      var a = yt(o);
      if (a) {
        var f = _e.call(o);
        if (!L[f])
          return o;
        var l = ze(o);
      }
      if (!a || !t)
        return a ? l ? s(o) : G({}, o) : o;
      switch (a = $e[f], f) {
      case F:
      case T:
        return new a(+o);
      case W:
      case K:
        return new a(o);
      case P:
        return a(o.source, O.exec(o));
      }
      f = !r, r || (r = i()), u || (u = i());
      for (var p = r.length; p--;)
        if (r[p] == n)
          return u[p];
      return o = l ? a(o.length) : {}, l && (ve.call(n, 'index') && (o.index = n.index), ve.call(n, 'input') && (o.input = n.input)), r.push(n), u.push(o), (l ? xt : y)(n, function (n, a) {
        o[a] = Z(n, t, e, r, u);
      }), f && (c(r), c(u)), o;
    }
    function nt(n, t, e) {
      if (typeof n != 'function')
        return Mt;
      if (typeof t == 'undefined')
        return n;
      var r = n.__bindData__ || Fe.funcNames && !n.name;
      if (typeof r == 'undefined') {
        var u = R && pe.call(n);
        Fe.funcNames || !u || N.test(u) || (r = !0), (Fe.funcNames || !r) && (r = !Fe.funcDecomp || R.test(u), Te(n, r));
      }
      if (true !== r && r && 1 & r[1])
        return n;
      switch (e) {
      case 1:
        return function (e) {
          return n.call(t, e);
        };
      case 2:
        return function (e, r) {
          return n.call(t, e, r);
        };
      case 3:
        return function (e, r, u) {
          return n.call(t, e, r, u);
        };
      case 4:
        return function (e, r, u, o) {
          return n.call(t, e, r, u, o);
        };
      }
      return Pt(n, t);
    }
    function tt(n, t, e, r) {
      r = (r || 0) - 1;
      for (var u = n ? n.length : 0, o = []; ++r < u;) {
        var a = n[r];
        if (a && typeof a == 'object' && typeof a.length == 'number' && (ze(a) || pt(a))) {
          t || (a = tt(a, t, e));
          var i = -1, f = a.length, l = o.length;
          for (o.length += f; ++i < f;)
            o[l++] = a[i];
        } else
          e || o.push(a);
      }
      return o;
    }
    function et(n, t, e, r, u, o) {
      if (e) {
        var a = e(n, t);
        if (typeof a != 'undefined')
          return !!a;
      }
      if (n === t)
        return 0 !== n || 1 / n == 1 / t;
      if (n === n && !(n && M[typeof n] || t && M[typeof t]))
        return !1;
      if (null == n || null == t)
        return n === t;
      var f = _e.call(n), l = _e.call(t);
      if (f == B && (f = q), l == B && (l = q), f != l)
        return !1;
      switch (f) {
      case F:
      case T:
        return +n == +t;
      case W:
        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
      case P:
      case K:
        return n == ee(t);
      }
      if (l = f == $, !l) {
        if (ve.call(n, '__wrapped__') || ve.call(t, '__wrapped__'))
          return et(n.__wrapped__ || n, t.__wrapped__ || t, e, r, u, o);
        if (f != q)
          return !1;
        var f = n.constructor, p = t.constructor;
        if (f != p && !(gt(f) && f instanceof f && gt(p) && p instanceof p))
          return !1;
      }
      for (p = !u, u || (u = i()), o || (o = i()), f = u.length; f--;)
        if (u[f] == n)
          return o[f] == t;
      var s = 0, a = !0;
      if (u.push(n), o.push(t), l) {
        if (f = n.length, s = t.length, a = s == n.length, !a && !r)
          return a;
        for (; s--;)
          if (l = f, p = t[s], r)
            for (; l-- && !(a = et(n[l], p, e, r, u, o)););
          else if (!(a = et(n[s], p, e, r, u, o)))
            break;
        return a;
      }
      return d(t, function (t, i, f) {
        return ve.call(f, i) ? (s++, a = ve.call(n, i) && et(n[i], t, e, r, u, o)) : void 0;
      }), a && !r && d(n, function (n, t, e) {
        return ve.call(e, t) ? a = -1 < --s : void 0;
      }), p && (c(u), c(o)), a;
    }
    function rt(n, t, e, r, u) {
      (ze(t) ? xt : y)(t, function (t, o) {
        var a, i, f = t, l = n[o];
        if (t && ((i = ze(t)) || g(t))) {
          for (f = r.length; f--;)
            if (a = r[f] == t) {
              l = u[f];
              break;
            }
          if (!a) {
            var c;
            e && (f = e(l, t), c = typeof f != 'undefined') && (l = f), c || (l = i ? ze(l) ? l : [] : g(l) ? l : {}), r.push(t), u.push(l), c || rt(l, t, e, r, u);
          }
        } else
          e && (f = e(l, t), typeof f == 'undefined' && (f = t)), typeof f != 'undefined' && (l = f);
        n[o] = l;
      });
    }
    function ut(e, r, u) {
      var a = -1, f = ft(), l = e ? e.length : 0, s = [], v = !r && l >= _ && f === n, h = u || v ? i() : s;
      if (v) {
        var g = o(h);
        g ? (f = t, h = g) : (v = !1, h = u ? h : (c(h), s));
      }
      for (; ++a < l;) {
        var g = e[a], y = u ? u(g, a, e) : g;
        (r ? !a || h[h.length - 1] !== y : 0 > f(h, y)) && ((u || v) && h.push(y), s.push(g));
      }
      return v ? (c(h.b), p(h)) : u && c(h), s;
    }
    function ot(n) {
      return function (t, e, r) {
        var u = {};
        e = Q.createCallback(e, r, 3), r = -1;
        var o = t ? t.length : 0;
        if (typeof o == 'number')
          for (; ++r < o;) {
            var a = t[r];
            n(u, a, e(a, r, t), t);
          }
        else
          y(t, function (t, r, o) {
            n(u, t, e(t, r, o), o);
          });
        return u;
      };
    }
    function at(n, t, e, r, u, o) {
      var a = 1 & t, i = 2 & t, f = 4 & t, l = 8 & t, c = 16 & t, p = 32 & t, s = n;
      if (!i && !gt(n))
        throw new re();
      c && !e.length && (t &= -17, c = e = !1), p && !r.length && (t &= -33, p = r = !1);
      var v = n && n.__bindData__;
      if (v)
        return !a || 1 & v[1] || (v[4] = u), !a && 1 & v[1] && (t |= 8), !f || 4 & v[1] || (v[5] = o), c && ge.apply(v[2] || (v[2] = []), e), p && ge.apply(v[3] || (v[3] = []), r), v[1] |= t, at.apply(null, v);
      if (!a || i || f || p || !(Fe.fastBind || je && c))
        g = function () {
          var v = arguments, h = a ? u : this;
          return (f || c || p) && (v = Ae.call(v), c && de.apply(v, e), p && ge.apply(v, r), f && v.length < o) ? (t |= 16, at(n, l ? t : -4 & t, v, null, u, o)) : (i && (n = h[s]), this instanceof g ? (h = yt(n.prototype) ? ke(n.prototype) : {}, v = n.apply(h, v), yt(v) ? v : h) : n.apply(h, v));
        };
      else {
        if (c) {
          var h = [u];
          ge.apply(h, e);
        }
        var g = c ? je.apply(n, h) : je.call(n, u);
      }
      return Te(g, Ae.call(arguments)), g;
    }
    function it(n) {
      return qe[n];
    }
    function ft() {
      var t = (t = Q.indexOf) === $t ? n : t;
      return t;
    }
    function lt(n) {
      var t, e;
      return n && _e.call(n) == q && (t = n.constructor, !gt(t) || t instanceof t) ? (d(n, function (n, t) {
        e = t;
      }), typeof e == 'undefined' || ve.call(n, e)) : !1;
    }
    function ct(n) {
      return Pe[n];
    }
    function pt(n) {
      return n && typeof n == 'object' && typeof n.length == 'number' && _e.call(n) == B || !1;
    }
    function st(n, t, e) {
      var r = We(n), u = r.length;
      for (t = nt(t, e, 3); u-- && (e = r[u], false !== t(n[e], e, n)););
      return n;
    }
    function vt(n) {
      var t = [];
      return d(n, function (n, e) {
        gt(n) && t.push(e);
      }), t.sort();
    }
    function ht(n) {
      for (var t = -1, e = We(n), r = e.length, u = {}; ++t < r;) {
        var o = e[t];
        u[n[o]] = o;
      }
      return u;
    }
    function gt(n) {
      return typeof n == 'function';
    }
    function yt(n) {
      return !(!n || !M[typeof n]);
    }
    function mt(n) {
      return typeof n == 'number' || _e.call(n) == W;
    }
    function bt(n) {
      return typeof n == 'string' || _e.call(n) == K;
    }
    function _t(n) {
      for (var t = -1, e = We(n), r = e.length, u = Ht(r); ++t < r;)
        u[t] = n[e[t]];
      return u;
    }
    function dt(n, t, e) {
      var r = -1, u = ft(), o = n ? n.length : 0, a = !1;
      return e = (0 > e ? Ee(0, o + e) : e) || 0, ze(n) ? a = -1 < u(n, t, e) : typeof o == 'number' ? a = -1 < (bt(n) ? n.indexOf(t, e) : u(n, t, e)) : y(n, function (n) {
        return ++r < e ? void 0 : !(a = n === t);
      }), a;
    }
    function wt(n, t, e) {
      var r = !0;
      t = Q.createCallback(t, e, 3), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u && (r = !!t(n[e], e, n)););
      else
        y(n, function (n, e, u) {
          return r = !!t(n, e, u);
        });
      return r;
    }
    function jt(n, t, e) {
      var r = [];
      t = Q.createCallback(t, e, 3), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u;) {
          var o = n[e];
          t(o, e, n) && r.push(o);
        }
      else
        y(n, function (n, e, u) {
          t(n, e, u) && r.push(n);
        });
      return r;
    }
    function kt(n, t, e) {
      t = Q.createCallback(t, e, 3), e = -1;
      var r = n ? n.length : 0;
      if (typeof r != 'number') {
        var u;
        return y(n, function (n, e, r) {
          return t(n, e, r) ? (u = n, !1) : void 0;
        }), u;
      }
      for (; ++e < r;) {
        var o = n[e];
        if (t(o, e, n))
          return o;
      }
    }
    function xt(n, t, e) {
      var r = -1, u = n ? n.length : 0;
      if (t = t && typeof e == 'undefined' ? t : nt(t, e, 3), typeof u == 'number')
        for (; ++r < u && false !== t(n[r], r, n););
      else
        y(n, t);
      return n;
    }
    function Ct(n, t, e) {
      var r = n ? n.length : 0;
      if (t = t && typeof e == 'undefined' ? t : nt(t, e, 3), typeof r == 'number')
        for (; r-- && false !== t(n[r], r, n););
      else {
        var u = We(n), r = u.length;
        y(n, function (n, e, o) {
          return e = u ? u[--r] : --r, t(o[e], e, o);
        });
      }
      return n;
    }
    function Ot(n, t, e) {
      var r = -1, u = n ? n.length : 0;
      if (t = Q.createCallback(t, e, 3), typeof u == 'number')
        for (var o = Ht(u); ++r < u;)
          o[r] = t(n[r], r, n);
      else
        o = [], y(n, function (n, e, u) {
          o[++r] = t(n, e, u);
        });
      return o;
    }
    function Nt(n, t, e) {
      var u = -1 / 0, o = u;
      if (!t && ze(n)) {
        e = -1;
        for (var a = n.length; ++e < a;) {
          var i = n[e];
          i > o && (o = i);
        }
      } else
        t = !t && bt(n) ? r : Q.createCallback(t, e, 3), xt(n, function (n, e, r) {
          e = t(n, e, r), e > u && (u = e, o = n);
        });
      return o;
    }
    function Et(n, t) {
      var e = -1, r = n ? n.length : 0;
      if (typeof r == 'number')
        for (var u = Ht(r); ++e < r;)
          u[e] = n[e][t];
      return u || Ot(n, t);
    }
    function It(n, t, e, r) {
      if (!n)
        return e;
      var u = 3 > arguments.length;
      t = nt(t, r, 4);
      var o = -1, a = n.length;
      if (typeof a == 'number')
        for (u && (e = n[++o]); ++o < a;)
          e = t(e, n[o], o, n);
      else
        y(n, function (n, r, o) {
          e = u ? (u = !1, n) : t(e, n, r, o);
        });
      return e;
    }
    function St(n, t, e, r) {
      var u = 3 > arguments.length;
      return t = nt(t, r, 4), Ct(n, function (n, r, o) {
        e = u ? (u = !1, n) : t(e, n, r, o);
      }), e;
    }
    function Rt(n) {
      var t = -1, e = n ? n.length : 0, r = Ht(typeof e == 'number' ? e : 0);
      return xt(n, function (n) {
        var e = Vt(++t);
        r[t] = r[e], r[e] = n;
      }), r;
    }
    function At(n, t, e) {
      var r;
      t = Q.createCallback(t, e, 3), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u && !(r = t(n[e], e, n)););
      else
        y(n, function (n, e, u) {
          return !(r = t(n, e, u));
        });
      return !!r;
    }
    function Dt(e) {
      var r = -1, u = ft(), a = e ? e.length : 0, i = tt(arguments, !0, !0, 1), f = [], l = a >= _ && u === n;
      if (l) {
        var c = o(i);
        c ? (u = t, i = c) : l = !1;
      }
      for (; ++r < a;)
        c = e[r], 0 > u(i, c) && f.push(c);
      return l && p(i), f;
    }
    function Bt(n, t, e) {
      var r = 0, u = n ? n.length : 0;
      if (typeof t != 'number' && null != t) {
        var o = -1;
        for (t = Q.createCallback(t, e, 3); ++o < u && t(n[o], o, n);)
          r++;
      } else if (r = t, null == r || e)
        return n ? n[0] : h;
      return s(n, 0, Ie(Ee(0, r), u));
    }
    function $t(t, e, r) {
      if (typeof r == 'number') {
        var u = t ? t.length : 0;
        r = 0 > r ? Ee(0, u + r) : r || 0;
      } else if (r)
        return r = Tt(t, e), t[r] === e ? r : -1;
      return n(t, e, r);
    }
    function Ft(n, t, e) {
      if (typeof t != 'number' && null != t) {
        var r = 0, u = -1, o = n ? n.length : 0;
        for (t = Q.createCallback(t, e, 3); ++u < o && t(n[u], u, n);)
          r++;
      } else
        r = null == t || e ? 1 : Ee(0, t);
      return s(n, r);
    }
    function Tt(n, t, e, r) {
      var u = 0, o = n ? n.length : u;
      for (e = e ? Q.createCallback(e, r, 1) : Mt, t = e(t); u < o;)
        r = u + o >>> 1, e(n[r]) < t ? u = r + 1 : o = r;
      return u;
    }
    function zt(n, t, e, r) {
      return typeof t != 'boolean' && null != t && (e = (r = e) && r[t] === n ? null : t, t = !1), null != e && (e = Q.createCallback(e, r, 3)), ut(n, t, e);
    }
    function Wt() {
      for (var n = 1 < arguments.length ? arguments : arguments[0], t = -1, e = n ? Nt(Et(n, 'length')) : 0, r = Ht(0 > e ? 0 : e); ++t < e;)
        r[t] = Et(n, t);
      return r;
    }
    function qt(n, t) {
      for (var e = -1, r = n ? n.length : 0, u = {}; ++e < r;) {
        var o = n[e];
        t ? u[o] = t[e] : o && (u[o[0]] = o[1]);
      }
      return u;
    }
    function Pt(n, t) {
      return 2 < arguments.length ? at(n, 17, Ae.call(arguments, 2), null, t) : at(n, 1, null, null, t);
    }
    function Kt(n, t, e) {
      function r() {
        c && le(c), a = c = p = h, (g || v !== t) && (s = he(), i = n.apply(l, o));
      }
      function u() {
        var e = t - (he() - f);
        0 < e ? c = me(u, e) : (a && le(a), e = p, a = c = p = h, e && (s = he(), i = n.apply(l, o)));
      }
      var o, a, i, f, l, c, p, s = 0, v = !1, g = !0;
      if (!gt(n))
        throw new re();
      if (t = Ee(0, t) || 0, true === e)
        var y = !0, g = !1;
      else
        yt(e) && (y = e.leading, v = 'maxWait' in e && (Ee(t, e.maxWait) || 0), g = 'trailing' in e ? e.trailing : g);
      return function () {
        if (o = arguments, f = he(), l = this, p = g && (c || !y), false === v)
          var e = y && !c;
        else {
          a || y || (s = f);
          var h = v - (f - s);
          0 < h ? a || (a = me(r, h)) : (a && (a = le(a)), s = f, i = n.apply(l, o));
        }
        return c || t === v || (c = me(u, t)), e && (i = n.apply(l, o)), i;
      };
    }
    function Lt(n) {
      if (!gt(n))
        throw new re();
      var t = Ae.call(arguments, 1);
      return me(function () {
        n.apply(h, t);
      }, 1);
    }
    function Mt(n) {
      return n;
    }
    function Ut(n, t) {
      var e = n, r = !t || gt(e);
      t || (e = Y, t = n, n = Q), xt(vt(t), function (u) {
        var o = n[u] = t[u];
        r && (e.prototype[u] = function () {
          var t = this.__wrapped__, r = [t];
          return ge.apply(r, arguments), r = o.apply(n, r), t && typeof t == 'object' && t === r ? this : new e(r);
        });
      });
    }
    function Vt(n, t, e) {
      var r = null == n, u = null == t;
      return null == e && (typeof n == 'boolean' && u ? (e = n, n = 1) : u || typeof t != 'boolean' || (e = t, u = !0)), r && u && (t = 1), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, r = Re(), e || n % 1 || t % 1 ? n + Ie(r * (t - n + parseFloat('1e-' + ((r + '').length - 1))), t) : n + ce(r * (t - n + 1));
    }
    function Gt() {
      return this.__wrapped__;
    }
    e = e ? X.defaults(V.Object(), e, X.pick(V, D)) : V;
    var Ht = e.Array, Jt = e.Boolean, Qt = e.Date, Xt = e.Function, Yt = e.Math, Zt = e.Number, ne = e.Object, te = e.RegExp, ee = e.String, re = e.TypeError, ue = [], oe = ne.prototype, ae = e._, ie = te('^' + ee(oe.valueOf).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/valueOf|for [^\]]+/g, '.+?') + '$'), fe = Yt.ceil, le = e.clearTimeout, ce = Yt.floor, pe = Xt.prototype.toString, se = ie.test(se = ne.getPrototypeOf) && se, ve = oe.hasOwnProperty, he = ie.test(he = Qt.now) && he || function () {
        return +new Qt();
      }, ge = ue.push, ye = e.setImmediate, me = e.setTimeout, be = ue.splice, _e = oe.toString, de = ue.unshift, we = function () {
        try {
          var n = {}, t = ie.test(t = ne.defineProperty) && t, e = t(n, n, n) && t;
        } catch (r) {
        }
        return e;
      }(), je = ie.test(je = _e.bind) && je, ke = ie.test(ke = ne.create) && ke, xe = ie.test(xe = Ht.isArray) && xe, Ce = e.isFinite, Oe = e.isNaN, Ne = ie.test(Ne = ne.keys) && Ne, Ee = Yt.max, Ie = Yt.min, Se = e.parseInt, Re = Yt.random, Ae = ue.slice, De = ie.test(e.attachEvent), Be = je && !/\n|true/.test(je + De), $e = {};
    $e[$] = Ht, $e[F] = Jt, $e[T] = Qt, $e[z] = Xt, $e[q] = ne, $e[W] = Zt, $e[P] = te, $e[K] = ee, Y.prototype = Q.prototype;
    var Fe = Q.support = {};
    Fe.fastBind = je && !Be, Fe.funcDecomp = !ie.test(e.a) && R.test(v), Fe.funcNames = typeof Xt.name == 'string', Q.templateSettings = {
      escape: /<%-([\s\S]+?)%>/g,
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: E,
      variable: '',
      imports: { _: Q }
    };
    var Te = we ? function (n, t) {
        var e = f();
        e.value = t, we(n, '__bindData__', e), p(e);
      } : l, ze = xe || function (n) {
        return n && typeof n == 'object' && typeof n.length == 'number' && _e.call(n) == $ || !1;
      }, We = Ne ? function (n) {
        return yt(n) ? Ne(n) : [];
      } : H, qe = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
      }, Pe = ht(qe), Ke = te('(' + We(Pe).join('|') + ')', 'g'), Le = te('[' + We(qe).join('') + ']', 'g'), Me = ot(function (n, t, e) {
        ve.call(n, e) ? n[e]++ : n[e] = 1;
      }), Ue = ot(function (n, t, e) {
        (ve.call(n, e) ? n[e] : n[e] = []).push(t);
      }), Ve = ot(function (n, t, e) {
        n[e] = t;
      });
    Be && J && typeof ye == 'function' && (Lt = function (n) {
      if (!gt(n))
        throw new re();
      return ye.apply(e, arguments);
    });
    var Ge = 8 == Se(w + '08') ? Se : function (n, t) {
        return Se(bt(n) ? n.replace(I, '') : n, t || 0);
      };
    return Q.after = function (n, t) {
      if (!gt(t))
        throw new re();
      return function () {
        return 1 > --n ? t.apply(this, arguments) : void 0;
      };
    }, Q.assign = G, Q.at = function (n) {
      for (var t = arguments, e = -1, r = tt(t, !0, !1, 1), t = t[2] && t[2][t[1]] === n ? 1 : r.length, u = Ht(t); ++e < t;)
        u[e] = n[r[e]];
      return u;
    }, Q.bind = Pt, Q.bindAll = function (n) {
      for (var t = 1 < arguments.length ? tt(arguments, !0, !1, 1) : vt(n), e = -1, r = t.length; ++e < r;) {
        var u = t[e];
        n[u] = at(n[u], 1, null, null, n);
      }
      return n;
    }, Q.bindKey = function (n, t) {
      return 2 < arguments.length ? at(t, 19, Ae.call(arguments, 2), null, n) : at(t, 3, null, null, n);
    }, Q.chain = function (n) {
      return n = new Y(n), n.__chain__ = !0, n;
    }, Q.compact = function (n) {
      for (var t = -1, e = n ? n.length : 0, r = []; ++t < e;) {
        var u = n[t];
        u && r.push(u);
      }
      return r;
    }, Q.compose = function () {
      for (var n = arguments, t = n.length; t--;)
        if (!gt(n[t]))
          throw new re();
      return function () {
        for (var t = arguments, e = n.length; e--;)
          t = [n[e].apply(this, t)];
        return t[0];
      };
    }, Q.countBy = Me, Q.createCallback = function (n, t, e) {
      var r = typeof n;
      if (null == n || 'function' == r)
        return nt(n, t, e);
      if ('object' != r)
        return function (t) {
          return t[n];
        };
      var u = We(n), o = u[0], a = n[o];
      return 1 != u.length || a !== a || yt(a) ? function (t) {
        for (var e = u.length, r = !1; e-- && (r = et(t[u[e]], n[u[e]], null, !0)););
        return r;
      } : function (n) {
        return n = n[o], a === n && (0 !== a || 1 / a == 1 / n);
      };
    }, Q.curry = function (n, t) {
      return t = typeof t == 'number' ? t : +t || n.length, at(n, 4, null, null, null, t);
    }, Q.debounce = Kt, Q.defaults = U, Q.defer = Lt, Q.delay = function (n, t) {
      if (!gt(n))
        throw new re();
      var e = Ae.call(arguments, 2);
      return me(function () {
        n.apply(h, e);
      }, t);
    }, Q.difference = Dt, Q.filter = jt, Q.flatten = function (n, t, e, r) {
      return typeof t != 'boolean' && null != t && (e = (r = e) && r[t] === n ? null : t, t = !1), null != e && (n = Ot(n, e, r)), tt(n, t);
    }, Q.forEach = xt, Q.forEachRight = Ct, Q.forIn = d, Q.forInRight = function (n, t, e) {
      var r = [];
      d(n, function (n, t) {
        r.push(t, n);
      });
      var u = r.length;
      for (t = nt(t, e, 3); u-- && false !== t(r[u--], r[u], n););
      return n;
    }, Q.forOwn = y, Q.forOwnRight = st, Q.functions = vt, Q.groupBy = Ue, Q.indexBy = Ve, Q.initial = function (n, t, e) {
      var r = 0, u = n ? n.length : 0;
      if (typeof t != 'number' && null != t) {
        var o = u;
        for (t = Q.createCallback(t, e, 3); o-- && t(n[o], o, n);)
          r++;
      } else
        r = null == t || e ? 1 : t || r;
      return s(n, 0, Ie(Ee(0, u - r), u));
    }, Q.intersection = function (e) {
      for (var r = arguments, u = r.length, a = -1, f = i(), l = -1, s = ft(), v = e ? e.length : 0, h = [], g = i(); ++a < u;) {
        var y = r[a];
        f[a] = s === n && (y ? y.length : 0) >= _ && o(a ? r[a] : g);
      }
      n:
        for (; ++l < v;) {
          var m = f[0], y = e[l];
          if (0 > (m ? t(m, y) : s(g, y))) {
            for (a = u, (m || g).push(y); --a;)
              if (m = f[a], 0 > (m ? t(m, y) : s(r[a], y)))
                continue n;
            h.push(y);
          }
        }
      for (; u--;)
        (m = f[u]) && p(m);
      return c(f), c(g), h;
    }, Q.invert = ht, Q.invoke = function (n, t) {
      var e = Ae.call(arguments, 2), r = -1, u = typeof t == 'function', o = n ? n.length : 0, a = Ht(typeof o == 'number' ? o : 0);
      return xt(n, function (n) {
        a[++r] = (u ? t : n[t]).apply(n, e);
      }), a;
    }, Q.keys = We, Q.map = Ot, Q.max = Nt, Q.memoize = function (n, t) {
      function e() {
        var r = e.cache, u = t ? t.apply(this, arguments) : b + arguments[0];
        return ve.call(r, u) ? r[u] : r[u] = n.apply(this, arguments);
      }
      if (!gt(n))
        throw new re();
      return e.cache = {}, e;
    }, Q.merge = function (n) {
      var t = arguments, e = 2;
      if (!yt(n))
        return n;
      if ('number' != typeof t[2] && (e = t.length), 3 < e && 'function' == typeof t[e - 2])
        var r = nt(t[--e - 1], t[e--], 2);
      else
        2 < e && 'function' == typeof t[e - 1] && (r = t[--e]);
      for (var t = Ae.call(arguments, 1, e), u = -1, o = i(), a = i(); ++u < e;)
        rt(n, t[u], r, o, a);
      return c(o), c(a), n;
    }, Q.min = function (n, t, e) {
      var u = 1 / 0, o = u;
      if (!t && ze(n)) {
        e = -1;
        for (var a = n.length; ++e < a;) {
          var i = n[e];
          i < o && (o = i);
        }
      } else
        t = !t && bt(n) ? r : Q.createCallback(t, e, 3), xt(n, function (n, e, r) {
          e = t(n, e, r), e < u && (u = e, o = n);
        });
      return o;
    }, Q.omit = function (n, t, e) {
      var r = ft(), u = typeof t == 'function', o = {};
      if (u)
        t = Q.createCallback(t, e, 3);
      else
        var a = tt(arguments, !0, !1, 1);
      return d(n, function (n, e, i) {
        (u ? !t(n, e, i) : 0 > r(a, e)) && (o[e] = n);
      }), o;
    }, Q.once = function (n) {
      var t, e;
      if (!gt(n))
        throw new re();
      return function () {
        return t ? e : (t = !0, e = n.apply(this, arguments), n = null, e);
      };
    }, Q.pairs = function (n) {
      for (var t = -1, e = We(n), r = e.length, u = Ht(r); ++t < r;) {
        var o = e[t];
        u[t] = [
          o,
          n[o]
        ];
      }
      return u;
    }, Q.partial = function (n) {
      return at(n, 16, Ae.call(arguments, 1));
    }, Q.partialRight = function (n) {
      return at(n, 32, null, Ae.call(arguments, 1));
    }, Q.pick = function (n, t, e) {
      var r = {};
      if (typeof t != 'function')
        for (var u = -1, o = tt(arguments, !0, !1, 1), a = yt(n) ? o.length : 0; ++u < a;) {
          var i = o[u];
          i in n && (r[i] = n[i]);
        }
      else
        t = Q.createCallback(t, e, 3), d(n, function (n, e, u) {
          t(n, e, u) && (r[e] = n);
        });
      return r;
    }, Q.pluck = Et, Q.pull = function (n) {
      for (var t = arguments, e = 0, r = t.length, u = n ? n.length : 0; ++e < r;)
        for (var o = -1, a = t[e]; ++o < u;)
          n[o] === a && (be.call(n, o--, 1), u--);
      return n;
    }, Q.range = function (n, t, e) {
      n = +n || 0, e = typeof e == 'number' ? e : +e || 1, null == t && (t = n, n = 0);
      var r = -1;
      t = Ee(0, fe((t - n) / (e || 1)));
      for (var u = Ht(t); ++r < t;)
        u[r] = n, n += e;
      return u;
    }, Q.reject = function (n, t, e) {
      return t = Q.createCallback(t, e, 3), jt(n, function (n, e, r) {
        return !t(n, e, r);
      });
    }, Q.remove = function (n, t, e) {
      var r = -1, u = n ? n.length : 0, o = [];
      for (t = Q.createCallback(t, e, 3); ++r < u;)
        e = n[r], t(e, r, n) && (o.push(e), be.call(n, r--, 1), u--);
      return o;
    }, Q.rest = Ft, Q.shuffle = Rt, Q.sortBy = function (n, t, e) {
      var r = -1, o = n ? n.length : 0, a = Ht(typeof o == 'number' ? o : 0);
      for (t = Q.createCallback(t, e, 3), xt(n, function (n, e, u) {
          var o = a[++r] = f();
          o.l = t(n, e, u), o.m = r, o.n = n;
        }), o = a.length, a.sort(u); o--;)
        n = a[o], a[o] = n.n, p(n);
      return a;
    }, Q.tap = function (n, t) {
      return t(n), n;
    }, Q.throttle = function (n, t, e) {
      var r = !0, u = !0;
      if (!gt(n))
        throw new re();
      return false === e ? r = !1 : yt(e) && (r = 'leading' in e ? e.leading : r, u = 'trailing' in e ? e.trailing : u), e = f(), e.leading = r, e.maxWait = t, e.trailing = u, n = Kt(n, t, e), p(e), n;
    }, Q.times = function (n, t, e) {
      n = -1 < (n = +n) ? n : 0;
      var r = -1, u = Ht(n);
      for (t = nt(t, e, 1); ++r < n;)
        u[r] = t(r);
      return u;
    }, Q.toArray = function (n) {
      return n && typeof n.length == 'number' ? s(n) : _t(n);
    }, Q.transform = function (n, t, e, r) {
      var u = ze(n);
      return t = nt(t, r, 4), null == e && (u ? e = [] : (r = n && n.constructor, e = yt(r && r.prototype) ? ke(r && r.prototype) : {})), (u ? xt : y)(n, function (n, r, u) {
        return t(e, n, r, u);
      }), e;
    }, Q.union = function () {
      return ut(tt(arguments, !0, !0));
    }, Q.uniq = zt, Q.values = _t, Q.where = jt, Q.without = function (n) {
      return Dt(n, Ae.call(arguments, 1));
    }, Q.wrap = function (n, t) {
      if (!gt(t))
        throw new re();
      return function () {
        var e = [n];
        return ge.apply(e, arguments), t.apply(this, e);
      };
    }, Q.zip = Wt, Q.zipObject = qt, Q.collect = Ot, Q.drop = Ft, Q.each = xt, Q.c = Ct, Q.extend = G, Q.methods = vt, Q.object = qt, Q.select = jt, Q.tail = Ft, Q.unique = zt, Q.unzip = Wt, Ut(Q), Q.clone = function (n, t, e, r) {
      return typeof t != 'boolean' && null != t && (r = e, e = t, t = !1), Z(n, t, typeof e == 'function' && nt(e, r, 1));
    }, Q.cloneDeep = function (n, t, e) {
      return Z(n, !0, typeof t == 'function' && nt(t, e, 1));
    }, Q.contains = dt, Q.escape = function (n) {
      return null == n ? '' : ee(n).replace(Le, it);
    }, Q.every = wt, Q.find = kt, Q.findIndex = function (n, t, e) {
      var r = -1, u = n ? n.length : 0;
      for (t = Q.createCallback(t, e, 3); ++r < u;)
        if (t(n[r], r, n))
          return r;
      return -1;
    }, Q.findKey = function (n, t, e) {
      var r;
      return t = Q.createCallback(t, e, 3), y(n, function (n, e, u) {
        return t(n, e, u) ? (r = e, !1) : void 0;
      }), r;
    }, Q.findLast = function (n, t, e) {
      var r;
      return t = Q.createCallback(t, e, 3), Ct(n, function (n, e, u) {
        return t(n, e, u) ? (r = n, !1) : void 0;
      }), r;
    }, Q.findLastIndex = function (n, t, e) {
      var r = n ? n.length : 0;
      for (t = Q.createCallback(t, e, 3); r--;)
        if (t(n[r], r, n))
          return r;
      return -1;
    }, Q.findLastKey = function (n, t, e) {
      var r;
      return t = Q.createCallback(t, e, 3), st(n, function (n, e, u) {
        return t(n, e, u) ? (r = e, !1) : void 0;
      }), r;
    }, Q.has = function (n, t) {
      return n ? ve.call(n, t) : !1;
    }, Q.identity = Mt, Q.indexOf = $t, Q.isArguments = pt, Q.isArray = ze, Q.isBoolean = function (n) {
      return true === n || false === n || _e.call(n) == F;
    }, Q.isDate = function (n) {
      return n ? typeof n == 'object' && _e.call(n) == T : !1;
    }, Q.isElement = function (n) {
      return n ? 1 === n.nodeType : !1;
    }, Q.isEmpty = function (n) {
      var t = !0;
      if (!n)
        return t;
      var e = _e.call(n), r = n.length;
      return e == $ || e == K || e == B || e == q && typeof r == 'number' && gt(n.splice) ? !r : (y(n, function () {
        return t = !1;
      }), t);
    }, Q.isEqual = function (n, t, e, r) {
      return et(n, t, typeof e == 'function' && nt(e, r, 2));
    }, Q.isFinite = function (n) {
      return Ce(n) && !Oe(parseFloat(n));
    }, Q.isFunction = gt, Q.isNaN = function (n) {
      return mt(n) && n != +n;
    }, Q.isNull = function (n) {
      return null === n;
    }, Q.isNumber = mt, Q.isObject = yt, Q.isPlainObject = g, Q.isRegExp = function (n) {
      return n ? typeof n == 'object' && _e.call(n) == P : !1;
    }, Q.isString = bt, Q.isUndefined = function (n) {
      return typeof n == 'undefined';
    }, Q.lastIndexOf = function (n, t, e) {
      var r = n ? n.length : 0;
      for (typeof e == 'number' && (r = (0 > e ? Ee(0, r + e) : Ie(e, r - 1)) + 1); r--;)
        if (n[r] === t)
          return r;
      return -1;
    }, Q.mixin = Ut, Q.noConflict = function () {
      return e._ = ae, this;
    }, Q.parseInt = Ge, Q.random = Vt, Q.reduce = It, Q.reduceRight = St, Q.result = function (n, t) {
      if (n) {
        var e = n[t];
        return gt(e) ? n[t]() : e;
      }
    }, Q.runInContext = v, Q.size = function (n) {
      var t = n ? n.length : 0;
      return typeof t == 'number' ? t : We(n).length;
    }, Q.some = At, Q.sortedIndex = Tt, Q.template = function (n, t, e) {
      var r = Q.templateSettings;
      n || (n = ''), e = U({}, e, r);
      var u, o = U({}, e.imports, r.imports), r = We(o), o = _t(o), i = 0, f = e.interpolate || S, l = '__p+=\'', f = te((e.escape || S).source + '|' + f.source + '|' + (f === E ? C : S).source + '|' + (e.evaluate || S).source + '|$', 'g');
      n.replace(f, function (t, e, r, o, f, c) {
        return r || (r = o), l += n.slice(i, c).replace(A, a), e && (l += '\'+__e(' + e + ')+\''), f && (u = !0, l += '\';' + f + ';__p+=\''), r && (l += '\'+((__t=(' + r + '))==null?\'\':__t)+\''), i = c + t.length, t;
      }), l += '\';\n', f = e = e.variable, f || (e = 'obj', l = 'with(' + e + '){' + l + '}'), l = (u ? l.replace(j, '') : l).replace(k, '$1').replace(x, '$1;'), l = 'function(' + e + '){' + (f ? '' : e + '||(' + e + '={});') + 'var __t,__p=\'\',__e=_.escape' + (u ? ',__j=Array.prototype.join;function print(){__p+=__j.call(arguments,\'\')}' : ';') + l + 'return __p}';
      try {
        var c = Xt(r, 'return ' + l).apply(h, o);
      } catch (p) {
        throw p.source = l, p;
      }
      return t ? c(t) : (c.source = l, c);
    }, Q.unescape = function (n) {
      return null == n ? '' : ee(n).replace(Ke, ct);
    }, Q.uniqueId = function (n) {
      var t = ++m;
      return ee(null == n ? '' : n) + t;
    }, Q.all = wt, Q.any = At, Q.detect = kt, Q.findWhere = kt, Q.foldl = It, Q.foldr = St, Q.include = dt, Q.inject = It, y(Q, function (n, t) {
      Q.prototype[t] || (Q.prototype[t] = function () {
        var t = [this.__wrapped__], e = this.__chain__;
        return ge.apply(t, arguments), t = n.apply(Q, t), e ? new Y(t, e) : t;
      });
    }), Q.first = Bt, Q.last = function (n, t, e) {
      var r = 0, u = n ? n.length : 0;
      if (typeof t != 'number' && null != t) {
        var o = u;
        for (t = Q.createCallback(t, e, 3); o-- && t(n[o], o, n);)
          r++;
      } else if (r = t, null == r || e)
        return n ? n[u - 1] : h;
      return s(n, Ee(0, u - r));
    }, Q.sample = function (n, t, e) {
      var r = n ? n.length : 0;
      return typeof r != 'number' && (n = _t(n)), null == t || e ? n ? n[Vt(r - 1)] : h : (n = Rt(n), n.length = Ie(Ee(0, t), n.length), n);
    }, Q.take = Bt, Q.head = Bt, y(Q, function (n, t) {
      var e = 'sample' !== t;
      Q.prototype[t] || (Q.prototype[t] = function (t, r) {
        var u = this.__chain__, o = n(this.__wrapped__, t, r);
        return u || null != t && (!r || e && typeof t == 'function') ? new Y(o, u) : o;
      });
    }), Q.VERSION = '2.1.0', Q.prototype.chain = function () {
      return this.__chain__ = !0, this;
    }, Q.prototype.toString = function () {
      return ee(this.__wrapped__);
    }, Q.prototype.value = Gt, Q.prototype.valueOf = Gt, xt([
      'join',
      'pop',
      'shift'
    ], function (n) {
      var t = ue[n];
      Q.prototype[n] = function () {
        var n = this.__chain__, e = t.apply(this.__wrapped__, arguments);
        return n ? new Y(e, n) : e;
      };
    }), xt([
      'push',
      'reverse',
      'sort',
      'unshift'
    ], function (n) {
      var t = ue[n];
      Q.prototype[n] = function () {
        return t.apply(this.__wrapped__, arguments), this;
      };
    }), xt([
      'concat',
      'slice',
      'splice'
    ], function (n) {
      var t = ue[n];
      Q.prototype[n] = function () {
        return new Y(t.apply(this.__wrapped__, arguments), this.__chain__);
      };
    }), Q;
  }
  var h, g = [], y = [], m = 0, b = +new Date() + '', _ = 75, d = 40, w = ' \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000', j = /\b__p\+='';/g, k = /\b(__p\+=)''\+/g, x = /(__e\(.*?\)|\b__t\))\+'';/g, C = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, O = /\w*$/, N = /^function[ \n\r\t]+\w/, E = /<%=([\s\S]+?)%>/g, I = RegExp('^[' + w + ']*0+(?=.$)'), S = /($^)/, R = /\bthis\b/, A = /['\n\r\t\u2028\u2029\\]/g, D = 'Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setImmediate setTimeout'.split(' '), B = '[object Arguments]', $ = '[object Array]', F = '[object Boolean]', T = '[object Date]', z = '[object Function]', W = '[object Number]', q = '[object Object]', P = '[object RegExp]', K = '[object String]', L = {};
  L[z] = !1, L[B] = L[$] = L[F] = L[T] = L[W] = L[q] = L[P] = L[K] = !0;
  var M = {
      'boolean': !1,
      'function': !0,
      object: !0,
      number: !1,
      string: !1,
      undefined: !1
    }, U = {
      '\\': '\\',
      '\'': '\'',
      '\n': 'n',
      '\r': 'r',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    }, V = M[typeof window] && window || this, G = M[typeof exports] && exports && !exports.nodeType && exports, H = M[typeof module] && module && !module.nodeType && module, J = H && H.exports === G && G, Q = M[typeof global] && global;
  !Q || Q.global !== Q && Q.window !== Q || (V = Q);
  var X = v();
  typeof define == 'function' && typeof define.amd == 'object' && define.amd ? (V._ = X, define(function () {
    return X;
  })) : G && H ? J ? (H.exports = X)._ = X : G._ = X : V._ = X;
}.call(this));