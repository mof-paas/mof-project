
; if (window.jQuery) (function($) {
    $.extend({
        setValue: function(json, options) {
            if (!json) return {};
            var uiseter = new jQuery.uiseter(options);
            for (var key in json) {
                var elements;
                var selector = '';
                if (uiseter.settings.parentElement) {
                    selector = '#' + uiseter.settings.parentElement + "   "  // selector = '#' + uiseter.settings.parentElement + " > "
                }
                if (uiseter.settings.type.toLowerCase() === 'name') {
                    selector += "*[name='" + key + "']";
                }
                else if (uiseter.settings.type.toLowerCase() === 'class') {
                    selector += "." + key;
                }
                else if (uiseter.settings.type.toLowerCase() === 'id') {
                    selector += "#" + key;
                }
                if (selector) {
                    jQuery.uiseter.setElementsValue($(selector), json, key);
                }
            } //end for
            if (options && options.oncomplete)
                options.oncomplete();
        },
        clear: function(options) {
            return this.each(function() {
                var t = this.type, tag = this.tagName.toLowerCase();
                if (t == 'text' || t == 'password' || tag == 'textarea')
                    this.value = '';
                else if (t == 'checkbox' || t == 'radio')
                    this.checked = false;
                else if (tag == 'select')
                    this.selectedIndex = -1;
            });
        }
    }); // extend $
})(jQuery);

// constructor for uiseter
jQuery.uiseter = function(options) {
    this.settings = jQuery.extend({}, jQuery.uiseter.defaultsSettings, options);
};


jQuery.extend(jQuery.uiseter, {
    defaultsSettings: {
        parentElement: "",      // 要赋值元素的父元素的Id，没有给定则匹配文档中的所有元素
        type: 'name'              // 匹配元素(或标签)方式 id,name或class
    },
    setDefaults: function(settings) {
        jQuery.extend(jQuery.uiseter.defaultsSettings, settings);
    },
    // 设置元素集合(或标签)的value或html值
    setElementsValue: function(elements, json, key) {
        var element;
        if (elements && elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                element = elements[i];
                jQuery.uiseter.setElementValue(elements[i], json, key);
            }
        }
    },
    //设置单个元素(或标签)的value或html值
    setElementValue: function(element, json, key) {
        if (!element) return {};
        var target = $(element)[0];
        if (!target || !target.tagName) return {};

        var tag = target.tagName.toLowerCase();
        var type = target.type;
        var value = json[key];
        if (value == null || value == 'null') 
            value = '';
        if (tag === 'input' || tag === 'textarea' || tag === 'select') {
            if (type && type.toLowerCase() === 'radio') {
                if (target.value == value)
                    target.checked = true;
            }
            else {
                if (tag === 'select') {
                    if ($(target).get(0).options.length == 0) {
                        var option = new Option(value, value);
                        option.selected = true;
                        $(target).get(0).options.add(option);
                    } else {
                        $.each($(target).children(), function(i, item) {
                            if (item.value == value)
                                item.selected = true;
                        });
                    }
                }
                $(target).val(value);
                if (type && type.toLowerCase() === 'checkbox' && $(target).refresh) {
                    $(target).refresh();
                }
            }
        }
        else {
            $(target).html(json[key]);
        }
    }
})(jQuery);