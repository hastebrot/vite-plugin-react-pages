/** @license React v16.13.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = {};
(function(exports) {
  var ReactVersion = "16.13.0";
  var hasSymbol = typeof Symbol === "function" && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== "object") {
      return null;
    }
    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
    if (typeof maybeIterator === "function") {
      return maybeIterator;
    }
    return null;
  }
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  var ReactCurrentDispatcher = {
    current: null
  };
  var ReactCurrentBatchConfig = {
    suspense: null
  };
  var ReactCurrentOwner = {
    current: null
  };
  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
  function describeComponentFrame(name, source, ownerName) {
    var sourceInfo = "";
    if (source) {
      var path = source.fileName;
      var fileName = path.replace(BEFORE_SLASH_RE, "");
      {
        if (/^index\./.test(fileName)) {
          var match = path.match(BEFORE_SLASH_RE);
          if (match) {
            var pathBeforeSlash = match[1];
            if (pathBeforeSlash) {
              var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, "");
              fileName = folderName + "/" + fileName;
            }
          }
        }
      }
      sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
    } else if (ownerName) {
      sourceInfo = " (created by " + ownerName + ")";
    }
    return "\n    in " + (name || "Unknown") + sourceInfo;
  }
  var Resolved = 1;
  function refineResolvedLazyComponent(lazyComponent) {
    return lazyComponent._status === Resolved ? lazyComponent._result : null;
  }
  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || "";
    return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
  }
  function getComponentName(type) {
    if (type == null) {
      return null;
    }
    {
      if (typeof type.tag === "number") {
        error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
      }
    }
    if (typeof type === "function") {
      return type.displayName || type.name || null;
    }
    if (typeof type === "string") {
      return type;
    }
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PORTAL_TYPE:
        return "Portal";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }
    if (typeof type === "object") {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          return "Context.Consumer";
        case REACT_PROVIDER_TYPE:
          return "Context.Provider";
        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, "ForwardRef");
        case REACT_MEMO_TYPE:
          return getComponentName(type.type);
        case REACT_BLOCK_TYPE:
          return getComponentName(type.render);
        case REACT_LAZY_TYPE: {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
          break;
        }
      }
    }
    return null;
  }
  var ReactDebugCurrentFrame = {};
  var currentlyValidatingElement = null;
  function setCurrentlyValidatingElement(element) {
    {
      currentlyValidatingElement = element;
    }
  }
  {
    ReactDebugCurrentFrame.getCurrentStack = null;
    ReactDebugCurrentFrame.getStackAddendum = function() {
      var stack = "";
      if (currentlyValidatingElement) {
        var name = getComponentName(currentlyValidatingElement.type);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
      }
      var impl = ReactDebugCurrentFrame.getCurrentStack;
      if (impl) {
        stack += impl() || "";
      }
      return stack;
    };
  }
  var IsSomeRendererActing = {
    current: false
  };
  var ReactSharedInternals = {
    ReactCurrentDispatcher,
    ReactCurrentBatchConfig,
    ReactCurrentOwner,
    IsSomeRendererActing,
    assign: objectAssign
  };
  {
    objectAssign(ReactSharedInternals, {
      ReactDebugCurrentFrame,
      ReactComponentTreeHook: {}
    });
  }
  function warn(format) {
    {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      printWarning("warn", format, args);
    }
  }
  function error(format) {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      printWarning("error", format, args);
    }
  }
  function printWarning(level, format, args) {
    {
      var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === "string" && args[args.length - 1].indexOf("\n    in") === 0;
      if (!hasExistingStack) {
        var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame2.getStackAddendum();
        if (stack !== "") {
          format += "%s";
          args = args.concat([stack]);
        }
      }
      var argsWithFormat = args.map(function(item) {
        return "" + item;
      });
      argsWithFormat.unshift("Warning: " + format);
      Function.prototype.apply.call(console[level], console, argsWithFormat);
      try {
        var argIndex = 0;
        var message = "Warning: " + format.replace(/%s/g, function() {
          return args[argIndex++];
        });
        throw new Error(message);
      } catch (x) {
      }
    }
  }
  var didWarnStateUpdateForUnmountedComponent = {};
  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
      var warningKey = componentName + "." + callerName;
      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }
      error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }
  var ReactNoopUpdateQueue = {
    isMounted: function(publicInstance) {
      return false;
    },
    enqueueForceUpdate: function(publicInstance, callback, callerName) {
      warnNoop(publicInstance, "forceUpdate");
    },
    enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, "replaceState");
    },
    enqueueSetState: function(publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, "setState");
    }
  };
  var emptyObject = {};
  {
    Object.freeze(emptyObject);
  }
  function Component2(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component2.prototype.isReactComponent = {};
  Component2.prototype.setState = function(partialState, callback) {
    if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
      {
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      }
    }
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component2.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  {
    var deprecatedAPIs = {
      isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
      replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
    };
    var defineDeprecationWarning = function(methodName, info) {
      Object.defineProperty(Component2.prototype, methodName, {
        get: function() {
          warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
          return void 0;
        }
      });
    };
    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }
  function ComponentDummy() {
  }
  ComponentDummy.prototype = Component2.prototype;
  function PureComponent2(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent2.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent2;
  objectAssign(pureComponentPrototype, Component2.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  function createRef2() {
    var refObject = {
      current: null
    };
    {
      Object.seal(refObject);
    }
    return refObject;
  }
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
  {
    didWarnAboutStringRefs = {};
  }
  function hasValidRef(config) {
    {
      if (hasOwnProperty$1.call(config, "ref")) {
        var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.ref !== void 0;
  }
  function hasValidKey(config) {
    {
      if (hasOwnProperty$1.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.key !== void 0;
  }
  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function() {
      {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
        }
      }
    };
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, "key", {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function() {
      {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
        }
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, "ref", {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
  function warnIfStringRefCannotBeAutoConverted(config) {
    {
      if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
        var componentName = getComponentName(ReactCurrentOwner.current.type);
        if (!didWarnAboutStringRefs[componentName]) {
          error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
          didWarnAboutStringRefs[componentName] = true;
        }
      }
    }
  }
  var ReactElement = function(type, key, ref, self, source, owner, props) {
    var element = {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref,
      props,
      _owner: owner
    };
    {
      element._store = {};
      Object.defineProperty(element._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      Object.defineProperty(element, "_self", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      Object.defineProperty(element, "_source", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }
    return element;
  };
  function createElement2(type, config, children) {
    var propName;
    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        {
          warnIfStringRefCannotBeAutoConverted(config);
        }
      }
      if (hasValidKey(config)) {
        key = "" + config.key;
      }
      self = config.__self === void 0 ? null : config.__self;
      source = config.__source === void 0 ? null : config.__source;
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }
      props.children = childArray;
    }
    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    {
      if (key || ref) {
        var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement;
  }
  function cloneElement2(element, config, children) {
    if (element === null || element === void 0) {
      {
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
      }
    }
    var propName;
    var props = objectAssign({}, element.props);
    var key = element.key;
    var ref = element.ref;
    var self = element._self;
    var source = element._source;
    var owner = element._owner;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (hasValidKey(config)) {
        key = "" + config.key;
      }
      var defaultProps;
      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === void 0 && defaultProps !== void 0) {
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  function isValidElement2(object) {
    return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  var SEPARATOR = ".";
  var SUBSEPARATOR = ":";
  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      "=": "=0",
      ":": "=2"
    };
    var escapedString = ("" + key).replace(escapeRegex, function(match) {
      return escaperLookup[match];
    });
    return "$" + escapedString;
  }
  var didWarnAboutMaps = false;
  var userProvidedKeyEscapeRegex = /\/+/g;
  function escapeUserProvidedKey(text) {
    return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
  }
  var POOL_SIZE = 10;
  var traverseContextPool = [];
  function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }
  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;
    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }
  function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
    var type = typeof children;
    if (type === "undefined" || type === "boolean") {
      children = null;
    }
    var invokeCallback = false;
    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }
    if (invokeCallback) {
      callback(traverseContext, children, nameSoFar === "" ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
      return 1;
    }
    var child;
    var nextName;
    var subtreeCount = 0;
    var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getComponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (typeof iteratorFn === "function") {
        {
          if (iteratorFn === children.entries) {
            if (!didWarnAboutMaps) {
              warn("Using Maps as children is deprecated and will be removed in a future major release. Consider converting children to an array of keyed ReactElements instead.");
            }
            didWarnAboutMaps = true;
          }
        }
        var iterator = iteratorFn.call(children);
        var step;
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else if (type === "object") {
        var addendum = "";
        {
          addendum = " If you meant to render a collection of children, use an array instead." + ReactDebugCurrentFrame.getStackAddendum();
        }
        var childrenString = "" + children;
        {
          {
            throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + ")." + addendum);
          }
        }
      }
    }
    return subtreeCount;
  }
  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }
    return traverseAllChildrenImpl(children, "", callback, traverseContext);
  }
  function getComponentKey(component, index) {
    if (typeof component === "object" && component !== null && component.key != null) {
      return escape(component.key);
    }
    return index.toString(36);
  }
  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func, context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }
  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result, keyPrefix = bookKeeping.keyPrefix, func = bookKeeping.func, context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement2(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + "/" : "") + childKey);
      }
      result.push(mappedChild);
    }
  }
  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = "";
    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + "/";
    }
    var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
  }
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  function countChildren(children) {
    return traverseAllChildren(children, function() {
      return null;
    }, null);
  }
  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
      return child;
    });
    return result;
  }
  function onlyChild(children) {
    if (!isValidElement2(children)) {
      {
        throw Error("React.Children.only expected to receive a single React element child.");
      }
    }
    return children;
  }
  function createContext2(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === void 0) {
      calculateChangedBits = null;
    } else {
      {
        if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
          error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
        }
      }
    }
    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
    {
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits
      };
      Object.defineProperties(Consumer, {
        Provider: {
          get: function() {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;
              error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
            }
            return context.Provider;
          },
          set: function(_Provider) {
            context.Provider = _Provider;
          }
        },
        _currentValue: {
          get: function() {
            return context._currentValue;
          },
          set: function(_currentValue) {
            context._currentValue = _currentValue;
          }
        },
        _currentValue2: {
          get: function() {
            return context._currentValue2;
          },
          set: function(_currentValue2) {
            context._currentValue2 = _currentValue2;
          }
        },
        _threadCount: {
          get: function() {
            return context._threadCount;
          },
          set: function(_threadCount) {
            context._threadCount = _threadCount;
          }
        },
        Consumer: {
          get: function() {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;
              error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
            }
            return context.Consumer;
          }
        }
      });
      context.Consumer = Consumer;
    }
    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }
    return context;
  }
  function lazy2(ctor) {
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _ctor: ctor,
      _status: -1,
      _result: null
    };
    {
      var defaultProps;
      var propTypes;
      Object.defineProperties(lazyType, {
        defaultProps: {
          configurable: true,
          get: function() {
            return defaultProps;
          },
          set: function(newDefaultProps) {
            error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
            defaultProps = newDefaultProps;
            Object.defineProperty(lazyType, "defaultProps", {
              enumerable: true
            });
          }
        },
        propTypes: {
          configurable: true,
          get: function() {
            return propTypes;
          },
          set: function(newPropTypes) {
            error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
            propTypes = newPropTypes;
            Object.defineProperty(lazyType, "propTypes", {
              enumerable: true
            });
          }
        }
      });
    }
    return lazyType;
  }
  function forwardRef2(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
      } else if (typeof render !== "function") {
        error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
      } else {
        if (render.length !== 0 && render.length !== 2) {
          error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        }
      }
      if (render != null) {
        if (render.defaultProps != null || render.propTypes != null) {
          error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        }
      }
    }
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render
    };
  }
  function isValidElementType(type) {
    return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }
  function memo2(type, compare2) {
    {
      if (!isValidElementType(type)) {
        error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
      }
    }
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: compare2 === void 0 ? null : compare2
    };
  }
  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;
    if (!(dispatcher !== null)) {
      {
        throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
      }
    }
    return dispatcher;
  }
  function useContext2(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();
    {
      if (unstable_observedBits !== void 0) {
        error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://fb.me/rules-of-hooks" : "");
      }
      if (Context._context !== void 0) {
        var realContext = Context._context;
        if (realContext.Consumer === Context) {
          error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
        } else if (realContext.Provider === Context) {
          error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
      }
    }
    return dispatcher.useContext(Context, unstable_observedBits);
  }
  function useState2(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }
  function useReducer2(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }
  function useRef2(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }
  function useEffect2(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }
  function useLayoutEffect2(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }
  function useCallback2(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }
  function useMemo2(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }
  function useImperativeHandle2(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }
  function useDebugValue2(value, formatterFn) {
    {
      var dispatcher = resolveDispatcher();
      return dispatcher.useDebugValue(value, formatterFn);
    }
  }
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  var ReactPropTypesSecret_1 = ReactPropTypesSecret;
  var printWarning$1 = function() {
  };
  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    printWarning$1 = function(text) {
      var message = "Warning: " + text;
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    };
  }
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error2;
          try {
            if (typeof typeSpecs[typeSpecName] !== "function") {
              var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
              err.name = "Invariant Violation";
              throw err;
            }
            error2 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error2 = ex;
          }
          if (error2 && !(error2 instanceof Error)) {
            printWarning$1((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error2 + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
          }
          if (error2 instanceof Error && !(error2.message in loggedTypeFailures)) {
            loggedTypeFailures[error2.message] = true;
            var stack = getStack ? getStack() : "";
            printWarning$1("Failed " + location + " type: " + error2.message + (stack != null ? stack : ""));
          }
        }
      }
    }
  }
  checkPropTypes.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };
  var checkPropTypes_1 = checkPropTypes;
  var propTypesMisspellWarningShown;
  {
    propTypesMisspellWarningShown = false;
  }
  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);
      if (name) {
        return "\n\nCheck the render method of `" + name + "`.";
      }
    }
    return "";
  }
  function getSourceInfoErrorAddendum(source) {
    if (source !== void 0) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, "");
      var lineNumber = source.lineNumber;
      return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
    }
    return "";
  }
  function getSourceInfoErrorAddendumForProps(elementProps) {
    if (elementProps !== null && elementProps !== void 0) {
      return getSourceInfoErrorAddendum(elementProps.__source);
    }
    return "";
  }
  var ownerHasKeyUseWarning = {};
  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();
    if (!info) {
      var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }
    return info;
  }
  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }
    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
    var childOwner = "";
    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }
    setCurrentlyValidatingElement(element);
    {
      error('Each child in a list should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
    }
    setCurrentlyValidatingElement(null);
  }
  function validateChildKeys(node, parentType) {
    if (typeof node !== "object") {
      return;
    }
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (isValidElement2(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement2(node)) {
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      if (typeof iteratorFn === "function") {
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;
          while (!(step = iterator.next()).done) {
            if (isValidElement2(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  function validatePropTypes(element) {
    {
      var type = element.type;
      if (type === null || type === void 0 || typeof type === "string") {
        return;
      }
      var name = getComponentName(type);
      var propTypes;
      if (typeof type === "function") {
        propTypes = type.propTypes;
      } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }
      if (propTypes) {
        setCurrentlyValidatingElement(element);
        checkPropTypes_1(propTypes, element.props, "prop", name, ReactDebugCurrentFrame.getStackAddendum);
        setCurrentlyValidatingElement(null);
      } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", name || "Unknown");
      }
      if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
        error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
  }
  function validateFragmentProps(fragment) {
    {
      setCurrentlyValidatingElement(fragment);
      var keys = Object.keys(fragment.props);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== "children" && key !== "key") {
          error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
          break;
        }
      }
      if (fragment.ref !== null) {
        error("Invalid attribute `ref` supplied to `React.Fragment`.");
      }
      setCurrentlyValidatingElement(null);
    }
  }
  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type);
    if (!validType) {
      var info = "";
      if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
        info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
      }
      var sourceInfo = getSourceInfoErrorAddendumForProps(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }
      var typeString;
      if (type === null) {
        typeString = "null";
      } else if (Array.isArray(type)) {
        typeString = "array";
      } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
        info = " Did you accidentally export a JSX literal instead of a component?";
      } else {
        typeString = typeof type;
      }
      {
        error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
      }
    }
    var element = createElement2.apply(this, arguments);
    if (element == null) {
      return element;
    }
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }
    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }
    return element;
  }
  var didWarnAboutDeprecatedCreateFactory = false;
  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;
    {
      if (!didWarnAboutDeprecatedCreateFactory) {
        didWarnAboutDeprecatedCreateFactory = true;
        warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
      }
      Object.defineProperty(validatedFactory, "type", {
        enumerable: false,
        get: function() {
          warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
          Object.defineProperty(this, "type", {
            value: type
          });
          return type;
        }
      });
    }
    return validatedFactory;
  }
  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement2.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
  var enableSchedulerDebugging = false;
  var enableProfiling = true;
  var requestHostCallback;
  var requestHostTimeout;
  var cancelHostTimeout;
  var shouldYieldToHost;
  var requestPaint;
  var getCurrentTime;
  var forceFrameRate;
  if (typeof window === "undefined" || typeof MessageChannel !== "function") {
    var _callback = null;
    var _timeoutID = null;
    var _flushCallback = function() {
      if (_callback !== null) {
        try {
          var currentTime = getCurrentTime();
          var hasRemainingTime = true;
          _callback(hasRemainingTime, currentTime);
          _callback = null;
        } catch (e) {
          setTimeout(_flushCallback, 0);
          throw e;
        }
      }
    };
    var initialTime = Date.now();
    getCurrentTime = function() {
      return Date.now() - initialTime;
    };
    requestHostCallback = function(cb) {
      if (_callback !== null) {
        setTimeout(requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0);
      }
    };
    requestHostTimeout = function(cb, ms) {
      _timeoutID = setTimeout(cb, ms);
    };
    cancelHostTimeout = function() {
      clearTimeout(_timeoutID);
    };
    shouldYieldToHost = function() {
      return false;
    };
    requestPaint = forceFrameRate = function() {
    };
  } else {
    var performance = window.performance;
    var _Date = window.Date;
    var _setTimeout = window.setTimeout;
    var _clearTimeout = window.clearTimeout;
    if (typeof console !== "undefined") {
      var requestAnimationFrame = window.requestAnimationFrame;
      var cancelAnimationFrame = window.cancelAnimationFrame;
      if (typeof requestAnimationFrame !== "function") {
        console["error"]("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
      }
      if (typeof cancelAnimationFrame !== "function") {
        console["error"]("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
      }
    }
    if (typeof performance === "object" && typeof performance.now === "function") {
      getCurrentTime = function() {
        return performance.now();
      };
    } else {
      var _initialTime = _Date.now();
      getCurrentTime = function() {
        return _Date.now() - _initialTime;
      };
    }
    var isMessageLoopRunning = false;
    var scheduledHostCallback = null;
    var taskTimeoutID = -1;
    var yieldInterval = 5;
    var deadline = 0;
    {
      shouldYieldToHost = function() {
        return getCurrentTime() >= deadline;
      };
      requestPaint = function() {
      };
    }
    forceFrameRate = function(fps) {
      if (fps < 0 || fps > 125) {
        console["error"]("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported");
        return;
      }
      if (fps > 0) {
        yieldInterval = Math.floor(1e3 / fps);
      } else {
        yieldInterval = 5;
      }
    };
    var performWorkUntilDeadline = function() {
      if (scheduledHostCallback !== null) {
        var currentTime = getCurrentTime();
        deadline = currentTime + yieldInterval;
        var hasTimeRemaining = true;
        try {
          var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            port.postMessage(null);
          }
        } catch (error2) {
          port.postMessage(null);
          throw error2;
        }
      } else {
        isMessageLoopRunning = false;
      }
    };
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;
    requestHostCallback = function(callback) {
      scheduledHostCallback = callback;
      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    };
    requestHostTimeout = function(callback, ms) {
      taskTimeoutID = _setTimeout(function() {
        callback(getCurrentTime());
      }, ms);
    };
    cancelHostTimeout = function() {
      _clearTimeout(taskTimeoutID);
      taskTimeoutID = -1;
    };
  }
  function push(heap, node) {
    var index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }
  function peek(heap) {
    var first = heap[0];
    return first === void 0 ? null : first;
  }
  function pop(heap) {
    var first = heap[0];
    if (first !== void 0) {
      var last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }
      return first;
    } else {
      return null;
    }
  }
  function siftUp(heap, node, i) {
    var index = i;
    while (true) {
      var parentIndex = index - 1 >>> 1;
      var parent = heap[parentIndex];
      if (parent !== void 0 && compare(parent, node) > 0) {
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        return;
      }
    }
  }
  function siftDown(heap, node, i) {
    var index = i;
    var length = heap.length;
    while (index < length) {
      var leftIndex = (index + 1) * 2 - 1;
      var left = heap[leftIndex];
      var rightIndex = leftIndex + 1;
      var right = heap[rightIndex];
      if (left !== void 0 && compare(left, node) < 0) {
        if (right !== void 0 && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== void 0 && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        return;
      }
    }
  }
  function compare(a, b) {
    var diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  }
  var NoPriority = 0;
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;
  var runIdCounter = 0;
  var mainThreadIdCounter = 0;
  var profilingStateSize = 4;
  var sharedProfilingBuffer = typeof SharedArrayBuffer === "function" ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : typeof ArrayBuffer === "function" ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null;
  var profilingState = sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : [];
  var PRIORITY = 0;
  var CURRENT_TASK_ID = 1;
  var CURRENT_RUN_ID = 2;
  var QUEUE_SIZE = 3;
  {
    profilingState[PRIORITY] = NoPriority;
    profilingState[QUEUE_SIZE] = 0;
    profilingState[CURRENT_TASK_ID] = 0;
  }
  var INITIAL_EVENT_LOG_SIZE = 131072;
  var MAX_EVENT_LOG_SIZE = 524288;
  var eventLogSize = 0;
  var eventLogBuffer = null;
  var eventLog = null;
  var eventLogIndex = 0;
  var TaskStartEvent = 1;
  var TaskCompleteEvent = 2;
  var TaskErrorEvent = 3;
  var TaskCancelEvent = 4;
  var TaskRunEvent = 5;
  var TaskYieldEvent = 6;
  var SchedulerSuspendEvent = 7;
  var SchedulerResumeEvent = 8;
  function logEvent(entries) {
    if (eventLog !== null) {
      var offset = eventLogIndex;
      eventLogIndex += entries.length;
      if (eventLogIndex + 1 > eventLogSize) {
        eventLogSize *= 2;
        if (eventLogSize > MAX_EVENT_LOG_SIZE) {
          console["error"]("Scheduler Profiling: Event log exceeded maximum size. Don't forget to call `stopLoggingProfilingEvents()`.");
          stopLoggingProfilingEvents();
          return;
        }
        var newEventLog = new Int32Array(eventLogSize * 4);
        newEventLog.set(eventLog);
        eventLogBuffer = newEventLog.buffer;
        eventLog = newEventLog;
      }
      eventLog.set(entries, offset);
    }
  }
  function startLoggingProfilingEvents() {
    eventLogSize = INITIAL_EVENT_LOG_SIZE;
    eventLogBuffer = new ArrayBuffer(eventLogSize * 4);
    eventLog = new Int32Array(eventLogBuffer);
    eventLogIndex = 0;
  }
  function stopLoggingProfilingEvents() {
    var buffer = eventLogBuffer;
    eventLogSize = 0;
    eventLogBuffer = null;
    eventLog = null;
    eventLogIndex = 0;
    return buffer;
  }
  function markTaskStart(task, ms) {
    {
      profilingState[QUEUE_SIZE]++;
      if (eventLog !== null) {
        logEvent([TaskStartEvent, ms * 1e3, task.id, task.priorityLevel]);
      }
    }
  }
  function markTaskCompleted(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[QUEUE_SIZE]--;
      if (eventLog !== null) {
        logEvent([TaskCompleteEvent, ms * 1e3, task.id]);
      }
    }
  }
  function markTaskCanceled(task, ms) {
    {
      profilingState[QUEUE_SIZE]--;
      if (eventLog !== null) {
        logEvent([TaskCancelEvent, ms * 1e3, task.id]);
      }
    }
  }
  function markTaskErrored(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[QUEUE_SIZE]--;
      if (eventLog !== null) {
        logEvent([TaskErrorEvent, ms * 1e3, task.id]);
      }
    }
  }
  function markTaskRun(task, ms) {
    {
      runIdCounter++;
      profilingState[PRIORITY] = task.priorityLevel;
      profilingState[CURRENT_TASK_ID] = task.id;
      profilingState[CURRENT_RUN_ID] = runIdCounter;
      if (eventLog !== null) {
        logEvent([TaskRunEvent, ms * 1e3, task.id, runIdCounter]);
      }
    }
  }
  function markTaskYield(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[CURRENT_RUN_ID] = 0;
      if (eventLog !== null) {
        logEvent([TaskYieldEvent, ms * 1e3, task.id, runIdCounter]);
      }
    }
  }
  function markSchedulerSuspended(ms) {
    {
      mainThreadIdCounter++;
      if (eventLog !== null) {
        logEvent([SchedulerSuspendEvent, ms * 1e3, mainThreadIdCounter]);
      }
    }
  }
  function markSchedulerUnsuspended(ms) {
    {
      if (eventLog !== null) {
        logEvent([SchedulerResumeEvent, ms * 1e3, mainThreadIdCounter]);
      }
    }
  }
  var maxSigned31BitInt = 1073741823;
  var IMMEDIATE_PRIORITY_TIMEOUT = -1;
  var USER_BLOCKING_PRIORITY = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5e3;
  var LOW_PRIORITY_TIMEOUT = 1e4;
  var IDLE_PRIORITY = maxSigned31BitInt;
  var taskQueue = [];
  var timerQueue = [];
  var taskIdCounter = 1;
  var currentTask = null;
  var currentPriorityLevel = NormalPriority;
  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;
  function advanceTimers(currentTime) {
    var timer = peek(timerQueue);
    while (timer !== null) {
      if (timer.callback === null) {
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
        {
          markTaskStart(timer, currentTime);
          timer.isQueued = true;
        }
      } else {
        return;
      }
      timer = peek(timerQueue);
    }
  }
  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      } else {
        var firstTimer = peek(timerQueue);
        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }
  function flushWork(hasTimeRemaining, initialTime2) {
    {
      markSchedulerUnsuspended(initialTime2);
    }
    isHostCallbackScheduled = false;
    if (isHostTimeoutScheduled) {
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }
    isPerformingWork = true;
    var previousPriorityLevel = currentPriorityLevel;
    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime2);
        } catch (error2) {
          if (currentTask !== null) {
            var currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }
          throw error2;
        }
      } else {
        return workLoop(hasTimeRemaining, initialTime2);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
      {
        var _currentTime = getCurrentTime();
        markSchedulerSuspended(_currentTime);
      }
    }
  }
  function workLoop(hasTimeRemaining, initialTime2) {
    var currentTime = initialTime2;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);
    while (currentTask !== null && !enableSchedulerDebugging) {
      if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
        break;
      }
      var callback = currentTask.callback;
      if (callback !== null) {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
        markTaskRun(currentTask, currentTime);
        var continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();
        if (typeof continuationCallback === "function") {
          currentTask.callback = continuationCallback;
          markTaskYield(currentTask, currentTime);
        } else {
          {
            markTaskCompleted(currentTask, currentTime);
            currentTask.isQueued = false;
          }
          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }
        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }
      currentTask = peek(taskQueue);
    }
    if (currentTask !== null) {
      return true;
    } else {
      var firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
      return false;
    }
  }
  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;
      default:
        priorityLevel = NormalPriority;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }
  function unstable_next(eventHandler) {
    var priorityLevel;
    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        priorityLevel = NormalPriority;
        break;
      default:
        priorityLevel = currentPriorityLevel;
        break;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }
  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function() {
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;
      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }
  function timeoutForPriorityLevel(priorityLevel) {
    switch (priorityLevel) {
      case ImmediatePriority:
        return IMMEDIATE_PRIORITY_TIMEOUT;
      case UserBlockingPriority:
        return USER_BLOCKING_PRIORITY;
      case IdlePriority:
        return IDLE_PRIORITY;
      case LowPriority:
        return LOW_PRIORITY_TIMEOUT;
      case NormalPriority:
      default:
        return NORMAL_PRIORITY_TIMEOUT;
    }
  }
  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;
    var timeout;
    if (typeof options === "object" && options !== null) {
      var delay = options.delay;
      if (typeof delay === "number" && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }
      timeout = typeof options.timeout === "number" ? options.timeout : timeoutForPriorityLevel(priorityLevel);
    } else {
      timeout = timeoutForPriorityLevel(priorityLevel);
      startTime = currentTime;
    }
    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback,
      priorityLevel,
      startTime,
      expirationTime,
      sortIndex: -1
    };
    {
      newTask.isQueued = false;
    }
    if (startTime > currentTime) {
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);
      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        if (isHostTimeoutScheduled) {
          cancelHostTimeout();
        } else {
          isHostTimeoutScheduled = true;
        }
        requestHostTimeout(handleTimeout, startTime - currentTime);
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      {
        markTaskStart(newTask, currentTime);
        newTask.isQueued = true;
      }
      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      }
    }
    return newTask;
  }
  function unstable_pauseExecution() {
  }
  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }
  function unstable_getFirstCallbackNode() {
    return peek(taskQueue);
  }
  function unstable_cancelCallback(task) {
    {
      if (task.isQueued) {
        var currentTime = getCurrentTime();
        markTaskCanceled(task, currentTime);
        task.isQueued = false;
      }
    }
    task.callback = null;
  }
  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }
  function unstable_shouldYield() {
    var currentTime = getCurrentTime();
    advanceTimers(currentTime);
    var firstTask = peek(taskQueue);
    return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
  }
  var unstable_requestPaint = requestPaint;
  var unstable_Profiling = {
    startLoggingProfilingEvents,
    stopLoggingProfilingEvents,
    sharedProfilingBuffer
  };
  var Scheduler = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority,
    unstable_next,
    unstable_scheduleCallback,
    unstable_cancelCallback,
    unstable_wrapCallback,
    unstable_getCurrentPriorityLevel,
    unstable_shouldYield,
    unstable_requestPaint,
    unstable_continueExecution,
    unstable_pauseExecution,
    unstable_getFirstCallbackNode,
    get unstable_now() {
      return getCurrentTime;
    },
    get unstable_forceFrameRate() {
      return forceFrameRate;
    },
    unstable_Profiling
  });
  var DEFAULT_THREAD_ID = 0;
  var interactionIDCounter = 0;
  var threadIDCounter = 0;
  var interactionsRef = null;
  var subscriberRef = null;
  {
    interactionsRef = {
      current: new Set()
    };
    subscriberRef = {
      current: null
    };
  }
  function unstable_clear(callback) {
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();
    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }
  function unstable_getCurrent() {
    {
      return interactionsRef.current;
    }
  }
  function unstable_getThreadID() {
    return ++threadIDCounter;
  }
  function unstable_trace(name, timestamp, callback) {
    var threadID = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_THREAD_ID;
    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name,
      timestamp
    };
    var prevInteractions = interactionsRef.current;
    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue;
    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;
          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }
    return returnValue;
  }
  function unstable_wrap(callback) {
    var threadID = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_THREAD_ID;
    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;
    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID);
    }
    wrappedInteractions.forEach(function(interaction) {
      interaction.__count++;
    });
    var hasRun = false;
    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;
      try {
        var returnValue;
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(void 0, arguments);
          } finally {
            interactionsRef.current = prevInteractions;
            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID);
            }
          }
        }
        return returnValue;
      } finally {
        if (!hasRun) {
          hasRun = true;
          wrappedInteractions.forEach(function(interaction) {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }
    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;
      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID);
        }
      } finally {
        wrappedInteractions.forEach(function(interaction) {
          interaction.__count--;
          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };
    return wrapped;
  }
  var subscribers = null;
  {
    subscribers = new Set();
  }
  function unstable_subscribe(subscriber) {
    {
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted,
          onInteractionTraced,
          onWorkCanceled,
          onWorkScheduled,
          onWorkStarted,
          onWorkStopped
        };
      }
    }
  }
  function unstable_unsubscribe(subscriber) {
    {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        subscriberRef.current = null;
      }
    }
  }
  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function(subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error2) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error2;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  var SchedulerTracing = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    get __interactionsRef() {
      return interactionsRef;
    },
    get __subscriberRef() {
      return subscriberRef;
    },
    unstable_clear,
    unstable_getCurrent,
    unstable_getThreadID,
    unstable_trace,
    unstable_wrap,
    unstable_subscribe,
    unstable_unsubscribe
  });
  var ReactSharedInternals$1 = {
    ReactCurrentDispatcher,
    ReactCurrentOwner,
    IsSomeRendererActing,
    assign: objectAssign
  };
  {
    objectAssign(ReactSharedInternals$1, {
      ReactDebugCurrentFrame,
      ReactComponentTreeHook: {}
    });
  }
  objectAssign(ReactSharedInternals$1, {
    Scheduler,
    SchedulerTracing
  });
  {
    try {
      var frozenObject = Object.freeze({});
      var testMap = new Map([[frozenObject, null]]);
      var testSet = new Set([frozenObject]);
      testMap.set(0, 0);
      testSet.add(0);
    } catch (e) {
    }
  }
  var createElement$1 = createElementWithValidation;
  var cloneElement$1 = cloneElementWithValidation;
  var createFactory2 = createFactoryWithValidation;
  var Children2 = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray,
    only: onlyChild
  };
  exports.Children = Children2;
  exports.Component = Component2;
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.Profiler = REACT_PROFILER_TYPE;
  exports.PureComponent = PureComponent2;
  exports.StrictMode = REACT_STRICT_MODE_TYPE;
  exports.Suspense = REACT_SUSPENSE_TYPE;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals$1;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext2;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory2;
  exports.createRef = createRef2;
  exports.forwardRef = forwardRef2;
  exports.isValidElement = isValidElement2;
  exports.lazy = lazy2;
  exports.memo = memo2;
  exports.useCallback = useCallback2;
  exports.useContext = useContext2;
  exports.useDebugValue = useDebugValue2;
  exports.useEffect = useEffect2;
  exports.useImperativeHandle = useImperativeHandle2;
  exports.useLayoutEffect = useLayoutEffect2;
  exports.useMemo = useMemo2;
  exports.useReducer = useReducer2;
  exports.useRef = useRef2;
  exports.useState = useState2;
  exports.version = ReactVersion;
})(React);
const {Children, Component, Fragment, Profiler, PureComponent, StrictMode, Suspense, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, cloneElement, createContext, createElement, createFactory, createRef, forwardRef, isValidElement, lazy, memo, useCallback, useContext, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState, version} = React;
export {Children as C, React as R, useState as a, useEffect as b, createContext as c, Component as d, cloneElement as e, useMemo as f, isValidElement as i, useContext as u};
